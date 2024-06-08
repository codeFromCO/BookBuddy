import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.tertiary
          ? 'px-5 h-[48px] bg-baseButtonPrimary text-baseButtonFocus rounded-md font-semibold hover:bg-baseTextPrimary'
          : 'px-5 h-[48px] text-baseButtonPrimary font-semibold bg-baseButtonFocus rounded-md hover:bg-baseTextPrimary'
      }
    >
      {props.name}
    </button>
  );
};

export default Button;
