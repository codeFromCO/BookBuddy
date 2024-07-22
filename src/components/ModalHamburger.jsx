import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineNavigateNext } from 'react-icons/md';

const ModalHamburger = (props) => {
  const [displayHomeArrow, setDisplayHomeArrow] = useState(false);
  const [displayHistoryArrow, setDisplayHistoryArrow] = useState(false);
  const [displaySettingsArrow, setDisplaySettingsArrow] = useState(false);

  const handleLinkClick = (page) => {
    if (props.active === page) {
      props.hideModalHamburger();
    }
  };

  return (
    <div className='fixed h-screen w-full  bg-background space-y-3 text-2xl p-5 z-40 animate-slide-in-from-left'>
      <div className='flex justify-end'>
        <button onClick={props.hideModalHamburger}>
          <IoMdAdd className='size-8 rotate-45' />
        </button>
      </div>
      <div className='flex flex-col space-y-7'>
        <div className='flex justify-between items-center'>
          <Link
            to='/'
            onClick={() => handleLinkClick('home')}
            aria-label='Home'
            onMouseOver={() => setDisplayHomeArrow(true)}
            onMouseOut={() => setDisplayHomeArrow(false)}
            className={`${props.active === 'home' ? 'font-bold' : ''}`}
          >
            Home
          </Link>
          {displayHomeArrow && <MdOutlineNavigateNext className='size-8' />}
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to='/history'
            onClick={() => handleLinkClick('history')}
            aria-label='History'
            onMouseOver={() => setDisplayHistoryArrow(true)}
            onMouseOut={() => setDisplayHistoryArrow(false)}
            className={`${props.active === 'history' ? 'font-bold' : ''}`}
          >
            History
          </Link>
          {displayHistoryArrow && <MdOutlineNavigateNext className='size-8' />}
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to='/settings'
            onClick={() => handleLinkClick('settings')}
            aria-label='Settings'
            onMouseOver={() => setDisplaySettingsArrow(true)}
            onMouseOut={() => setDisplaySettingsArrow(false)}
            className={`${props.active === 'settings' ? 'font-bold' : ''}`}
          >
            Settings
          </Link>
          {displaySettingsArrow && <MdOutlineNavigateNext className='size-8' />}
        </div>
      </div>
    </div>
  );
};

export default ModalHamburger;
