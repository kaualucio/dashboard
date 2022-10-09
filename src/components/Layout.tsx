import React, { ReactNode, useState } from 'react';
import { AsideMenu } from './AsideMenu';

import styles from '../../styles/layout.module.scss';
import { TopBarMenu } from './TopBarMenu';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  function handleOpenSideBarMenu(value: boolean) {
    setMenuIsOpen(value);
  }

  return (
    <main className={`${styles.mainContainer}`}>
      <AsideMenu
        menuIsOpen={menuIsOpen}
        handleOpenSideBarMenu={handleOpenSideBarMenu}
      />
      <section className={`${styles.main} h-full overflow-y-scroll`}>
        <TopBarMenu
          menuIsOpen={menuIsOpen}
          handleOpenSideBarMenu={handleOpenSideBarMenu}
        />
        <div className="px-5 py-8">{children}</div>
      </section>
    </main>
  );
};

export { Layout };
