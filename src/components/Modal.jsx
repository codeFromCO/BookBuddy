import React from 'react';
import Button from './Button';

const Modal = (props) => {
  return (
    <div className='fixed h-full w-full z-10 ml-[-20px]'>
      {' '}
      {/* hacky solution to gutter issue */}
      <div className='h-full w-full '></div>
      <div className='flex flex-col px-5 pt-7 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-11/12 h-[170px] bg-white rounded-lg text-basePeach border-2 border-basePeach '>
        <div className='text-xl font-medium'>{props.heading}</div>
        <div className='text-sm mt-2'>{props.subheading}</div>
        <div className='flex-grow'></div>{' '}
        {/* This will make the space between content and buttons flexible */}
        <div className='flex justify-end pb-5 gap-x-2'>
          <Button tertiary='true' name='Confirm' onClick={props.okay} />
          <Button name='Cancel' onClick={props.cancel} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
