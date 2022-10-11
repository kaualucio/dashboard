import Link from 'next/link';
import React from 'react';
import FormControl from '../../src/components/FormControl';
import { Title } from '../../src/components/Title';

const AddNewClient = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Adicionar Cliente" size="xl" />
        <Link href="/clientes">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <FormControl label="Nome" isRequired name="name" type="text" />
          <FormControl label="Email" isRequired name="email" type="email" />
          <FormControl label="Telefone/Celular" name="phone" type="text" />
          <FormControl label="Imagem" isRequired name="image" type="file" />

          <button className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue">
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewClient;
