import React from 'react';

interface CheckboxProps {
  label: string;
  value: string;
  handleOnChange: (value: string) => void;
}

const Checkbox = ({ label, value, handleOnChange }: CheckboxProps) => {
  return (
    <div className="flex items-start gap-2">
      <input
        onChange={(e) => handleOnChange(e.target.value)}
        type="checkbox"
        value={value}
        id={value}
        className="w-5 h-5 border border-text rounded-md"
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export { Checkbox };
