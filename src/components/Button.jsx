import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.tertiary
          ? 'px-5 h-[48px] bg-basePeach text-basePeachLight rounded-md font-semibold hover:bg-baseDeepBlue'
          : 'px-5 h-[48px] text-basePeach font-semibold bg-basePeachLight rounded-md hover:bg-baseDeepBlue'
      }
    >
      {props.name}
    </button>
  );
};

export default Button;
