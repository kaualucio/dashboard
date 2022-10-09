import Link from 'next/link';
import React from 'react';
import { Title } from '../../src/components/Title';

const Novo = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Adicionar Projeto" size="xl" />
        <Link href="/projetos">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
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
              htmlFor="title"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Título do projeto <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="manager"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Nome do responsável <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="manager"
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

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="type_service"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Tipo de serviço <span className="text-red">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 block w-full lg:w-[500px] p-2 gap-5">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="website-personalizado"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <span>Website personalizado</span>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="website-pronto"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <span>Website pronto</span>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="design-branding"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <span>Design Branding</span>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="gestao-de-trafego"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <span>Gestão de Tráfego</span>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="ads"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <span>Criação de campanhas de ADS</span>
              </div>
            </div>
          </div>

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="budget"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Orçamento <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="budget"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
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
