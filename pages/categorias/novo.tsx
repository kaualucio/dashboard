import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Header } from '../../src/components/Header';

const AddNewCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleCreateNewCategory(e: FormEvent) {
    try {
      e.preventDefault();
      setIsDisabled(true);
      if (!newCategory) {
        return toast.error('Preencha os campos obrigatórios para continuar');
      }

      const result: any = await axios.post('/api/categories/create', {
        category: newCategory,
      });
      setNewCategory('');
      if (result.data.type === 'success') {
        toast.success(result.data.response);
      } else {
        toast.error(result.data.response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <section className="w-full p-5 h-full">
      <Header
        titlePage="Adicionar Categoria"
        link="/categorias"
        label="Voltar"
      />
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
          <Button disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

export default AddNewCategory;
