import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState, ReactElement } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Button } from '../../../src/components/Button';
import { FormControl } from '../../../src/components/FormControl';
import { Header } from '../../../src/components/Header';
import { Layout } from '../../../src/components/Layout';
import { Loading } from '../../../src/components/Loading';
import { SITE_NAME } from '../../../src/constants';
import { useFetch } from '../../../src/hooks/useFetch';

const EditCategory = () => {
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();
  const [newCategory, setNewCategory] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const { data } = useFetch(`/api/categories/getBySlug/${router.query.slug}`);
  async function handleEditCategory(e: FormEvent) {
    try {
      e.preventDefault();
      setIsDisabled(true);
      if (!newCategory) {
        return toast.error('Preencha os campos obrigatórios para continuar');
      }

      const result: any = await api.post(`/api/categories/edit/${data.id}`, {
        category: newCategory,
      });

      if (result.data.type === 'success') {
        globalMutate('/api/categories/get', null, { revalidate: true });
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

  useEffect(() => {
    if (data) {
      setNewCategory(data.name);
    }
  }, [data]);

  if (!data) return <Loading />;
  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Editar Categoria</title>
      </Head>
      <Header
        titlePage={`Editar Categoria: ${data.name}`}
        link="/categorias"
        label="Voltar"
      />
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleEditCategory}
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
          <Button type="submit" disabled={isDisabled} label="Editar" />
        </form>
      </div>
    </section>
  );
};

EditCategory.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditCategory;
