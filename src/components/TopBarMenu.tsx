import React from 'react';

import { FaBars } from 'react-icons/fa';

interface TopBarMenuProps {
  menuIsOpen: boolean;
  handleOpenSideBarMenu: (value: boolean) => void;
}

const TopBarMenu = ({ menuIsOpen, handleOpenSideBarMenu }: TopBarMenuProps) => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-5 shadow-md ">
      <button onClick={() => handleOpenSideBarMenu(menuIsOpen ? false : true)}>
        <FaBars size={25} />
      </button>
    </div>
  );
};

export { TopBarMenu };
