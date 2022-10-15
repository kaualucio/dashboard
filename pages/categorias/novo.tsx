import Link from 'next/link';
import React from 'react';
import FormControl from '../../src/components/FormControl';
import { Title } from '../../src/components/Title';

const AddNewProject = () => {
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
          <FormControl
            label="Nome do contratante"
            isRequired
            name="name"
            type="text"
          />

          <FormControl
            label="Título do projeto"
            isRequired
            name="title"
            type="text"
          />

          <FormControl
            label="Nome do responsável "
            isRequired
            name="manager"
            type="text"
          />
          <FormControl label="Email" isRequired name="email" type="email" />
          <FormControl label="Telefone/Celular" name="phone" type="text" />
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
                  id="website-personalizado"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="website-personalizado">
                  Website personalizado
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="website-pronto"
                  id="website-pronto"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="website-pronto">Website pronto</label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="design-branding"
                  id="design-branding"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="design-branding">Design Branding</label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="gestao-de-trafego"
                  id="gestao-de-trafego"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="gestao-de-trafego">Gestão de Tráfego</label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value="ads"
                  id="ads"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="ads">Criação de campanhas de ADS</label>
              </div>
            </div>
          </div>
          <FormControl label="Orçamento" isRequired name="budget" type="text" />
          <button className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue">
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewProject;
