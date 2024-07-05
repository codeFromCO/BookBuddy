import React from 'react';

const ErrorPage = () => {
  return (
    <div className='bg-baseBG h-screen flex flex-col justify-center items-center gap-y-4'>
      <div className='flex flex-col px-5 py-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-11/12 rounded-lg items-center'>
        <div className='flex flex-col text-center'>
          <div className='text-xl font-bold'>404 page not found</div>
          <div className='text-sm mt-2'>There's nothing to see here.</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
