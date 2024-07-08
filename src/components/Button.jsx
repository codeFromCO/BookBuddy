import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`flex justify-center items-center h-[48px] w-[96px] rounded-md font-semibold ${
        props.tertiary
          ? 'text-black hover:bg-baseButtonFocus2'
          : 'text-white bg-black hover:bg-baseButtonFocus'
      }`}
      aria-label={props.name}
    >
      {props.name}
    </button>
  );
};

export default Button;
