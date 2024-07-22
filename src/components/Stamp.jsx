import React from 'react';

const Stamp = () => {
  return (
    <div className='fixed bg-error text-textOnError border-2 border-textOnError px-4 py-2 items-center content-center text-center rounded-full h-[75px] w-[75px]'>
      <p className='text-xs'>Book already added</p>
    </div>
  );
};

export default Stamp;
