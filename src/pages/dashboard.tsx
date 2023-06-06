import React, { useState, useEffect } from 'react';
import { Dashboard } from '../components/templates';
import { MyGlobalContext, ConfigType } from '../utils'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../utils';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<ConfigType>({
    filterKeyword: '',
    filterSource: 'all',
    filterCategory: 'all',
    filterFrom: new Date(),
    filterTo: new Date(),
    feedAuthor: '',
    feedCategory: '',
    feedSource: '',
    page: 1
  })
  
  useEffect(() => {
    (async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          navigate('/signin');
        }
      } catch (e) {
        console.log(e)
        navigate('/signin');
      }
    })()
  })

  return (
    <>
      <MyGlobalContext.Provider value= {{ config, setConfig }}>
        <Dashboard />
      </MyGlobalContext.Provider>
    </>
  )
}

export default DashboardPage;
