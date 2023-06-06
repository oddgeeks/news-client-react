import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  options: string[];
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const Select: React.FC<Props> = ({ 
  options, placeholder, onChange, value
}) => {
  return (
    <select value={value} onChange={onChange} id="countries" className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize">
      <option value={value? value: 'all'}>{ value? value: placeholder }</option>
      {
        options?.map((option) => (
          <option key={uuidv4()} value={option}>{ option }</option>
        ))
      }
    </select>
  )
}
