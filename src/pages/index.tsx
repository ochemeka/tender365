import ThemeToggle from "@/components/global/ThemeToggle";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col gap-5 items-center justify-center">
      <h1 className="text-4xl font-bold">Dark Mode Test</h1>
      <ThemeToggle />
    </div>
  );
}
