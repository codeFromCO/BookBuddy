import React from 'react';

const Error = (props) => {
  return (
    <div
      className='absolute p-2 border-2 rounded-md 
    border-textOnError bg-error text-textOnError'
    >
      <p>{props.alert}</p>
    </div>
  );
};

export default Error;
