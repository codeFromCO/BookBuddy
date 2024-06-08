import React from 'react';

const Error = (props) => {
  return (
    <div className='p-2 w-inputSearchWidth border-2 rounded-md border-baseButtonPrimary bg-baseButtonFocus text-baseButtonPrimary'>
      <p>{props.alert}</p>
    </div>
  );
};

export default Error;
