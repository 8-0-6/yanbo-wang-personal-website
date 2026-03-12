import { HomeContent } from "@/components/layout/HomeContent";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { experienceEntries } from "@/data/experience";
import { lifeBoardItems } from "@/data/interests";
import { notes } from "@/data/notes";
import { profile } from "@/data/profile";
import { siteMeta } from "@/data/site";
import { ventures } from "@/data/ventures";
import type { PrimarySection } from "@/lib/client/activeSection";

const validSections = new Set<PrimarySection>(["about", "ventures", "experience", "life", "notes", "contact"]);

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedSection = resolvedSearchParams?.section ?? resolvedSearchParams?.scene;
  const normalizedSection: PrimarySection =
    typeof requestedSection === "string" && validSections.has(requestedSection as PrimarySection)
      ? (requestedSection as PrimarySection)
      : "about";

  return (
    <SiteLayout profile={profile} defaultSection={normalizedSection}>
      <HomeContent
        siteMeta={siteMeta}
        ventures={ventures}
        experienceEntries={experienceEntries}
        notes={notes}
        lifeBoardItems={lifeBoardItems}
      />
    </SiteLayout>
  );
}
