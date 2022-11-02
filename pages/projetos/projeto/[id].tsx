import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { Header } from '../../../src/components/Header';
import { Loading } from '../../../src/components/Loading';
import { Title } from '../../../src/components/Title';
import { phoneMask } from '../../../src/utils/phone-mask';
import { roles } from '../../../src/utils/roles';
import { typeServices } from '../../../src/utils/type-services';

const fetcher = async (url: string, method: string) => {
  const { data } = await axios({
    method,
    url,
  });

  return data;
};

const Projeto = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    `/api/projects/getById/${router.query.id}`,
    (url: string) => fetcher(url, 'GET')
  );

  if (!data) return <Loading />;
  return (
    <section className="w-full p-5 h-full">
      <Header titlePage="Projeto" link="/projetos" label="Voltar" />
      <div className="max-w-[800px] mx-auto mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <h2 className="block w-[270px] text-lg font-bold text-black">
              Informações Gerais
            </h2>
            <span className="inline-block w-full h-px bg-black"></span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Título:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">
              Contratante:
            </h3>
            <p className="w-full text-md font-medium text-black">
              {data?.client?.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">
              Objetivo:
            </h3>
            <p className="w-full text-md font-medium text-black">
              {data?.objective}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">
              Descrição:
            </h3>
            <p className="w-full text-md font-medium text-black">
              {data?.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <h2 className="block w-[280px] text-lg font-bold text-black">
              Contato Contratante
            </h2>
            <span className="inline-block w-full h-px bg-black"></span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Email:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.client?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">
              Telefone:
            </h3>
            <p className="w-full text-md font-medium text-black">
              {data?.phone ? phoneMask(data?.phone) : 'Nenhum'}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <h2 className="block w-[160px] text-lg font-bold text-black">
              Responsável
            </h2>
            <span className="inline-block w-full h-px bg-black"></span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Nome:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.responsible?.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Cargo:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.responsible?.role}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Email:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.responsible?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <h2 className="block w-[230px] text-lg font-bold text-black">
              Sobre o serviço
            </h2>
            <span className="inline-block w-full h-px bg-black"></span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Tipo:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.type_service?.map(
                (service: string, index: number) =>
                  `${typeServices[service]}${
                    index !== data?.type_service.length - 1 ? ', ' : ''
                  }`
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">
              Orçamento:
            </h3>
            <p className="w-full text-md font-medium text-black">
              {data?.budget?.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="w-[170px] text-md font-medium text-text">Status:</h3>
            <p className="w-full text-md font-medium text-black">
              {data?.status}
            </p>
          </div>
          {data?.completed || data?.canceled ? (
            <div className="flex items-center gap-2">
              <h3 className="w-[170px] text-md font-medium text-text">
                {data?.completed
                  ? 'Terminado em:'
                  : data?.canceled
                  ? 'Cancelado em'
                  : ''}
              </h3>
              <p className="w-full text-md font-medium text-black">
                {data?.completed
                  ? moment(data?.completed_at).format('DD/MM/YYYY')
                  : data?.canceled
                  ? moment(data?.canceled_at).format('DD/MM/YYYY')
                  : ''}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Projeto;
