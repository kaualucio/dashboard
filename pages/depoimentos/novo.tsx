import Link from 'next/link';
import React from 'react';
import { Title } from '../../src/components/Title';

const Novo = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Adicionar Depoimento" size="xl" />
        <Link href="/depoimentos">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-8 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="name"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Nome do contratante <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="email"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="phone"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Telefone/Celular
            </label>
            <input
              type="text"
              name="phone"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>

          <div className="flex items-start justify-between flex-col lg:flex-row">
            <label
              htmlFor="testimonial"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Depoimento <span className="text-red">*</span>
            </label>
            <textarea
              name="testimonial"
              className="outline-none resize-y h-32 block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            ></textarea>
          </div>
          <button className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue">
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Novo;
