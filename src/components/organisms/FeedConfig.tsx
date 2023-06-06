import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Select } from '../common';
import { CategoryType, SourceType, getCategories, getSources, useGlobalContext, setFeedConfig } from '../../utils';

export const FeedConfig = () => {
  const { config, setConfig } = useGlobalContext()
  const [category, setCategory] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [open, setOpen] = useState(1);
  const [cancelDisabled, setCancelDisabled] = useState<boolean>(true);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(res => {
      setCategories(res.categories.map((item: CategoryType) => item.name));
    })
  }, [])

  useEffect(() => {
    setSource(config.feedSource);
    setCategory(config.feedCategory);
    setAuthor(config.feedAuthor);
  }, [config.feedAuthor, config.feedCategory, config.feedSource])

  useEffect(() => {
    getSources({category}).then(res => {
      setSources(res.sources.map((item: SourceType) => item.name));
    })
  }, [category])

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  
  const handleChangeSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
    setCancelDisabled(false);
    setSaveDisabled(false);
  }

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setCancelDisabled(false);
    setSaveDisabled(false);
  }

  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
    setCancelDisabled(false);
    setSaveDisabled(false);
  }

  const handleClickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCancelDisabled(true);
    setSaveDisabled(true);
  }

  const handleClickSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCancelDisabled(true);
    setSaveDisabled(true);
    setFeedConfig({author, source, category}).then(res => {
      setConfig({...config, feedAuthor: author, feedCategory: category, feedSource: source})
    })
  }

  return (
    <>
      <Accordion open={open === 1} className='lg:hidden bg-white  card flex flex-col gap-5 shadow rounded h-fit px-1 py-5 lg:p-5'>
        <AccordionHeader onClick={() => handleOpen(1)} className="flex gap-3 justify-center text-center text-lg bold">
          Preferred Feed Information
          {(open === 1) && <AiOutlineUp /> || <AiOutlineDown />}
        </AccordionHeader>
        <hr />
        <AccordionBody className='px-1 lg:px-5'>
          <div className='text-left'>
            <label className='text-sm font-semibold uppercase'>Category</label>
            <hr />
            <div className='flex flex-col py-5'>
              <Select value={category} onChange={handleChangeCategory} options={categories} placeholder='category' />
            </div>
          </div>
          <div className='text-left'>
            <label className='text-sm font-semibold uppercase'>Source</label>
            <hr />
            <div className='flex flex-col py-5'>
              <Select value={source} onChange={handleChangeSource} options={sources} placeholder='source' />
            </div>
          </div>
        </AccordionBody>
      </Accordion>
      <div className='hidden lg:flex bg-white card flex-col gap-5 shadow rounded h-fit px-1 py-5 lg:p-5'>
        <div className="flex justify-center text-center text-lg bold">
          Preferred Feed Information
        </div>
        <hr />
        <div className='px-1 lg:px-5'>
          <div className='text-left'>
            <label className='text-sm font-semibold uppercase'>Category</label>
            <hr />
            <div className='flex flex-col py-5'>
              <Select value={category} onChange={handleChangeCategory} options={categories} placeholder='category' />
            </div>
          </div>
          <div className='text-left'>
            <label className='text-sm font-semibold uppercase'>Source</label>
            <hr />
            <div className='flex flex-col py-5'>
              <Select value={source} onChange={handleChangeSource} options={sources} placeholder='source' />
            </div>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <button disabled={cancelDisabled} onClick={handleClickCancel} className="cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:outline outline-blue-500 gap-2 border-none shadow hover:shadow-lg relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button disabled={saveDisabled} onClick={handleClickSave} className="cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:outline outline-blue-500 gap-2 border-none shadow hover:shadow-lg relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
