import Link from 'next/link';
import React from 'react';
import { Title } from '../../src/components/Title';

import { BiPencil, BiTrash } from 'react-icons/bi';

const Categorys = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Categorias" size="xl" />
        <Link href="/categorias/novo">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Adicionar nova
          </a>
        </Link>
      </div>
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
            <tr className="bg-white border-b border-b-text">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="py-4 px-6">Programação</td>
              <td className="py-4 px-6">programacao</td>
              <td className="py-4 px-6">10</td>
              <td className="py-4 px-6">10/10/22</td>
              <td className="py-4 px-6">15/10/22</td>
              <td className="flex items-center justify-center">
                <button
                  className="text-xl text-blue px-2 py-1"
                  title="Editar"
                  aria-label="Editar"
                >
                  <BiPencil />
                </button>

                <button
                  className="text-xl text-red px-2 py-1"
                  title="Excluir"
                  aria-label="Excluir"
                >
                  <BiTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Categorys;
