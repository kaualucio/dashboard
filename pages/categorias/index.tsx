import Link from 'next/link';
import React, { ReactElement, useState } from 'react';

import { BiPencil, BiTrash } from 'react-icons/bi';

import moment from 'moment';
import { Header } from '../../src/components/Header';
import { useFetch } from '../../src/hooks/useFetch';
import { Loading } from '../../src/components/Loading';
import { Dialog } from '../../src/components/Dialog';
import { Layout } from '../../src/components/Layout';
import Head from 'next/head';
import { api } from '../../src/service/api/api';

const Categories = () => {
  const { data, mutate } = useFetch('/api/categories/get');
  const [deleteCategoryId, setDeleteCategoryId] = useState<null | string>(null);
  const [openDialog, setOpenDialog] = useState(false);

  function handleDeleteCategory() {
    if (deleteCategoryId) {
      api.post(`/api/categories/delete/${deleteCategoryId}`);

      const updatedCategories = data?.filter(
        (category: any) => category.id !== deleteCategoryId
      );
      mutate(updatedCategories, false);
    }
  }

  function handleOpenDialog() {
    setOpenDialog((prevState) => !prevState);
  }

  function handleOpenDialogAndSetIdToDelete(id: string) {
    handleOpenDialog();
    setDeleteCategoryId(id);
  }

  function handleConfirmDelete() {
    handleDeleteCategory();
    handleOpenDialog();
  }

  if (!data) return <Loading />;
  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Categorias</title>
      </Head>
      {openDialog ? (
        <Dialog
          handleConfirmDelete={handleConfirmDelete}
          handleOpenDialog={handleOpenDialog}
          description="Todos os artigos relacionados a essa categoria serão deletados, mesmo assim gostaria de continuar?"
        />
      ) : null}
      <Header
        titlePage="Categorias"
        link="/categorias/novo"
        label="Adicionar nova"
      />
      <div className="mt-8 bg-[#fff] rounded-md shadow-md p-5 overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Nome
              </th>
              <th scope="col" className="py-3 px-6">
                Slug
              </th>
              <th scope="col" className="py-3 px-6">
                Nº de Artigos
              </th>
              <th scope="col" className="py-3 px-6">
                Criada em
              </th>
              <th scope="col" className="py-3 px-6">
                Atualizada em
              </th>
              <th scope="col" className="py-3 px-6">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((category: any, index: number) => (
              <tr key={category.id} className="bg-white border-b border-b-text">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {(index += 1)}
                </th>
                <td className="py-4 px-6">{category.name}</td>
                <td className="py-4 px-6">{category.slug}</td>
                <td className="py-4 px-6">{category.articles.length}</td>
                <td className="py-4 px-6">
                  {moment(category.created_at).format('DD/MM/YYYY')}
                </td>
                <td className="py-4 px-6">
                  {moment(category.updated_at).format('DD/MM/YYYY')}
                </td>
                <td className="flex items-center justify-center">
                  <Link href={`/categorias/editar/${category.slug}`}>
                    <a
                      className="rounded-full block text-xl text-blue p-1 relative top-2  transition duration-300 hover:bg-[#EFEFEF]"
                      title="Editar"
                      aria-label="Editar"
                    >
                      <BiPencil />
                    </a>
                  </Link>

                  <button
                    onClick={() =>
                      handleOpenDialogAndSetIdToDelete(category.id)
                    }
                    className="rounded-full block text-xl text-red p-1 relative top-2  transition duration-300 hover:bg-[#EFEFEF]"
                    title="Excluir"
                    aria-label="Excluir"
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Categories;
