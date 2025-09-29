import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      <Header />
      <section className="flex-grow flex flex-col items-center text-center px-6 py-12 space-y-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>  

        {/* Intro Section */}
        <div className="max-w-3xl bg-white shadow rounded-2xl p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>

          <p className="text-gray-600 mb-4">
            Comedy Compost is a group of friends who are enjoy things like playing games, reading manga, and a bunch of other general nerdy interests.
          </p>

          <p className="text-gray-600 mb-4">
            I, the one making this website, am also a recent computer science graduate, and right now my degree is not doing much for me, so I figured this could be a fun small project to work on during my job search.
          </p>

          <p className="text-gray-600 mb-6">
            My hope is that this site provides a bit of enjoyment to anyone who happens to stumble across it.
          </p>

          <h3 className="text-xl font-semibold mb-3">More of Us</h3>

          <p className="text-gray-600 mb-4">
            If you enjoyed this, check out our group YouTube channel, <span className="font-medium">Comedy Compost</span>. We occasionally post there just for fun, and there should either already be a video about this website or one coming soon.
          </p>

          <ul className="list-disc list-inside space-y-2 text-blue-600">
            <li>
              <a
                href="https://www.youtube.com/@ComedyCompost"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Click here to visit the channel
              </a>
            </li>
          </ul>
        </div>



        {/* Acknowledgements */}
        <div className="max-w-3xl bg-white shadow rounded-2xl p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4">External Sources</h2>

          <p className="text-gray-600 mb-4">
            In order to make this project, I made heavy use of two different external sources.
          </p>

          <p className="text-gray-600 mb-4">
            The first was the <span className="font-medium">Jikan API</span>, which allowed for easy access
            to the contents of MyAnimeList. This API made the random manga functionality possible.
          </p>

          <p className="text-gray-600 mb-4">
            The second was the <span className="font-medium">MangaDex API</span>, which provides direct links
            to a manga on MangaDex if the random manga from MyAnimeList is also available there.
          </p>

          <p className="text-gray-600 mb-6">
            I would like to thank the teams that made these APIs publicly available! Without them, this
            website would have been much harder to build.
          </p>

          <h3 className="text-xl font-semibold mb-3">Resources</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-600">
            <li>
              <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Jikan API Documentation
              </a>
            </li>
            <li>
              <a href="https://api.mangadex.org/docs/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                MangaDex API Documentation
              </a>
            </li>
            <li>
              <a href="https://mangadex.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                MangaDex Website
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
