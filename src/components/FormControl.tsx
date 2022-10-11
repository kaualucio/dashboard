import React from 'react';

interface FormControlProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
}

const FormControl = ({
  label,
  type = 'text',
  placeholder = '',
  name,
  isRequired = false,
  isTextArea = false,
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
          type={type}
          name={name}
          placeholder={placeholder}
          className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
        />
      ) : (
        <textarea
          name={name}
          className="outline-none resize-y h-32 block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
        ></textarea>
      )}
    </div>
  );
};

export default FormControl;
