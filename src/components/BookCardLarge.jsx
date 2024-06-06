import React from 'react';
import { MdDelete } from "react-icons/md";

// TO-DO dynamic sizing of cards

const BookCardLarge = (props) => {
  return (
    <div className='bg-baseMidGray p-3 m-3 rounded-md w-5/6 h-full'>
      <div className='flex'>
        <div className='pl-3 w-full'>
          <div className='flex justify-between'>
            <h2 className='font-bold text-lg'>{props.title}</h2>
            <MdDelete
              className='size-5 hover:cursor-pointer hover:text-basePeach'
              onClick={props.onClick}
            />
          </div>
          <h3 className='text-sm mb-2'>{props.author}</h3>
          <textarea className='text-sm w-full p-2 rounded-md focus:border-2 focus:border-black focus:outline-none resize-none' value={props.value}></textarea>
        </div>
      </div>
    </div>
  );
};

export default BookCardLarge;
