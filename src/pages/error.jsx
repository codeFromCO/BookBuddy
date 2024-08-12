import React from 'react';
import { FaWorm } from 'react-icons/fa6';
import { FaQuestion } from 'react-icons/fa6';
import { PiHardHatDuotone } from 'react-icons/pi';
import SideBar from '../components/SideBar';

const ErrorPage = ({active, errorType}) => {
  return (
    <div>
      {active && <SideBar active={active} />}
      <div className={`flex flex-col justify-center items-center gap-y-4`}>
        <div
          className={`flex flex-col px-5 py-5 fixed top-1/2 left-1/2 transform ${
            active
              ? 'sm:-translate-x-[calc(50%-20px)] -translate-x-1/2'
              : '-translate-x-1/2'
          } -translate-y-1/2 max-w-[500px] w-11/12 rounded-lg items-center`}
        >
          <div className='flex flex-col items-end mb-3'>
            {errorType === '404' && (
              <FaQuestion className='size-8 absolute -translate-y-8 translate-x-5 rotate-[18deg]' />
            )}
            {errorType === 'construction' && (
              <PiHardHatDuotone className='size-8 absolute -translate-y-6' />
            )}
            <FaWorm className='size-14' />
          </div>
          <div className='flex flex-col text-center'>
            <h2 className='text-xl font-bold'>
              {errorType === '404'
                ? '404 page not found'
                : 'Under construction'}
            </h2>
            <p className='text-sm mt-2'>
              {errorType === '404'
                ? `There's nothing to see here.`
                : 'Stayed tuned for upcoming features.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
