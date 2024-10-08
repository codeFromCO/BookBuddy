import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoStatsChartSharp } from 'react-icons/io5';
import { GiOpenBook } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const SideBar = ({ active }) => {
  const [showSidebarNames, setShowSidebarNames] = useState(false);

  return (
    <div
      onMouseOver={() => setShowSidebarNames(true)}
      onMouseOut={() => setShowSidebarNames(false)}
    >
      <div
        className={`fixed flex flex-col bg-primary h-screen pt-16 gap-5 border-r-2 p-1 border-r-primaryAccent
          invisible sm:visible z-20`}
      >
        <Link
          to='/'
          className={`${
            active === 'home' ? 'bg-primaryFocus' : 'hover:bg-primaryFocus'
          }  p-3 space-x-2 h-10 flex items-center rounded-md`}
          aria-label='Home'
        >
          <GiOpenBook size='1.5em' />
          {showSidebarNames && (
            <div
              className={`text-sm 
          ${active === 'home' ? 'font-bold' : ''} `}
            >
              Home
            </div>
          )}
        </Link>
        <Link
          to='/stats'
          className={`${
            active === 'stats' ? 'bg-primaryFocus' : 'hover:bg-primaryFocus'
          }  p-3 space-x-2 h-10 flex items-center rounded-md`}
          aria-label='Stats'
        >
          <IoStatsChartSharp size='1.5em' />
          {showSidebarNames && (
            <div
              className={`text-sm 
          ${active === 'stats' ? 'font-bold' : ''} `}
            >
              Stats
            </div>
          )}
        </Link>
        <Link
          to='/settings'
          className={`${
            active === 'settings' ? 'bg-primaryFocus' : 'hover:bg-primaryFocus'
          }  p-3 space-x-2 h-10 flex items-center justify-center rounded-md`}
          aria-label='Settings'
        >
          <IoSettingsSharp size='1.5em' />
          {showSidebarNames && (
            <div
              className={`text-sm 
          ${active === 'settings' ? 'font-bold' : ''} `}
            >
              Settings
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
