import Link from 'next/link';
import React from 'react';

import { BsPersonCircle } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

interface DropDownMenuProfileProps {
  isOpen: boolean;
}

const DropDownMenuProfile = ({ isOpen }: DropDownMenuProfileProps) => {
  const { handleLogout } = useAuth();

  return (
    <div
      className={`z-50 absolute top-16 right-0 w-56 bg-[#fff] shadow-md rounded-lg py-5 px-3 flex flex-col gap-2 transition duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto h-auto'
          : 'opacity-0 pointer-events-none h-0'
      }`}
    >
      <Link href="/configuracoes/perfil/me">
        <a
          className={`text-text font-medium text-sm flex items-center gap-2 py-2 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <BsPersonCircle size={20} />
          <p>Meu perfil</p>
        </a>
      </Link>
      
    </div>
  );
};

export { DropDownMenuProfile };
