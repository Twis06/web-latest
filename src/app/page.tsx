import HeroSection from "@/components/HeroSection";
import MountainSection from "@/components/MountainSection";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      {/* <MountainSection /> */}
      {/* next page content */}
      <section className="relative min-h-screen z-50 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="max-w-2xl text-center text-lg">
          Ben Li
          <br />
          Peiyang Li
        </p>
      </section>
    </main>
  );
}
