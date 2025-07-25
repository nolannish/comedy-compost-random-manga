'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { GetGenreOptions } from '@/app/data/genre-options';

type SelectOption = {
  value: number;
  label: string;
}

const animatedComponents = makeAnimated();

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
    <Select 
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      placeholder="Select Genres"
      styles={{
        control: (base) => ({
          ...base,
          minWidth: '300px', // or set width: '300px' for fixed
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999, // optional, ensures menu stays on top if needed
        }),
      }}
    />
  )
}