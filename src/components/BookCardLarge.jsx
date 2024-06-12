import React from 'react';
import { MdDelete } from 'react-icons/md';
import { MdSave } from 'react-icons/md';

// TO-DO dynamic sizing of cards

const BookCardLarge = (props) => {
  return (
    <div className='bg-baseCardBackground text-baseTextPrimary p-3 m-3 rounded-md h-full flex flex-col w-full sm:w-3/4'>
      <div className='pl-3 w-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-lg'>{props.title}</h2>
          <div className='flex space-x-2'>
            <MdSave
              className='size-5 hover:cursor-pointer hover:text-baseButtonFocus'
              onClick={props.onSubmit}
            />
            <MdDelete
              className='size-5 hover:cursor-pointer hover:text-baseButtonFocus'
              onClick={props.onClickDelete}
            />
          </div>
        </div>
        <h3 className='text-sm mb-2'>{props.author}</h3>
      </div>
      <textarea
        className='text-sm w-full p-2 rounded-md border-2 border-white focus:border-baseButtonFocus focus:outline-none resize-none h-full '
        value={props.value}
        onChange={props.onChange}
        placeholder={`Click to add a note. Don't forget to save!`}
      ></textarea>
    </div>
  );
};

export default BookCardLarge;
