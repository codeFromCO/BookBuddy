import React from 'react';
import { MdDelete } from 'react-icons/md';
import Button from './Button';

const ModalBook = (props) => {
  return (
    <div className='bg-white text-baseTextPrimary h-full flex flex-col w-full sm:w-1/2 fixed top-0 right-0 p-6 shadow-thick z-40 animate-fade-in sm:animate-slide-in-from-right'>
      <div className='w-full p-2'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-2xl'>{props.title}</h2>
          <div className='flex space-x-2'>
            <MdDelete
              className='size-6 hover:cursor-pointer hover:text-baseButtonFocus'
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
        placeholder={`Click to add a note. Remember to click save!`}
      ></textarea>
      <hr className='w-full border border-baseCardBackground my-3' />
      <div className='flex justify-end space-x-3'>
        <Button name='Cancel' tertiary='true' onClick={props.cancel} />
        <Button name='Save' onClick={props.save} />
      </div>
    </div>
  );
};

export default ModalBook;
