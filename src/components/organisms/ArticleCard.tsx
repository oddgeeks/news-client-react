import React from 'react';
import { Badge } from '../common';
import { ArticleType } from '../../utils';

export const ArticleCard: React.FC<ArticleType> = ({ 
  source, title, description, publishedAt, author, url, urlToImage
}) => {
  return (
    <>
      <a href={url} target='blank' className='card grid grid-cols-1 lg:grid-cols-4 items-center shadow gap-10 p-5 border rounded-md hover:shadow-xl hover:border-2'>
        <div className='col-span-1'>
          <img className='w-full rounded' 
            src={!urlToImage? `https://unsplash.it/150/200?image=${Math.floor(Math.random() * 100)}`: urlToImage} 
            alt={urlToImage} 
          />
        </div>
        <div className='lg:col-span-3 flex flex-col gap-5'>
          <div className='flex flex-col md:inline-flex md:flex-row gap-5 items-start md:items-center'>
            <Badge content={source.name} color='blue' bgColor='green' className='font-semibold' />
            <h2 className='text-center font-bold text-2xl md:text-start w-full'>
              { title }
            </h2>
          </div>
          <div className='inline-flex gap-5 items-center text-slate-800 text-lg break-all'>
            { description }
          </div>
          <div className='inline-flex gap-5 items-center text-sm justify-center md:justify-start'>
            <span className='hidden md:flex'>
              Published at 
            </span>
            <Badge content={publishedAt} className='font-semibold' />
            <span className='hidden md:flex'>
              By 
            </span>
            <Badge content={author} className='font-semibold' />
          </div>
        </div>
      </a>
    </>
  )
}
