import Image from 'next/image';
import React, { useState } from 'react';

import { FaBars } from 'react-icons/fa';
import { DropDownMenuProfile } from './DropDownMenuProfile';

import placeholderProfilePicture from '../../public/images/placeholder_profile_picture.jpg';
import { useSession } from 'next-auth/react';

interface TopBarMenuProps {
  menuIsOpen: boolean;
  handleOpenSideBarMenu: (value: boolean) => void;
}

const TopBarMenu = ({ menuIsOpen, handleOpenSideBarMenu }: TopBarMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  function handleOpenDropDownProfileMenu() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <div className="w-full h-16 flex items-center justify-between px-5 shadow-md ">
      <button onClick={() => handleOpenSideBarMenu(menuIsOpen ? false : true)}>
        <FaBars size={25} />
      </button>
      <div className="relative">
        <button
          onClick={handleOpenDropDownProfileMenu}
          className="w-10 h-10 rounded-full border-2 border-[#fff] shadow-md"
        >
          <Image
            src={
              session && session.user?.image.length > 0
                ? session.user?.image
                : placeholderProfilePicture
            }
            alt=""
            height={40}
            width={40}
            objectFit="cover"
            style={{ borderRadius: 999 }}
          />
        </button>
        <DropDownMenuProfile isOpen={isOpen} />
      </div>
    </div>
  );
};

export { TopBarMenu };
