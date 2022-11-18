import React from 'react';

interface StatisticSingleProps {
  title: string;
  value: number | string;
  label: string;
  icon?: any;
}

const StatisticSingle = ({
  title,
  value,
  label,
  icon,
}: StatisticSingleProps) => {
  return (
    <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 md:px-3 shadow-sm rounded-md flex items-center justify-between">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-xl bg-primary">{icon}</div>
          <div className="flex flex-col">
            <h3 className="text-sm text-text font-medium uppercase">{title}</h3>
            <p className="text-sm text-text ">{label}</p>
          </div>
        </div>
        <p className="text-2xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

export { StatisticSingle };
