import React from 'react';

const Selector = (props) => {
  return (
    <div className='flex h-[48px]'>
      <select
        className={`h-full rounded-md p-3 hover:cursor-pointer focus:outline-none w-full sm:w-fit`}
        defaultValue={'DEFAULT'}
        onChange={props.onChange}
      >
        <option value='DEFAULT' disabled>
          Sort by
        </option>
        <option value='title'>Title</option>
        <option value='addedNewOld'>Date added (new - old)</option>
        <option value='addedOldNew'>Date added (old - new)</option>
        <option value='updatedNewOld'>Date updated (new - old)</option>
        <option value='updatedOldNew'>Date updated (old - new)</option>
      </select>
    </div>
  );
};

export default Selector;
