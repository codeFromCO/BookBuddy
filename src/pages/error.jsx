import React from 'react';
import { FaWorm } from 'react-icons/fa6';
import { FaQuestion } from 'react-icons/fa6';
import { PiHardHatDuotone } from 'react-icons/pi';
import SideBar from '../components/SideBar';

const ErrorPage = (props) => {
  return (
    <div>
      {props.active && <SideBar active={props.active} />}
      <div className={`flex flex-col justify-center items-center gap-y-4`}>
        <div
          className={`flex flex-col px-5 py-5 fixed top-1/2 left-1/2 transform ${
            props.active
              ? 'sm:-translate-x-[calc(50%-20px)] -translate-x-1/2'
              : '-translate-x-1/2'
          } -translate-y-1/2 max-w-[500px] w-11/12 rounded-lg items-center`}
        >
          <div className='flex flex-col items-end mb-3'>
            {props.errorType === '404' && (
              <FaQuestion className='size-8 absolute -translate-y-8 translate-x-5 rotate-[18deg]' />
            )}
            {props.errorType === 'construction' && (
              <PiHardHatDuotone className='size-8 absolute -translate-y-6' />
            )}
            <FaWorm className='size-14' />
          </div>
          <div className='flex flex-col text-center'>
            <div className='text-xl font-bold'>
              {props.errorType === '404'
                ? '404 page not found'
                : 'Under construction'}
            </div>
            <div className='text-sm mt-2'>
              {props.errorType === '404'
                ? `There's nothing to see here.`
                : 'Stayed tuned for upcoming features.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
