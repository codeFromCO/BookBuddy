import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineNavigateNext } from 'react-icons/md';

const ModalHamburger = ({ active, hideModalHamburger }) => {
  const [displayHomeArrow, setDisplayHomeArrow] = useState(false);
  const [displayStatsArrow, setDisplayStatsArrow] = useState(false);
  const [displaySettingsArrow, setDisplaySettingsArrow] = useState(false);

  const handleLinkClick = (page) => {
    if (active === page) {
      hideModalHamburger();
    }
  };

  return (
    <div className='fixed h-screen w-full  bg-background space-y-3 text-2xl p-5 z-40 animate-slide-in-from-left'>
      <div className='flex justify-end'>
        <button onClick={hideModalHamburger}>
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
            className={`${active === 'home' ? 'font-bold' : ''}`}
          >
            Home
          </Link>
          {displayHomeArrow && <MdOutlineNavigateNext className='size-8' />}
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to='/stats'
            onClick={() => handleLinkClick('stats')}
            aria-label='Stats'
            onMouseOver={() => setDisplayStatsArrow(true)}
            onMouseOut={() => setDisplayStatsArrow(false)}
            className={`${active === 'stats' ? 'font-bold' : ''}`}
          >
            Stats
          </Link>
          {displayStatsArrow && <MdOutlineNavigateNext className='size-8' />}
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to='/settings'
            onClick={() => handleLinkClick('settings')}
            aria-label='Settings'
            onMouseOver={() => setDisplaySettingsArrow(true)}
            onMouseOut={() => setDisplaySettingsArrow(false)}
            className={`${active === 'settings' ? 'font-bold' : ''}`}
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
