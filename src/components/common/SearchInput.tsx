import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const SearchInput: React.FC<Props> = ({value, onChange}) => {
  return (
    <div>
      <div className="p-2 relative mx-auto text-gray-600 w-full">
        <input value={value} onChange={onChange} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline outline-blue-500 w-full"
          type="search" name="search" placeholder="Search by keyword" />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <CiSearch />
        </button>
      </div>
    </div>
  )
}
