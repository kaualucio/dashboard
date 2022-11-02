import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Title } from '../../src/components/Title';

import { BiPencil, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import moment from 'moment';
import { Header } from '../../src/components/Header';

interface Categories {
  id: string;
  name: string;
  slug: string;
  articles: any[];
  created_at: any;
  updated_at: any;
}

const Categories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    axios
      .get('/api/categories/get')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="w-full p-5 h-full">
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
            {categories?.map((category, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Categories;
