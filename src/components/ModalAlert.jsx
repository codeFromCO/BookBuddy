import React from 'react';
import Button from './Button';

const ModalAlert = (props) => {
  return (
    <div className='flex flex-col px-5 pt-7 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-11/12 bg-white rounded-lg text-baseTextPrimary border-2 border-baseTextPrimary '>
      <div className='text-xl font-medium'>{props.heading}</div>
      <div className='text-sm my-2'>{props.subheading}</div>
      <div className='flex justify-end pb-5 gap-x-2'>
        <Button name='Cancel' tertiary='true' onClick={props.cancel} />
        <Button name='Confirm' onClick={props.confirm} />
      </div>
    </div>
  );
};

export default ModalAlert;
