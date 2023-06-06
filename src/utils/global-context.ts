import { createContext, useContext } from "react"

export type ConfigType = {
  feedAuthor: string;
  feedCategory: string;
  feedSource: string;

  filterKeyword: string;
  filterSource: string;
  filterCategory: string;
  filterFrom: Date;
  filterTo: Date;

  page: number;
}

export type GlobalContextType = {
  config: ConfigType
  setConfig:(c: ConfigType) => void
}

export const MyGlobalContext = createContext<GlobalContextType>({
    config: {
      filterKeyword: '',
      filterSource: 'all',
      filterCategory: 'a;;',
      filterFrom: new Date(),
      filterTo: new Date(),
      feedAuthor: '',
      feedCategory: '',
      feedSource: '',
      page: 1
    }, 
    setConfig: () => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)
