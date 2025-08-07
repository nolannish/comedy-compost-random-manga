import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      <Header />
      <section className="flex-grow flex flex-col justify-between text-center px-3">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>  
      </section>
    </main>
  );
}
