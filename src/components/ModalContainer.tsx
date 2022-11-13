import React, { PropsWithChildren } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from '../../styles/custom.module.scss';

interface ModalContainer extends PropsWithChildren {
  title: string;
  description?: string;
  handleOpenModal: () => void;
}

const ModalContainer = ({
  title,
  description,
  handleOpenModal,
  children,
}: ModalContainer) => {
  return (
    <div
      className={`z-50 p-5 absolute top-0 left-0 w-full h-screen flex items-center justify-center ${styles.overlay}`}
    >
      <div className="z-60 bg-[#fff] w-[500px] rounded-lg p-7">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-black font-bold">{title}</h2>
              <button
                className="cursor-pointer text-red text-2xl"
                onClick={handleOpenModal}
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-center text-sm text-text my-4">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export { ModalContainer };
