export default function AdultContentWarning() {
  return (
    <div className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
      <strong className="font-bold">Mature Content Warning: </strong>
      <span className="block sm:inline ml-1">
        Manga results are sourced from MyAnimeList and may include content that is unsuitable or inappropriate for some users. While measures have been taken to filter out such material, some results may still appears. Viewer discretion is advised.
      </span>
    </div>
  )
}