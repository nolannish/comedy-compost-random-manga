'use client';

import Select, { MultiValue, ActionMeta } from 'react-select';
import makeAnimated from 'react-select/animated';

type SelectOption = {
  value: number;
  label: string;
}

const animatedComponents = makeAnimated();

export default function GenreDropdown({ onChange, options }: {
  onChange: (genres: number[]) => void;
  options: SelectOption[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (selectedOptions: MultiValue<SelectOption>, _actionMeta: ActionMeta<SelectOption>) => {
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
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#3b82f6',        // main accent color (blue-500)
          primary25: '#2563eb',      // option hover color
          primary50: '#60a5fa',      // lighter hover (optional)
          neutral0: '#1e293b',       // background of control (slate-800)
          neutral5: '#334155',       // light background variant
          neutral10: '#3b82f6',      // multi-value background
          neutral20: '#334155',      // border color (normal)
          neutral30: '#3b82f6',      // border color (focused)
          neutral40: '#9ca3af',      // placeholder text
          neutral60: '#cbd5e1',      // icon color
          neutral80: '#f8fafc',      // text color
        },
      })}
    />
  )
}