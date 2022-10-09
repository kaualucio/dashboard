import React from 'react';

interface TitleProps {
  title: string;
  size: string;
}

const titleSize: any = {
  xs: 'text-[12px]',
  sm: 'text-[14px]',
  md: 'text-[18px]',
  lg: 'text-[24px]',
  xl: 'text-[30px]',
};

const Title = ({ title, size }: TitleProps) => {
  return (
    <h2 className={`${titleSize[size]} font-medium text-black`}>{title}</h2>
  );
};

export { Title };
