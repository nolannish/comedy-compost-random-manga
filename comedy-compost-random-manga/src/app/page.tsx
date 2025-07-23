import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      <Header />

      <section className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MySite</h2>
        <p className="text-lg mb-6">This is a simple homepage using Next.js and Tailwind CSS.</p>
        <a
          href="#"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Learn More
        </a>
      </section>
    </main>
  );
}
