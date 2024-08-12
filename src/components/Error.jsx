import React from 'react';

const Error = ({alert}) => {
  return (
    <div
      className='absolute max-w-full p-2 border-2 rounded-md 
    border-textOnError bg-error text-textOnError'
    >
      <p>{alert}</p>
    </div>
  );
};

export default Error;
