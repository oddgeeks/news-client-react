import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../utils';

const WelcomePage = () => {
  const navigate = useNavigate();
  
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
      <div className="h-screen px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full h-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          
          <Link to="/dashboard" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Go to dashboard
          </Link>
        </div>
      </div>
    </>
  )
}

export default WelcomePage;
