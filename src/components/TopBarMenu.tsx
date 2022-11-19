import React from 'react';

import { FaBars } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { AiFillLayout } from 'react-icons/ai';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

import { useAuth } from '../context/AuthContext';

interface TopBarMenuProps {
  menuIsOpen: boolean;
  handleOpenSideBarMenu: (value: boolean) => void;
}

const TopBarMenu = ({ menuIsOpen, handleOpenSideBarMenu }: TopBarMenuProps) => {
  const { handleLogout } = useAuth();

  function handleChangeLayout() {}
  function handleChangeTheme() {}

  return (
    <div className="w-full h-16 flex items-center justify-between px-5 shadow-md ">
      <button onClick={() => handleOpenSideBarMenu(menuIsOpen ? false : true)}>
        <FaBars size={25} />
      </button>
      <div className="relative flex items-center gap-3">
        <button
          onClick={handleChangeLayout}
          className={`text-text font-medium text-sm flex items-center gap-1 p-2 rounded-full transition-all duration-300 hover:bg-[#E0E0E0] hover:text-primary`}
        >
          <AiFillLayout size={20} />
        </button>
        <button
          onClick={handleChangeTheme}
          className={`text-text font-medium text-sm flex items-center gap-1 p-2 rounded-full transition-all duration-300 hover:bg-[#E0E0E0] hover:text-primary`}
        >
          <BsSunFill size={20} />
        </button>
          <button
          onClick={handleLogout}
          className={`text-text font-medium text-sm flex items-center gap-1 py-2 transition-all duration-300 hover:text-primary`}
        >
          <MdOutlineLogout size={20} />
          <p>Sair</p>
        </button>
      </div>
    </div>
  );
};

export { TopBarMenu };
