'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { GetGenreOptions } from '@/app/data/genre-options';

type SelectOption = {
  value: number;
  label: string;
}

export default function GenreDropdown() {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    async function getOptions() {
      const genres = await GetGenreOptions();

      const selectOptions = genres.map((genre) => ({
        value: genre.mal_id,
        label: genre.name
      }));

      setOptions(selectOptions);
    }

    getOptions();
  }, []);

  return (
    <Select options={options} placeholder='Select a genre' />
  )
}