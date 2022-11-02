import React, { useState } from 'react';
import styles from '../../styles/custom.module.scss';
import { BiErrorCircle } from 'react-icons/bi';
interface DialogProps {
  handleConfirmDelete: () => void;
  handleOpenDialog: () => void;
  description: string;
}

const Dialog = ({
  handleConfirmDelete,
  handleOpenDialog,
  description,
}: DialogProps) => {
  return (
    <div
      className={`z-50 p-5 absolute top-0 left-0 w-full h-screen flex items-center justify-center ${styles.overlay}`}
    >
      <div className="z-60 bg-[#fff] w-[500px] rounded-lg p-7">
        <div className="flex items-center justify-center flex-col gap-4">
          <BiErrorCircle size={80} color="#F56E6E" />
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-black mb-4 ">
              Você tem certeza?
            </h2>
            <p className="text-sm text-text">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-col sm:flex-row">
          <button
            onClick={handleOpenDialog}
            className="order-2 sm:order-1 w-full bg-gray cursor-pointer p-2 rounded-md text-[#fff] font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            className="order-1 sm:order-2 w-full bg-red cursor-pointer p-2 rounded-md text-[#fff] font-medium"
          >
            Sim, tenho certeza
          </button>
        </div>
      </div>
    </div>
  );
};

export { Dialog };
