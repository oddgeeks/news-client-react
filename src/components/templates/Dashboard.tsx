import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ArticleType, getFeedConfig, getFilteredArticles, getFeedArticles } from '../../utils';
import { ArticleCard, Pagination, Filter, FeedConfig } from '../organisms';
import { SearchInput } from '../common';
import { useGlobalContext } from '../../utils';

export const Dashboard = () => {
  const { config, setConfig } = useGlobalContext();
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [preDisabled, setPreDisabled] = useState<boolean>(true);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    getFeedArticles().then(res => {
      setArticles(res.articles);
    })
  }, [])

  useEffect(() => {
    if (!config.filterKeyword) {
      getFeedArticles().then(res => {
        setArticles(res.articles);
      })
    }
  }, [config.filterKeyword, config.feedAuthor, config.feedSource, config.feedCategory])

  useEffect(() => {
    if (config.filterKeyword) {
      getFilteredArticles({
        source: config.filterSource, 
        from: config.filterFrom, 
        to: config.filterTo, 
        keyword: config.filterKeyword, 
        page: config.page
      }).then(res => {
        setArticles(res.articles);
      }).catch(err => {
        console.log(err)
        setArticles([]);
      })
    }
  }, [config.page, config.filterSource, config.filterFrom, config.filterTo, config.filterKeyword])
  
  useEffect(() => {
    getFeedConfig().then(res => {
      setConfig({...config, feedCategory: res.category, feedSource: res.source})
    })
  }, [])

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setConfig({...config, filterKeyword: event.target.value})
  }

  const handlePagePrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (page <= 1) {
      setPreDisabled(true);
      return;
    }
    setConfig({...config, page: page - 1})
    setPage(page - 1);
  }

  const handlePageNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setConfig({...config, page: page + 1})
    if (page) setPreDisabled(false);
    setPage(page + 1);
  }

  return (
    <div className="bg-slate-100">
      <div className='grid lg:grid-cols-4 gap-10 p-5'>
        <div className="lg:col-span-1 flex flex-col gap-5 p-5">
          <FeedConfig />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-5 p-5 bg-white rounded">
          <div className='px-1 lg:px-5'>
            <Filter />
          </div>
          <div className='px-1 lg:px-5'>
            <SearchInput value={keyword} onChange={handleChangeKeyword} />
          </div>
          {articles && articles.length > 0 && <Pagination onPrevious={handlePagePrevious} preDisabled={preDisabled || page <= 1} onNext={handlePageNext} nextDisabled={nextDisabled} />}
          {
            articles && articles.length > 0 && articles?.map((article) => {
              return <ArticleCard key={uuidv4()} {...article} />
            })
          }
        </div>
      </div>
    </div>
  );
}
