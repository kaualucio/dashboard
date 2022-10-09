import Link from 'next/link';
import React from 'react';
import { Title } from '../../src/components/Title';

import { BiDetail, BiCheckDouble, BiTrash } from 'react-icons/bi';

const Projetos = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Projetos" size="xl" />
        <Link href="/projetos/novo">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Adicionar novo
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
                Responsável
              </th>
              <th scope="col" className="py-3 px-6">
                Valor (R$)
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="py-4 px-6">Desenvolver Landing Page</td>
              <td className="py-4 px-6">Kauã Lúcio</td>
              <td className="py-4 px-6">1500,00</td>
              <td className="py-4 px-6">
                <span className="inline-block px-3 py-1 bg-blue rounded-full text-[#fff]">
                  Em andamento
                </span>
              </td>
              <td className="flex items-center justify-center">
                <button className="text-xl text-blue px-2 py-1">
                  <BiDetail />
                </button>

                <button className="text-xl text-green px-2 py-1">
                  <BiCheckDouble />
                </button>

                <button className="text-xl text-red px-2 py-1">
                  <BiTrash />
                </button>
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </th>
              <td className="py-4 px-6">Criação de Branding</td>
              <td className="py-4 px-6">Caio Pessoa</td>
              <td className="py-4 px-6">5000,00</td>
              <td className="py-4 px-6">
                <span className="inline-block px-3 py-1 bg-red rounded-full text-[#fff]">
                  Cancelado
                </span>
              </td>
              <td className="flex items-center justify-center">
                <button className="text-xl text-blue px-2 py-1">
                  <BiDetail />
                </button>

                <button className="text-xl text-red px-2 py-1">
                  <BiTrash />
                </button>
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                3
              </th>
              <td className="py-4 px-6">Gestão de Tráfego</td>
              <td className="py-4 px-6">Arthur</td>
              <td className="py-4 px-6">15000,00</td>
              <td className="py-4 px-6">
                <span className="inline-block px-3 py-1 bg-green rounded-full text-[#fff]">
                  Encerrado
                </span>
              </td>
              <td className="flex items-center justify-center">
                <button className="text-xl text-blue px-2 py-1">
                  <BiDetail />
                </button>

                <button className="text-xl text-red px-2 py-1">
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

export default Projetos;
