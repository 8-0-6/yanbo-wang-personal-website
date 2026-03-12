"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getInteractivePointerCapabilitySnapshot,
  subscribeToInteractivePointerCapability
} from "@/lib/client/pointerCapability";
import styles from "./custom-cursor.module.css";

type CursorTargetState = {
  active: boolean;
  pressed: boolean;
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hasShown = useRef(false);
  const animationFrame = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [targetState, setTargetState] = useState<CursorTargetState>({
    active: false,
    pressed: false
  });
  const enabled = useSyncExternalStore(
    subscribeToInteractivePointerCapability,
    getInteractivePointerCapabilitySnapshot,
    () => false
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.body.dataset.cursorReady = "true";

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      current.current.x += dx * 0.22;
      current.current.y += dy * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      animationFrame.current = window.requestAnimationFrame(tick);
    };

    const resolveTarget = (node: EventTarget | null) => {
      if (!(node instanceof Element)) {
        return null;
      }

      return node.closest<HTMLElement>("[data-cursor-label], a, button");
    };

    const updateTargetState = (node: EventTarget | null) => {
      const resolvedTarget = resolveTarget(node);

      if (!resolvedTarget) {
        setTargetState((previousState) => ({
          ...previousState,
          active: false
        }));
        return;
      }

      setTargetState((previousState) => ({
        ...previousState,
        active: true
      }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = {
        x: event.clientX,
        y: event.clientY
      };

      if (!hasShown.current) {
        current.current = {
          x: event.clientX,
          y: event.clientY
        };
        hasShown.current = true;
        setVisible(true);
      }
    };

    const handlePointerDown = () => {
      setTargetState((previousState) => ({
        ...previousState,
        pressed: true
      }));
    };

    const handlePointerUp = () => {
      setTargetState((previousState) => ({
        ...previousState,
        pressed: false
      }));
    };

    const handlePointerOver = (event: PointerEvent) => {
      updateTargetState(event.target);
    };

    const handlePointerLeave = () => {
      hasShown.current = false;
      setVisible(false);
      setTargetState({
        active: false,
        pressed: false
      });
    };

    animationFrame.current = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      delete document.body.dataset.cursorReady;

      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${visible ? styles.visible : ""} ${
        targetState.active ? styles.active : ""
      } ${targetState.pressed ? styles.pressed : ""}`}
      aria-hidden="true"
    >
      <div className={styles.frame}>
        <span className={`${styles.bracket} ${styles.topLeft}`} />
        <span className={`${styles.bracket} ${styles.topRight}`} />
        <span className={`${styles.bracket} ${styles.bottomLeft}`} />
        <span className={`${styles.bracket} ${styles.bottomRight}`} />
      </div>
      <div className={styles.core} />
    </div>
  );
}
