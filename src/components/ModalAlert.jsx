import React from 'react';
import Button from './Button';

const ModalAlert = (props) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-75'></div>
      <div className='relative flex flex-col px-5 pt-7 max-w-[500px] w-11/12 bg-white rounded-lg text-baseTextPrimary z-60'>
        <div className='text-xl font-medium'>{props.heading}</div>
        <div className='text-sm my-2'>{props.subheading}</div>
        <div className='flex justify-end pb-5 gap-x-2'>
          <Button name='Cancel' tertiary='true' onClick={props.cancel} />
          <Button name='Confirm' onClick={props.confirm} />
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
