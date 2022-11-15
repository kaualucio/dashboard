import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineApartment } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BsPencil, BsPeople, BsCalendarEvent } from 'react-icons/bs';
import { RiArticleLine } from 'react-icons/ri';
import { VscSettingsGear } from 'react-icons/vsc';

import placeholderProfilePicture from '../../public/images/placeholder_profile_picture.jpg';

import styles from '../../styles/asideMenu.module.scss';
import { useAuth } from '../context/AuthContext';
import { useWidth } from '../hooks/useWidth';
import { roles } from '../utils/roles';

interface AsideMenuProps {
  menuIsOpen: boolean;
  handleOpenSideBarMenu: (value: boolean) => void;
}

const AsideMenu = ({ menuIsOpen, handleOpenSideBarMenu }: AsideMenuProps) => {
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  const screenWidth = useWidth();
  const { user } = useAuth();
  function handleOpenSubmenu(e: React.MouseEvent) {
    setSubmenuIsOpen((prevState) => !prevState);
    const numberOfElementInNavTree =
      e.currentTarget?.parentElement?.parentElement?.children.length;
    const currentElementClicked = e.currentTarget.parentElement?.children[1];

    for (let i = 0; i < numberOfElementInNavTree; i++) {
      const currentElementInLoop =
        e.currentTarget?.parentElement?.parentElement?.children[i].children[1];
      if (currentElementInLoop !== currentElementClicked) {
        currentElementInLoop?.classList.remove(styles.showMenu);
      }
    }
    e.currentTarget.parentElement?.children[1].classList.toggle(
      styles.showMenu
    );
  }

  useEffect(() => {
    if (screenWidth === 0 && menuIsOpen) {
      handleOpenSideBarMenu(true);
    } else if (screenWidth <= 1200 && menuIsOpen) {
      handleOpenSideBarMenu(false);
    } else if (screenWidth > 1200 && !menuIsOpen) {
      handleOpenSideBarMenu(true);
    }
  }, [screenWidth]);

  return (
    <aside
      className={`${menuIsOpen ? styles.asideMenu : styles.asideMenuClosed}`}
    >
      <div className={styles.logoContainer}>
        <h2 className={styles.logo}>LOGO</h2>
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <Image
            src={placeholderProfilePicture}
            alt=""
            height={50}
            width={50}
            objectFit="cover"
            style={{ borderRadius: 999 }}
          />
        </div>
        <div className={styles.profileDetails}>
          <h2>{user?.name}</h2>
          <p>{roles[user?.role]}</p>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a
                className={`${styles.linkAsideMenu} ${
                  !menuIsOpen && styles.linkAsideMenuClosed
                }`}
              >
                <div>
                  <AiOutlineHome size={23} />
                  <p>Home</p>
                </div>
              </a>
            </Link>
          </li>
          <li className={styles.linkContainer}>
            <button
              onClick={(e) => handleOpenSubmenu(e)}
              className={`${styles.linkAsideMenu} ${
                !menuIsOpen && styles.linkAsideMenuClosed
              }`}
            >
              <div>
                <BsPencil size={23} />
                <p>Depoimentos</p>
              </div>
              <span>
                <BiChevronDown size={23} />
              </span>
            </button>
            <ul className={`${styles.submenu}`}>
              <li className={styles.submenuTitleContainer}>
                <h3 className={styles.submenuTitle}>Depoimentos</h3>
              </li>
              <li>
                <Link href="/depoimentos">
                  <a>Listar depoimentos</a>
                </Link>
              </li>
              <li>
                <Link href="/depoimentos/ordenar">
                  <a>Ordenar depoimentos</a>
                </Link>
              </li>
              <li>
                <Link href="/depoimentos/novo">
                  <a>Adicionar depoimento</a>
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.linkContainer}>
            <button
              onClick={(e) => handleOpenSubmenu(e)}
              className={`${styles.linkAsideMenu} ${
                !menuIsOpen && styles.linkAsideMenuClosed
              }`}
            >
              <div>
                <AiOutlineApartment size={23} />
                <p>Projetos</p>
              </div>
              <span>
                <BiChevronDown size={23} />
              </span>
            </button>
            <ul className={`${styles.submenu} `}>
              <li className={styles.submenuTitleContainer}>
                <h3 className={styles.submenuTitle}>Projetos</h3>
              </li>
              <li>
                <Link href="/projetos">
                  <a>Listar projetos</a>
                </Link>
              </li>
              <li>
                <Link href="/projetos/novo">
                  <a>Adicionar projeto</a>
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.linkContainer}>
            <button
              onClick={(e) => handleOpenSubmenu(e)}
              className={`${styles.linkAsideMenu} ${
                !menuIsOpen && styles.linkAsideMenuClosed
              }`}
            >
              <div>
                <BsPeople size={23} />
                <p>Clientes</p>
              </div>
              <span>
                <BiChevronDown size={23} />
              </span>
            </button>
            <ul className={`${styles.submenu} `}>
              <li className={styles.submenuTitleContainer}>
                <h3 className={styles.submenuTitle}>Clientes</h3>
              </li>
              <li>
                <Link href="/clientes">
                  <a>Listar clientes</a>
                </Link>
              </li>
              <li>
                <Link href="/clientes/cadastrar">
                  <a>Cadastrar cliente</a>
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.linkContainer}>
            <button
              onClick={(e) => handleOpenSubmenu(e)}
              className={`${styles.linkAsideMenu} ${
                !menuIsOpen && styles.linkAsideMenuClosed
              }`}
            >
              <div>
                <RiArticleLine size={23} />
                <p>Blog</p>
              </div>
              <span>
                <BiChevronDown size={23} />
              </span>
            </button>
            <ul className={`${styles.submenu}`}>
              <li className={styles.submenuTitleContainer}>
                <h3 className={styles.submenuTitle}>Depoimentos</h3>
              </li>
              <li>
                <Link href="/blog">
                  <a>Listar artigos</a>
                </Link>
              </li>
              <li>
                <Link href="/blog/novo">
                  <a>Adicionar artigo</a>
                </Link>
              </li>
              <li>
                <Link href="/categorias">
                  <a>Listar categorias</a>
                </Link>
              </li>
              <li>
                <Link href="/categorias/novo">
                  <a>Adicionar categoria</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/calendario">
              <a
                className={`${styles.linkAsideMenu} ${
                  !menuIsOpen && styles.linkAsideMenuClosed
                }`}
              >
                <div>
                  <BsCalendarEvent size={23} />
                  <p>Calendário</p>
                </div>
              </a>
            </Link>
          </li>
          <li className={styles.linkContainer}>
            <button
              onClick={(e) => handleOpenSubmenu(e)}
              className={`${styles.linkAsideMenu} ${
                !menuIsOpen && styles.linkAsideMenuClosed
              }`}
            >
              <div>
                <VscSettingsGear size={23} />
                <p>Configurações</p>
              </div>
              <span>
                <BiChevronDown size={23} />
              </span>
            </button>
            <ul className={`${styles.submenu} `}>
              <li className={styles.submenuTitleContainer}>
                <h3 className={styles.submenuTitle}>Configurações</h3>
              </li>
              <li>
                <Link href="/configuracoes/adicionar-usuario">
                  <a>Adicionar usuário</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export { AsideMenu };
