import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import FormControl from '../../src/components/FormControl';
import Message from '../../src/components/Message';
import { Title } from '../../src/components/Title';

const AddNewCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleCreateNewCategory(e: FormEvent) {
    try {
      e.preventDefault();
      setIsDisabled(true);
      if (!newCategory) {
        return setResponse({
          type: 'error',
          response: 'Preencha os campos obrigatórios para continuar',
        });
      }

      const res: any = await axios.post('/api/categories/create', {
        category: newCategory,
      });
      setNewCategory('');
      setResponse({
        type: res.data.type,
        response: res.data.response,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    if (response.type !== 'none') {
      setTimeout(() => {
        setResponse({
          type: 'none',
          response: '',
        });
      }, 5000);
    }
  }, [response]);

  return (
    <section className="w-full p-5 h-full">
      <Message type={response.type} text={response.response} />
      <div className="flex items-center justify-between">
        <Title title="Adicionar Categoria" size="xl" />
        <Link href="/categorias">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleCreateNewCategory}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <FormControl
            label="Nome da categoria"
            isRequired
            name="name"
            type="text"
            onChange={(e) => setNewCategory(e.target.value)}
            value={newCategory}
          />
          <button
            disabled={isDisabled}
            type="submit"
            className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue"
          >
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewCategory;
