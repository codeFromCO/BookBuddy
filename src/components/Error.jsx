import React from 'react';

const Error = (props) => {
  return (
    <div className='p-2 mt-3 border-2 rounded-md border-baseAlertText bg-baseAlertBackground text-baseAlertText'>
      <p>{props.alert}</p>
    </div>
  );
};

export default Error;
