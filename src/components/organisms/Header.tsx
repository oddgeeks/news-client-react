import React, {useState, useEffect} from 'react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { GoKey } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom'
import { signOut, getCurrentUser } from '../../utils';

export const Header = () => {
  const [isLogedin, setIsLogedin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogedin(getCurrentUser());
  }, [])

  const handleSignout = () => {
    (async () => {
      try {
        await signOut()
        setIsLogedin(false)
        navigate('/');
      } catch (e) {
        console.log(e)
      }
    })()
  }

  return  (
    <div className="flex itemss-center justify-end border-b-1 border-b">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex p-5 items-center justify-center gap-2 w-full">
            <GoKey />
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {!getCurrentUser() && 
              <>
                <div className="py-1">
                  <Menu.Item>
                    <Link to="/signin" className='bg-gray-100 text-gray-900block px-4 py-2 text-sm'>
                      Sign In
                    </Link>
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    <Link to="/signup" className='bg-gray-100 text-gray-900block px-4 py-2 text-sm'>
                      Sign Up
                    </Link>
                  </Menu.Item>
                </div>
              </>
            }
            {!!getCurrentUser() && 
              <div className="py-1">
                <Menu.Item>
                  <button onClick={handleSignout} className='bg-gray-100 text-gray-900block px-4 py-2 text-sm'>
                    Sign Out
                  </button>
                </Menu.Item>
              </div>
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
