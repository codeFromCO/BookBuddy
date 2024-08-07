import React from 'react';

const Button = ({ onClick, wide, tertiary, name }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center h-[48px] p-3 ${
        wide ? '' : 'w-[96px]'
      } rounded-md font-semibold ${
        tertiary
          ? 'text-textOnLight hover:bg-buttonLightFocus'
          : 'text-textOnDark bg-buttonDark hover:bg-buttonDarkFocus'
      }`}
      aria-label={name}
      title={name}
    >
      {name}
    </button>
  );
};

export default Button;
