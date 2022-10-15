import Link from 'next/link';
import React from 'react';
import FormControl from '../../../../src/components/FormControl';
import { Title } from '../../../../src/components/Title';

const Editar = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Adicionar Usuário" size="xl" />
        <Link href="/configuracoes/perfil/me">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <FormControl
            label="Sobre mim"
            name="about_me"
            isTextArea
            type="text"
          />
          <FormControl label="Nome" name="name" type="text" />
          <FormControl label="Email" isRequired name="email" type="email" />
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="author"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Sexo
            </label>
            <select
              name="author"
              id="author"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="">Masculino</option>
              <option value="">Feminino</option>
              <option value="">Outro</option>
            </select>
          </div>
          <FormControl label="Contato" name="contact" type="text" />
          <FormControl label="Idade" name="age" type="number" />
          <FormControl
            label="Site pessoal"
            name="personal_website"
            type="text"
          />
          <FormControl label="Instagram" name="instagram_profile" type="text" />
          <FormControl label="Twitter" name="twitter_profile" type="text" />
          <FormControl label="Linkedin" name="linkedin_profile" type="text" />
          <FormControl label="Facebook" name="facebook_profile" type="text" />

          <button className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue">
            Salvar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Editar;
