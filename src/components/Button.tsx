import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button = ({ label, ...rest }: ButtonProps) => {
  return (
    <button
      className="mt-5 self-end w-full sm:w-52 text-[#fff] rounded-md py-3 text-center bg-blue"
      {...rest}
    >
      {label}
    </button>
  );
};

export { Button };
