import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`flex justify-center items-center h-[48px] p-3 ${
        props.wide ? '' : 'w-[96px]'
      } rounded-md font-semibold ${
        props.tertiary
          ? 'text-textOnLight hover:bg-buttonLightFocus'
          : 'text-textOnDark bg-buttonDark hover:bg-buttonDarkFocus'
      }`}
      aria-label={props.name}
      title={props.name}
    >
      {props.name}
    </button>
  );
};

export default Button;
