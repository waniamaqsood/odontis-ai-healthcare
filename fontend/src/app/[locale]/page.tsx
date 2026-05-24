import Section2 from "@/components/Section2";
import Hero from "@/components/Hero";
import Section3 from "@/components/Section3";

export default function Home() {
  return (
    <main className="relative">
      <>
        <Hero />
        {/* Tailwind Test
        <div className="bg-blue-500 text-white p-4">
          Tailwind Working
        </div>*/}
        <Section2 />
        <Section3 />
      </>


    </main>
  );
}