import React from 'react';
import Select from 'react-select';
import { GetGenreOptions } from '@/app/data/genre-options';

const options = await GetGenreOptions()

export default function GenreDropdown() {
  return (
    <Select options={options} />
  )
}