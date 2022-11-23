import React, { InputHTMLAttributes } from 'react';

type InputFileProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isRequired?: boolean;
    isTextArea?: boolean;
};

const InputFile = ({
  label,
  name,
  isRequired = false,
  isTextArea = false,
  ...rest
}: InputFileProps) => {
  return (
    <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
      <label
        htmlFor={name}
        className="text-md text-text font-medium mb-3 lg:mb-0"
      >
        {label} {isRequired && <span className="text-red">*</span>}
      </label>
        <input
          type="file"
          {...rest}
          name={name}
          id={name}
          className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
        />

    </div>
  );
};


export { InputFile }