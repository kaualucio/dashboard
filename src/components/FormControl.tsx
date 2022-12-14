import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type FormControlProps = InputHTMLAttributes<HTMLInputElement>
& TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    name: string;
    isRequired?: boolean;
    isTextArea?: boolean;
};

const FormControl = ({
  label,
  name,
  isRequired = false,
  isTextArea = false,
  ...rest
}: FormControlProps) => {
  return (
    <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
      <label
        htmlFor={name}
        className="text-md text-text font-medium mb-3 lg:mb-0"
      >
        {label} {isRequired && <span className="text-red">*</span>}
      </label>
      {!isTextArea ? (
        <input
          {...rest}
          name={name}
          id={name}
          className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
        />
      ) : (
        <textarea
          {...rest}
          name={name}
          id={name}
          className="outline-none resize-y h-32 block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
        ></textarea>
      )}
    </div>
  );
};

export { FormControl };
