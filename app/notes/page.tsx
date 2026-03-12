import { SiteLayout } from "@/components/layout/SiteLayout";
import { NotesSection } from "@/components/sections/NotesSection";
import { notes } from "@/data/notes";
import { profile } from "@/data/profile";

export default function NotesPage() {
  return (
    <SiteLayout profile={profile} defaultSection="notes">
      <NotesSection notes={notes} />
    </SiteLayout>
  );
}
