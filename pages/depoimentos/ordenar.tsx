import Link from 'next/link';
import React, { useState } from 'react';
import { Title } from '../../src/components/Title';
import { ReactSortable } from 'react-sortablejs';

import { BiDetail, BiCheckDouble, BiTrash } from 'react-icons/bi';
const arr = [0, 1, 2];
const SortTestimonials = () => {
  const [list, setList] = useState<any>([
    {
      id: 1,
      company: 'Teste 1',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit aperiam magni soluta sapiente repudiandae...',
    },
    {
      id: 2,
      company: 'Teste 2',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit aperiam magni soluta sapiente repudiandae...',
    },
    {
      id: 3,
      company: 'Teste 3',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit aperiam magni soluta sapiente repudiandae...',
    },
  ]);
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Ordenar Depoimentos" size="xl" />
      </div>
      <div className="mt-8 bg-[#fff] rounded-md shadow-md p-5 overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Empresa/pessoa
              </th>
              <th scope="col" className="py-3 px-6">
                Depoimento
              </th>
            </tr>
          </thead>
          <ReactSortable tag="tbody" list={list} setList={setList}>
            {list.map((item: any) => (
              <tr
                key={item.id}
                className="bg-white cursor-grab border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="py-4 px-6">{item.company}</td>
                <td className="py-4 px-6">{item.testimonial}</td>
              </tr>
            ))}
          </ReactSortable>
        </table>
      </div>
    </section>
  );
};

export default SortTestimonials;
