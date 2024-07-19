import React from 'react';

export default function SideBarNames(props) {
  return (
    <div>
      <div
        className={`fixed flex flex-col w-20 bg-baseSidebar h-screen pt-16 gap-5 border-r-2 border-baseSidebar invisible sm:visible z-10 ${
          props.visible ? 'animate-nav-expand' : 'animate-nav-hide'
        }`}
      >
        <div
          to='/'
          className={`
             h-10 flex items-center`}
          aria-label='Home'
        >
          Home
        </div>
        <div
          to='/history'
          className={`
          h-10 flex items-center`}
          aria-label='History'
        >
          History
        </div>
        <div
          to='/settings'
          className={`
          h-10 flex items-center`}
          aria-label='Settings'
        >
          Settings
        </div>
      </div>
    </div>
  );
}
