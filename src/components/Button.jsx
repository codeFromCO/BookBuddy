import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.tertiary
          ? 'px-5 h-[48px] text-black rounded-md font-semibold hover:bg-baseButtonFocus2'
          : 'px-5 h-[48px] font-semibold bg-black rounded-md text-white hover:bg-baseButtonFocus'
      }
    >
      {props.name}
    </button>
  );
};

export default Button;
