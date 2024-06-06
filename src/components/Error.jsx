import React from 'react';

const Error = (props) => {
  return (
    <div className='p-2 w-inputSearchWidth border-2 rounded-md border-basePeach bg-basePeachLight text-basePeach'>
      <p>{props.alert}</p>
    </div>
  );
};

export default Error;
