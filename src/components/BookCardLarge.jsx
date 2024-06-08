import React from 'react';
import { MdDelete } from 'react-icons/md';
import { MdSave } from 'react-icons/md';

// TO-DO dynamic sizing of cards

const BookCardLarge = (props) => {
  return (
    <div className='bg-baseMidGray p-3 m-3 rounded-md w-full h-full flex flex-col'>
      <div className='pl-3 w-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-lg'>{props.title}</h2>
          <div className='flex space-x-2'>
            <MdSave
              className='size-5 hover:cursor-pointer hover:text-basePeach'
              onClick={props.onSubmit}
            />
            <MdDelete
              className='size-5 hover:cursor-pointer hover:text-basePeach'
              onClick={props.onClickDelete}
            />
          </div>
        </div>
        <h3 className='text-sm mb-2'>{props.author}</h3>
      </div>
      <textarea
        className='text-sm w-full p-2 rounded-md border-2 border-white focus:border-black focus:outline-none resize-none h-full'
        value={props.value}
        onChange={props.onChange}
      ></textarea>
    </div>
  );
};

export default BookCardLarge;
