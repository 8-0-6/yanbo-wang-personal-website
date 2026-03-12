#!/usr/bin/env python3
"""Read-only X research helper for daily post drafting."""

from __future__ import annotations

import argparse
import json
import os
import sys
import textwrap
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Iterable, List, Optional

API_BASE = "https://api.x.com/2"
DEFAULT_SEEDS = [
    "karpathy",
    "emollick",
    "simonw",
    "natolambert",
    "demishassabis",
    "ylecun",
    "AndrewYNg",
    "sama",
]
USER_FIELDS = "created_at,description,public_metrics,verified"
TWEET_FIELDS = "created_at,public_metrics"


class XApiError(RuntimeError):
    """Raised when the X API request fails."""


def normalize_handle(handle: str) -> str:
    return handle.lstrip("@").strip()


def compact(text: str, width: int = 180) -> str:
    collapsed = " ".join(text.split())
    if len(collapsed) <= width:
        return collapsed
    return collapsed[: width - 1].rstrip() + "..."


def format_metrics(metrics: Dict[str, int]) -> str:
    likes = metrics.get("like_count", 0)
    replies = metrics.get("reply_count", 0)
    reposts = metrics.get("retweet_count", 0)
    quotes = metrics.get("quote_count", 0)
    return f"{likes} likes, {replies} replies, {reposts} reposts, {quotes} quotes"


class XApiClient:
    def __init__(self, bearer_token: str) -> None:
        self.bearer_token = bearer_token

    def get(self, path: str, params: Optional[Dict[str, object]] = None) -> Dict[str, object]:
        query = urllib.parse.urlencode(params or {}, doseq=True)
        url = f"{API_BASE}{path}"
        if query:
            url = f"{url}?{query}"

        request = urllib.request.Request(
            url,
            headers={
                "Authorization": f"Bearer {self.bearer_token}",
                "User-Agent": "codex-x-research/1.0",
            },
        )

        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                payload = response.read().decode("utf-8")
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise XApiError(f"{exc.code} for {path}: {detail}") from exc
        except urllib.error.URLError as exc:
            raise XApiError(f"Request failed for {path}: {exc.reason}") from exc

        return json.loads(payload)

    def user_by_username(self, username: str) -> Dict[str, object]:
        payload = self.get(
            f"/users/by/username/{urllib.parse.quote(normalize_handle(username))}",
            {"user.fields": USER_FIELDS},
        )
        data = payload.get("data")
        if not isinstance(data, dict):
            raise XApiError(f"Missing user data for @{normalize_handle(username)}")
        return data

    def user_tweets(self, user_id: str, limit: int) -> List[Dict[str, object]]:
        payload = self.get(
            f"/users/{user_id}/tweets",
            {
                "exclude": "replies,retweets",
                "max_results": min(max(limit, 5), 100),
                "tweet.fields": TWEET_FIELDS,
            },
        )
        data = payload.get("data", [])
        return data if isinstance(data, list) else []

    def following(self, user_id: str, limit: int) -> List[Dict[str, object]]:
        payload = self.get(
            f"/users/{user_id}/following",
            {
                "max_results": min(max(limit, 5), 100),
                "user.fields": USER_FIELDS,
            },
        )
        data = payload.get("data", [])
        return data if isinstance(data, list) else []


def render_user_summary(user: Dict[str, object]) -> List[str]:
    metrics = user.get("public_metrics") or {}
    lines = [f"- Name: {user.get('name', '')} (@{user.get('username', '')})"]
    description = compact(str(user.get("description") or ""), 220)
    if description:
        lines.append(f"- Bio: {description}")
    if isinstance(metrics, dict):
        lines.append(
            "- Audience: "
            f"{metrics.get('followers_count', 0)} followers, "
            f"{metrics.get('following_count', 0)} following, "
            f"{metrics.get('tweet_count', 0)} posts"
        )
    return lines


def render_tweets(tweets: Iterable[Dict[str, object]]) -> List[str]:
    lines: List[str] = []
    for index, tweet in enumerate(tweets, start=1):
        created_at = tweet.get("created_at", "unknown date")
        text = compact(str(tweet.get("text") or ""), 240)
        metrics = tweet.get("public_metrics") or {}
        metric_line = format_metrics(metrics) if isinstance(metrics, dict) else "metrics unavailable"
        lines.append(f"{index}. {text}")
        lines.append(f"   Date: {created_at}")
        lines.append(f"   Metrics: {metric_line}")
        lines.append(f"   Link: https://x.com/i/web/status/{tweet.get('id')}")
    if not lines:
        lines.append("No recent original posts returned.")
    return lines


