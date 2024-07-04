import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.tertiary
          ? 'flex justify-center items-center h-[48px] w-[96px] text-black rounded-md font-semibold hover:bg-baseButtonFocus2'
          : 'flex justify-center items-center h-[48px] w-[96px] font-semibold bg-black rounded-md text-white hover:bg-baseButtonFocus'
      }
    >
      {props.name}
    </button>
  );
};

export default Button;
