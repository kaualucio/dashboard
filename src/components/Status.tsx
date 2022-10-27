import React from 'react';

interface StatusProps {
  status: string;
}

const Status = ({ status }: StatusProps) => {
  return (
    <span
      className={`inline-block px-3 py-1 ${
        status === 'Em andamento'
          ? 'bg-blue'
          : status === 'Completo'
          ? 'bg-green'
          : 'bg-red'
      } rounded-full text-[#fff]`}
    >
      {status}
    </span>
  );
};

export default Status;
