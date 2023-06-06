import React from 'react';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr'

interface Props {
  preDisabled?: boolean;
  nextDisabled?: boolean;
  onPrevious: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Pagination: React.FC<Props> = ({ 
  onPrevious, onNext, preDisabled=false, nextDisabled=false
}) => {
  return (
    <div className="inline-flex items-center justify-between border-gray-200 bg-white px-1 lg:px-4 py-1 lg:py-3">
      <button disabled={preDisabled} onClick={onPrevious} className="cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:outline outline-blue-500 gap-2 border-none shadow hover:shadow-lg relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        <GrLinkPrevious />
        Previous
      </button>
      <button disabled={nextDisabled} onClick={onNext} className="cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:outline outline-blue-500 gap-2 border-none shadow hover:shadow-lg relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Next
        <GrLinkNext />
      </button>
    </div>
  )
}
