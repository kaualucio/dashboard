import React, { PropsWithChildren } from 'react';

interface GridContainerProps extends PropsWithChildren {
  gridClass: string;
}

const GridContainer = ({ gridClass, children }: GridContainerProps) => {
  return (
    <div className={`${gridClass} rounded-md shadow-sm bg-[#fff] p-3`}>
      {children}
    </div>
  );
};

export default GridContainer;
