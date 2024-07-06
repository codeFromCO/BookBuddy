import React from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { GiOpenBook } from 'react-icons/gi';
import { SiBookstack } from 'react-icons/si';
import { Link } from 'react-router-dom';

export default function SideBar(props) {

  return (
    <div>
      <div className='fixed flex flex-col w-14 items-center bg-baseSidebar h-screen pt-16 gap-5 border-r-2 border-baseSidebar'>
        <Link
          to='/'
          className={`${
            props.active === 'home'
              ? 'bg-baseBackgroundPrimary'
              : 'hover:bg-baseBackgroundSecondary'
          }  w-10 h-10 flex items-center justify-center rounded-md`}
        >
          <GiOpenBook size='1.5em' />
        </Link>
        <Link
          to='/history'
          className={`${
            props.active === 'history'
              ? 'bg-baseBackgroundPrimary'
              : 'hover:bg-baseBackgroundSecondary'
          }  w-10 h-10 flex items-center justify-center rounded-md`}
        >
          <SiBookstack size='1.5em' />
        </Link>
        <Link
          to='/settings'
          className={`${
            props.active === 'settings'
              ? 'bg-baseBackgroundPrimary'
              : 'hover:bg-baseBackgroundSecondary'
          }  w-10 h-10 flex items-center justify-center rounded-md`}
        >
          <IoSettingsSharp size='1.5em' />
        </Link>
      </div>
    </div>
  );
}
