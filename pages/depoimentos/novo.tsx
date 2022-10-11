import Link from 'next/link';
import React from 'react';
import FormControl from '../../src/components/FormControl';
import { Title } from '../../src/components/Title';

const AddTestimonial = () => {
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
          <FormControl
            label="Nome do contratante"
            isRequired
            name="name"
            type="text"
          />

          <FormControl
            label="E-mail do contratante"
            isRequired
            name="email"
            type="email"
          />

          <FormControl label="Telefone/Celular" name="phone" type="phone" />

          <FormControl label="Depoimento" name="testimonial" isTextArea />
          <button className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue">
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTestimonial;