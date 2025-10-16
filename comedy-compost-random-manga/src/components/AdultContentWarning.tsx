export default function AdultContentWarning() {
  return (
    <div className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
      <strong className="font-bold">Adult Content Warning: </strong>
      <span className="block sm:inline ml-1">
        Please be aware that this website gets its information from MyAnimeList, which may result in some of the manga presented containing adult content. User discretion is advised.
      </span>
    </div>
  )
}