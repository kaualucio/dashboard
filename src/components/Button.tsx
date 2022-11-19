import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  fullW?: boolean;
};

const Button = ({ label, fullW = false, ...rest }: ButtonProps) => {
  return (
    <button
      className={`mt-5 self-end w-full ${
        !fullW ? 'sm:w-52' : ''
      } text-[#fff] rounded-md py-3 text-center bg-blue transition duration-300 hover:bg-darkBlue disabled:bg-darkBlue disabled:cursor-default`}
      {...rest}
    >
      {label}
    </button>
  );
};

export { Button };
