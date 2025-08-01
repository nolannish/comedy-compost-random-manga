'use client';

import React, { useEffect, useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import makeAnimated from 'react-select/animated';
import { GetGenreOptions } from '@/app/data/genre-options';

type SelectOption = {
  value: number;
  label: string;
}

type GenreDropdownProps = {
  onChange: (selected: number[]) => void;
}

const animatedComponents = makeAnimated();

export default function GenreDropdown({ onChange, options }: {
  onChange: (genres: number[]) => void;
  options: SelectOption[];
}) {
  // const [options, setOptions] = useState<SelectOption[]>([]);
  const [selections, setSelections] = useState<number[]>([]);

  // useEffect(() => {
  //   async function getOptions() {
  //     const genres = await GetGenreOptions();

  //     const selectOptions = genres.map((genre) => ({
  //       value: genre.mal_id,
  //       label: genre.name
  //     }));

  //     setOptions(selectOptions);
  //   }

  //   getOptions();
  // }, []);

  const handleChange = (selectedOptions: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
    // console.log('selected options: ', selectedOptions.map(options => options.value));
    // setSelections(selectedOptions.map(options => options.value));
    const values = selectedOptions.map(options => options.value);
    onChange(values);
    
  }

  return (
    <Select 
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      placeholder="Select Genres"
      onChange={handleChange}
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