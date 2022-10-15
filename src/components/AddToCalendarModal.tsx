import React, { useState } from 'react';
import styles from '../../styles/custom.module.scss';

interface AddToCalendarModalProps {
  handleOpenModal: () => void;
}

const AddToCalendarModal = ({ handleOpenModal }: AddToCalendarModalProps) => {
  return (
    <div
      className={`z-50 p-5 absolute top-0 left-0 w-full h-screen flex items-center justify-center ${styles.overlay}`}
    >
      <div className="z-60 bg-[#fff] w-[500px] rounded-lg px-7 py-10">
        <div className="text-center mb-7">
          <h2 className="text-3xl font-bold text-black ">Novo evento</h2>
          <p className="text-sm text-text">
            Adicione novos eventos ao calendário
          </p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="event_title"
              className="text-md text-black font-medium"
            >
              Evento
            </label>
            <input
              type="text"
              name="event_title"
              id="event_title"
              className="outline-none block w-full mt-1 p-2 border border-text text-sm text-black rounded-md"
            />
          </div>
          <div className="flex items-center gap-3 flex-col sm:flex-row">
            <div className="w-full">
              <label
                htmlFor="date_start"
                className="text-md text-black font-medium"
              >
                Data Início <span className="text-red">*</span>
              </label>
              <input
                type="date"
                name="date_start"
                id="date_start"
                className="outline-none block w-full mt-1 p-2 border border-text text-sm text-black rounded-md"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="date_start"
                className="text-md text-black font-medium"
              >
                Data Fim
              </label>
              <input
                type="date"
                name="date_start"
                id="date_start"
                className="outline-none block w-full mt-1 p-2 border border-text text-sm text-black rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="date_start"
              className="text-md text-black font-medium"
            >
              Formatação
            </label>
            <select
              name="display"
              id="display"
              className="outline-none block w-full mt-1 p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="block" selected>
                Normal
              </option>
              <option value="list">Item de lista</option>
              <option value="list">Plano de fundo</option>
            </select>
          </div>
          <div className="flex items-center gap-3 flex-col sm:flex-row">
            <button
              onClick={handleOpenModal}
              className="order-2 sm:order-1 w-full bg-red cursor-pointer p-3 rounded-md text-[#fff] font-medium"
            >
              Cancelar
            </button>
            <button className="order-1 sm:order-2 w-full bg-blue cursor-pointer p-3 rounded-md text-[#fff] font-medium">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToCalendarModal;
