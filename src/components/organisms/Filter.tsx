import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from '../common';
import { CategoryType, SourceType, getCategories, getSources, useGlobalContext } from '../../utils';

export const Filter = () => {
  const { config, setConfig } = useGlobalContext()
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>('all');
  const [source, setSource] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  
  useEffect(() => {
    getCategories().then(res => {
      setCategories(res.categories.map((item: CategoryType) => item.name));
    })
  }, [])

  useEffect(() => {
    getSources({category}).then(res => {
      setSources(res.sources.map((item: SourceType) => item.name));
    })
  }, [category])
  
  const handleChangeSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
    setConfig({...config, filterSource: event.target.value})
  }

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setConfig({...config, filterCategory: event.target.value})
  }

  const handleChangeDateFrom = (date: Date | null) => {
    setDateFrom(date? date: new Date());
    setConfig({...config, filterFrom: date!})
  }

  const handleChangeDateTo = (date: Date | null) => {
    setDateTo(date? date: new Date());
    setConfig({...config, filterTo: date!})
  }

  return (
    <div className='bg-white grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 items-center justify-around shadow rounded p-1 lg:p-5 gap-2'>
      <div className='grid grid-cols-3 items-center gap-2 overflow-hidden'>
        <label className='col-span-1 text-sm font-semibold uppercase text-start'>From: </label>
        <DatePicker
          selected={dateFrom}
          onChange={handleChangeDateFrom}
          className="form-control"
          maxDate={dateTo}
        />
      </div>
      <div className='grid grid-cols-3 items-center gap-2 overflow-hidden'>
        <label className='col-span-1 text-sm font-semibold uppercase text-start'>To:</label>
        <DatePicker
          selected={dateTo}
          onChange={handleChangeDateTo}
          className="form-control"
          minDate={dateFrom}
          maxDate={new Date()}
        />
      </div>
      <div className='inline-flex items-center gap-2'>
        <label className='hidden md:flex text-sm font-semibold uppercase'>Category: </label>
        <Select value={category} onChange={handleChangeCategory} options={categories} placeholder='category' />
      </div>
      <div className='inline-flex items-center gap-2'>
        <label className='hidden md:flex text-sm font-semibold uppercase'>Source: </label>
        <Select value={source} onChange={handleChangeSource} options={sources} placeholder='source' />
      </div>
    </div>
  )
}
