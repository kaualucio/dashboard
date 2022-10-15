import Link from 'next/link';
import React, { useState } from 'react';
import FormControl from '../../src/components/FormControl';
import TextEditor from '../../src/components/TextEditor';

import { Title } from '../../src/components/Title';

const AddNewBlogPost = () => {
  const [value, setValue] = useState('');

  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Novo post" size="xl" />
        <Link href="/blog">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <FormControl label="Título" name="title" type="text" />
          <FormControl label="Subtítulo" name="subtitle" type="text" />
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="author"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Autor
            </label>
            <select
              name="author"
              id="author"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="">Author 1</option>
              <option value="">Author 2</option>
              <option value="">Author 3</option>
              <option value="">Author 4</option>
            </select>
          </div>

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="category"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Categoria
            </label>
            <select
              name="category"
              id="category"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="">Categoria 1</option>
              <option value="">Categoria 2</option>
              <option value="">Categoria 3</option>
              <option value="">Categoria 4</option>
            </select>
          </div>
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="keywords"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Palavras Chave
            </label>
            <input
              type="text"
              name="keywords"
              id="keywords"
              placeholder="Use ponto e virgula (;) para separar as palavras-chave"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>
          <FormControl
            label="Tempo min de leitura"
            name="time_lecture"
            type="number"
          />
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="thumbnail"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Capa
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              placeholder="Use ponto e virgula (;) para separar as palavras-chave"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>
          <div className="flex items-start flex-col gap-5">
            <label
              htmlFor="content"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Conteúdo
            </label>
            <TextEditor value={value} setValue={setValue} />
          </div>
          <div className="mt-20 sm:mt-10 w-full flex items-center justify-end self-start gap-3 sm:flex-row flex-col">
            <button className="w-full sm:w-fit text-[#fff] rounded-md px-5 py-2 text-center bg-blue">
              Publicar
            </button>
            <button className="w-full sm:w-fit text-[#fff] rounded-md px-5 py-2 text-center bg-blue">
              Salvar como rascunho
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewBlogPost;
