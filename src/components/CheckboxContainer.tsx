import React from 'react';
import { Checkbox } from './Checkbox';

interface CheckboxContainerProps {
  title: string;
  data: any;
  isRequired?: boolean;
  handleChange: (value: string) => void;
}

const CheckboxContainer = ({
  title,
  data,
  isRequired = false,
  handleChange,
}: CheckboxContainerProps) => {
  return (
    <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
      <label
        htmlFor="type_service"
        className="text-md text-text font-medium mb-3 lg:mb-0"
      >
        {title} {isRequired && <span className="text-red">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 block w-full lg:w-[500px] p-2 gap-5">
        {data.map((item: any) => (
          <Checkbox
            key={item.id}
            label={item.label}
            value={item.value}
            handleOnChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export { CheckboxContainer };
