import React from 'react';
import Button from './Button.jsx';

const ModalAlert = ({ heading, subheading, cancel, confirm }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-75'></div>
      <div className='relative flex flex-col px-5 pt-7 max-w-[500px] w-11/12 bg-white rounded-lg text-baseTextPrimary z-60'>
        <div className='text-xl font-medium'>{heading}</div>
        <div className='text-sm my-2'>{subheading}</div>
        <div className='flex justify-end pb-5 gap-x-2'>
          <Button name='Cancel' tertiary='true' onClick={cancel} />
          <Button name='Confirm' onClick={confirm} />
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
