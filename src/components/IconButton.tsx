import Link from 'next/link';
import React from 'react';

interface IconButtonProps {
  icon: JSX.Element;
  href: string;
}

const IconButton = ({ icon, href }: IconButtonProps) => {
  return (
    <Link href={href}>
      <a className="inline-block flex items-center justify-center w-10 h-10 rounded-full bg-black transition duration-300 hover:bg-blue hover:scale-110 text-xl text-[#fff]">
        {icon}
      </a>
    </Link>
  );
};

export { IconButton };
