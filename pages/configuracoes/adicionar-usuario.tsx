import React from 'react';
import FormControl from '../../src/components/FormControl';
import { Title } from '../../src/components/Title';

const AddUser = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Adicionar Usuário" size="xl" />
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <FormControl label="Nome" isRequired name="name" type="text" />
          <FormControl label="Email" isRequired name="email" type="email" />
          <FormControl
            label="Login"
            placeholder="Gerado automaticamente caso não escolhido"
            name="login"
            type="text"
          />
          <FormControl
            label="Senha"
            placeholder="Gerado automaticamente caso não escolhido"
            name="password"
            type="password"
          />
          <FormControl label="Imagem" name="profile_picture" type="file" />

          <button className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue">
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddUser;
