import Head from 'next/head';
import Link from 'next/link';

import React, { useCallback, useState, ReactElement } from 'react';

import { BiDetail, BiTrash } from 'react-icons/bi';
import { Header } from '../../src/components/Header';
import { useFetch } from '../../src/hooks/useFetch';
import { Loading } from '../../src/components/Loading';
import { Dialog } from '../../src/components/Dialog';
import { Layout } from '../../src/components/Layout';
import { api } from '../../src/service/api/api';


const Clients = () => {
  const { data, mutate } = useFetch('/api/clients/get');
  const [deleteClientId, setDeleteClientId] = useState<null | string>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClient = useCallback(() => {
    if (deleteClientId) {
      api.post(`/api/clients/delete/${deleteClientId}`);

      const updatedClients = data?.filter(
        (project: any) => project.id !== deleteClientId
      );
      mutate(updatedClients, false);
    }
  }, [data, mutate, deleteClientId]);

  function handleOpenDialog() {
    setOpenDialog((prevState) => !prevState);
  }

  function handleOpenDialogAndSetIdToDelete(id: string) {
    handleOpenDialog();
    setDeleteClientId(id);
  }

  function handleConfirmDelete() {
    handleDeleteClient();
    handleOpenDialog();
  }

  if (!data) return <Loading />;
  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Clientes</title>
      </Head>
      {openDialog ? (
        <Dialog
          handleConfirmDelete={handleConfirmDelete}
          handleOpenDialog={handleOpenDialog}
          description="Todos os dados relacionados a esse cliente serão deletados, mesmo assim gostaria de continuar?"
        />
      ) : null}
      <Header
        titlePage="Nossos Clientes"
        link="/clientes/cadastrar"
        label="Adicionar novo"
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
                E-mail
              </th>
              <th scope="col" className="py-3 px-6">
                Projetos Totais
              </th>
              <th scope="col" className="py-3 px-6">
                Projetos em andamento
              </th>
              <th scope="col" className="py-3 px-6">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((client: any, index: number) => (
              <tr
                key={client.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {(index += 1)}
                </th>
                <td className="py-4 px-6">{client.name}</td>
                <td className="py-4 px-6">{client.email}</td>
                <td className="py-4 px-6">{client.Project.length}</td>
                <td className="py-4 px-6">
                  {
                    client.Project?.filter(
                      (item: any) => item.status === 'Em andamento'
                    ).length
                  }
                </td>
                <td className="py-4 px-6">
                  <div className="w-full h-full flex justify-center">
                    <Link href={`/clientes/cliente/${client.id}`}>
                      <a className="	 text-xl text-blue px-1">
                        <BiDetail />
                      </a>
                    </Link>
                    <button
                      onClick={() =>
                        handleOpenDialogAndSetIdToDelete(client.id)
                      }
                      className="text-xl text-red px-1"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Clients.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Clients;
