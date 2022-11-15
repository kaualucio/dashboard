import React, { useEffect, useState, ReactElement } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { Header } from '../../src/components/Header';
import { useFetch } from '../../src/hooks/useFetch';
import { Loading } from '../../src/components/Loading';
import { Layout } from '../../src/components/Layout';
import Head from 'next/head';
import { api } from '../../src/service/api/api';

const SortTestimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const { data, mutate } = useFetch('/api/testimonials/getByOrderDate');
  async function handleOrderTestimonial(id: string) {
    api.post('/api/testimonials/order', {
      id,
    });
  }

  useEffect(() => {
    if (data) {
      setTestimonials(data);
    }
  }, [data]);

  if (!data) return <Loading />;

  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Ordenar Depoimentos</title>
      </Head>
      <Header
        titlePage="Ordenar Depoimentos"
        link="/depoimentos"
        label="Voltar"
      />
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
          <ReactSortable
            tag="tbody"
            list={testimonials}
            setList={setTestimonials}
          >
            {testimonials.map((item: any, index) => (
              <tr
                onDragEnd={() => handleOrderTestimonial(item.id)}
                key={item.id}
                className="bg-white cursor-grab border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {(index += 1)}
                </th>
                <td className="py-4 px-6">{item.hirerCompany}</td>
                <td className="py-4 px-6">{item.testimonial}</td>
              </tr>
            ))}
          </ReactSortable>
        </table>
      </div>
    </section>
  );
};

SortTestimonials.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SortTestimonials;
