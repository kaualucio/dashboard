import Link from 'next/link';
import React from 'react';
import { Title } from './Title';

interface HeaderProps {
  titlePage: string;
  link: string;
  label: string;
}

const Header = ({ titlePage, link, label }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Title title={titlePage} size="xl" />
      <Link href={link}>
        <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
          {label}
        </a>
      </Link>
    </div>
  );
};

export { Header };
