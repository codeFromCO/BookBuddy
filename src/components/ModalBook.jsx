import React from 'react';
import { MdDelete } from 'react-icons/md';
import Button from './Button.jsx';

const ModalBook = (props) => {
  return (
    <div className='bg-white text-textOnLight h-full flex flex-col w-full sm:w-1/2 fixed top-0 right-0 p-6 shadow-thick z-40 animate-slide-down-from-top sm:animate-slide-in-from-right'>
      <div className='w-full p-2'>
        <div className='flex justify-between space-x-3'>
          <h2 className='font-bold text-2xl'>{props.title}</h2>
          <div>
            <MdDelete
              className='size-6 hover:cursor-pointer hover:text-buttonDarkFocus'
              onClick={props.onClickDelete}
              aria-label='Delete'
            />
          </div>
        </div>
        <h3 className='text-md mb-2'>{props.author}</h3>
      </div>
      <textarea
        className='text-sm w-full p-2 rounded-md border-2 border-white focus:outline-none resize-none h-full '
        value={props.value}
        onChange={props.onChange}
        placeholder={`Click here and start typing to add a note. Remember to click save!`}
      ></textarea>
      <hr className='w-full border border-primaryOnWhite my-3' />
      <div className='flex justify-end space-x-3'>
        <Button name='Close' tertiary='true' onClick={props.close} />
        <Button name='Save' onClick={props.save} />
      </div>
    </div>
  );
};

export default ModalBook;
