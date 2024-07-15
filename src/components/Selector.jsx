import React from 'react';

const Selector = (props) => {
  return (
    <div className='flex h-[48px] my-3'>
      <select
        className='h-full rounded-md p-3 hover:cursor-pointer focus:outline-none'
        defaultValue={'DEFAULT'}
        onChange={props.onChange}
      >
        <option value='DEFAULT' disabled>
          Sort by
        </option>
        <option value='title'>Title</option>
        <option value='addedNewOld'>Date added (newest - oldest)</option>
        <option value='addedOldNew'>Date added (oldest - newest)</option>
        <option value='updatedNewOld'>Date updated (newest - oldest)</option>
        <option value='updatedOldNew'>Date updated (oldest - newest)</option>
      </select>
    </div>
  );
};

export default Selector;