def render_following(users: Iterable[Dict[str, object]]) -> List[str]:
    lines: List[str] = []
    for user in users:
        metrics = user.get("public_metrics") or {}
        followers = metrics.get("followers_count", 0) if isinstance(metrics, dict) else 0
        description = compact(str(user.get("description") or ""), 140)
        lines.append(f"- @{user.get('username', '')}: {followers} followers. {description}")
    if not lines:
        lines.append("- No following snapshot returned.")
    return lines


def build_report(
    handle: str,
    seeds: List[str],
    tweet_limit: int,
    following_limit: int,
    seed_tweet_limit: int,
) -> str:
    token = os.getenv("X_BEARER_TOKEN")
    if not token:
        raise XApiError("X_BEARER_TOKEN is not set. Put it in the environment or .env file.")

    client = XApiClient(token)
    username = normalize_handle(handle)
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat()

    warnings: List[str] = []
    subject = client.user_by_username(username)
    subject_tweets = client.user_tweets(str(subject["id"]), tweet_limit)

    try:
        following_snapshot = client.following(str(subject["id"]), following_limit)
    except XApiError as exc:
        following_snapshot = []
        warnings.append(f"Following snapshot unavailable: {exc}")

    seed_sections: List[str] = []
    for seed in seeds:
        normalized_seed = normalize_handle(seed)
        try:
            seed_user = client.user_by_username(normalized_seed)
            seed_tweets = client.user_tweets(str(seed_user["id"]), seed_tweet_limit)
        except XApiError as exc:
            warnings.append(f"Seed @{normalized_seed} failed: {exc}")
            continue

        seed_sections.append(f"## Seed: @{normalized_seed}")
        seed_sections.extend(render_user_summary(seed_user))
        seed_sections.append("")
        seed_sections.append("Recent original posts:")
        seed_sections.extend(render_tweets(seed_tweets))
        seed_sections.append("")

    lines = [
        "# X Research Report",
        "",
        f"Generated: {now}",
        f"Voice anchor: @{username}",
        "",
        "## Constraints",
        "- Bearer-token auth is app-only and read-only for public data.",
        "- This report can inspect public posts and following lists, but not private/home timeline data.",
        "- X exposes a current following snapshot, not the order in which accounts were first followed.",
        "- Query-based user discovery requires user-context auth, so influencer discovery should stay seed-based here.",
        "",
        "## Voice Anchor",
    ]
    lines.extend(render_user_summary(subject))
    lines.append("")
    lines.append("Recent original posts:")
    lines.extend(render_tweets(subject_tweets))
    lines.append("")
    lines.append("Following snapshot:")
    lines.extend(render_following(following_snapshot))
    lines.append("")
    lines.append("## Seeds Reviewed")
    lines.append("")
    if seed_sections:
        lines.extend(seed_sections)
    else:
        lines.append("No seed accounts were resolved.")
        lines.append("")

    if warnings:
        lines.append("## Warnings")
        for warning in warnings:
            lines.append(f"- {warning}")
        lines.append("")

    lines.append("## Drafting Guidance")
    lines.append(
        textwrap.fill(
            "Use the subject's recent posts as the style anchor. Prefer concise, founder-first takes with a strong "
            "hook, a clear tension, and a concrete takeaway. Use the seed sections to identify current debates, "
            "product launches, and technical reactions worth responding to with original insight.",
            width=100,
        )
    )
    lines.append("")

    return "\n".join(lines)


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch public X context for post drafting.")
    parser.add_argument("--handle", required=True, help="Primary X handle to study, with or without @.")
    parser.add_argument(
        "--seed",
        action="append",
        dest="seeds",
        default=[],
        help="Additional seed handles to review. Can be passed multiple times.",
    )
    parser.add_argument("--tweet-limit", type=int, default=8, help="Number of recent posts for the main handle.")
    parser.add_argument(
        "--following-limit",
        type=int,
        default=20,
        help="Number of accounts to include from the following snapshot.",
    )
    parser.add_argument(
        "--seed-tweet-limit",
        type=int,
        default=4,
        help="Number of recent posts to fetch for each seed handle.",
    )
    parser.add_argument("--out", help="Optional output file path.")
    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv)
    seeds = [normalize_handle(seed) for seed in args.seeds] or DEFAULT_SEEDS

    try:
        report = build_report(
            handle=args.handle,
            seeds=seeds,
            tweet_limit=args.tweet_limit,
            following_limit=args.following_limit,
            seed_tweet_limit=args.seed_tweet_limit,
        )
    except XApiError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    if args.out:
        output_path = Path(args.out)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(report + "\n", encoding="utf-8")
    else:
        print(report)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
