import Hero from "@/modules/hero";
import ReadingList from "@/modules/reading-list";
import Recommendation from "@/modules/recommendation";

export default function Home() {
  return (
    <main className="py-10">
      <Hero />
      <ReadingList />
      <Recommendation />
    </main>
  );
}
