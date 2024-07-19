import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { GiOpenBook } from 'react-icons/gi';
import { SiBookstack } from 'react-icons/si';
import { Link } from 'react-router-dom';

export default function SideBar(props) {
  const [showSidebarNames, setShowSidebarNames] = useState(false);

  return (
    <div>
      {/* symbol component */}
      <div
        onMouseOver={() => setShowSidebarNames(true)}
        onMouseOut={() => setShowSidebarNames(false)}
      >
        <div
          className={`fixed flex flex-col w-14 items-center bg-baseSidebar h-screen pt-16 gap-5 border-r-2 ${
            showSidebarNames
              ? 'border-r-baseSidebar'
              : 'border-r-baseCardBackground'
          } invisible sm:visible z-20`}
        >
          <Link
            to='/'
            className={`${
              props.active === 'home'
                ? 'bg-baseBackgroundSecondary'
                : 'hover:bg-baseBackgroundSecondary'
            }  w-10 h-10 flex items-center justify-center rounded-md`}
            aria-label='Home'
          >
            <GiOpenBook size='1.5em' />
          </Link>
          <Link
            to='/history'
            className={`${
              props.active === 'history'
                ? 'bg-baseBackgroundSecondary'
                : 'hover:bg-baseBackgroundSecondary'
            }  w-10 h-10 flex items-center justify-center rounded-md`}
            aria-label='History'
          >
            <SiBookstack size='1.5em' />
          </Link>
          <Link
            to='/settings'
            className={`${
              props.active === 'settings'
                ? 'bg-baseBackgroundSecondary'
                : 'hover:bg-baseBackgroundSecondary'
            }  w-10 h-10 flex items-center justify-center rounded-md`}
            aria-label='Settings'
          >
            <IoSettingsSharp size='1.5em' />
          </Link>
        </div>
      </div>
      {/* text component */}
      <div
        className={`fixed flex flex-col w-20 bg-baseSidebar h-screen pt-16 gap-5 border-r-2 border-r-baseCardBackground invisible sm:visible z-10 ${
          showSidebarNames ? 'animate-nav-expand' : 'animate-nav-hide'
        }`}
      >
        <div
          className={`
          h-10 flex items-center ${props.active === 'home' ? 'font-bold' : ''}`}
        >
          Home
        </div>
        <div
          className={`
          h-10 flex items-center`}
        >
          History
        </div>
        <div
          className={`
          h-10 flex items-center`}
        >
          Settings
        </div>
      </div>
    </div>
  );
}
