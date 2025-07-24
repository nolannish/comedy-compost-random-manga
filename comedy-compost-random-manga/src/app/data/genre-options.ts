interface GenreOption {
  mal_id: number;
  name: string;
}

export async function GetGenreOptions(): Promise<GenreOption[]> {
  try {
    const response = await fetch('/api/get-genres');
    const data = await response.json();

    // console.log(data);

    const genreOptions: GenreOption[] = (data.data || []).map((genre: any) => ({
      mal_id: genre.mal_id,
      name: genre.name
    }));

    return genreOptions;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching genres:', error.message);
    } else {
      console.error('An unexpected error occurred while fetching genres');
    }

    return []; // fallback in case of error
  }
}
