import React, {useEffect} from 'react';
import { Header } from './components/organisms';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="bg-slate-100 max-w-7xl mx-auto">
        <Header />
        <div className='mx-4'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout;
