import React from 'react';

interface SelectProps {
  name: string;
  id: string;
  label: string;
  data: any;
  value: string;
  placeHolder: string;
  isRequired?: boolean;
  handleChangeSelectValue: (value: string) => void;
}

const Select = ({
  name,
  id,
  label,
  data,
  value,
  isRequired = false,
  handleChangeSelectValue,
  placeHolder,
}: SelectProps) => {
  return (
    <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
      <label
        htmlFor={id}
        className="text-md text-text font-medium mb-3 lg:mb-0"
      >
        {label} {isRequired && <span className="text-red">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => handleChangeSelectValue(e.target.value)}
        name={name}
        id={id}
        className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
      >
        <option value="" selected disabled>
          {placeHolder}
        </option>
        {data?.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Select };
