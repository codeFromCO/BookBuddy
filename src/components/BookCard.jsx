import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

// TO-DO dynamic sizing of cards

const BookCard = (props) => {

  return (
    <div className='bg-baseMidGray p-3 rounded-md mt-3 mr-3 w-96'>
      <div className='flex'>
        <div className='min-w-16'>

        <img className='max-h-32' src={props.src}></img>
        </div>
        <div className='pl-3 w-full'>
          <div className='flex justify-between'>
            <h2 className='font-bold text-lg'>{props.title}</h2>
            <FaRegEdit
              className='size-5 hover:cursor-pointer hover:text-basePeach ml-3'
              onClick={props.onClick}
            />
          </div>
          <h3 className='text-sm mb-2'>{props.author}</h3>
          <h3 className='text-sm'>Last edit: 6 June 2025</h3>
          {/* <p className='text-sm whitespace-pre-wrap'>{props.notes}</p> */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
