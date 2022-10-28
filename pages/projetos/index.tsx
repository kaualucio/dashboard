import Link from 'next/link';
import React, {
  useEffect,
  useState,
  FormEvent,
  useMemo,
  useCallback,
} from 'react';
import { Title } from '../../src/components/Title';

import { BiDetail, BiCheckDouble, BiTrash } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import axios from 'axios';
import Status from '../../src/components/Status';
import useSWR, { useSWRConfig } from 'swr';
import Loading from '../../src/components/Loading';

const fetcher = async (url: string, method: string) => {
  const { data } = await axios({
    method,
    url,
  });

  return data;
};

const updateProject = async (url: string, method: string) => {
  const { data } = await axios({
    method,
    url,
  });

  return data;
};

const Projects = () => {
  const { mutate: mutateGlobal } = useSWRConfig();
  const { data, error, mutate } = useSWR('/api/projects/get', (url: string) =>
    fetcher(url, 'GET')
  );
  const handleToCompleteProject = useCallback(
    (id: string) => {
      updateProject(`/api/projects/complete/${id}`, 'POST');

      const updatedProjects = data?.map((project: any) => {
        if (project.id === id) {
          return { ...project, status: 'Completo', completed: true };
        }

        return project;
      });
      mutate(updatedProjects, false);
      mutateGlobal(`/api/projects/getById/${id}`, null, { revalidate: true });
    },
    [data, mutate, mutateGlobal]
  );

  const handleToCancelProject = useCallback(
    (id: string) => {
      updateProject(`/api/projects/cancel/${id}`, 'POST');

      const updatedProjects = data?.map((project: any) => {
        if (project.id === id) {
          return { ...project, status: 'Cancelado', canceled: true };
        }

        return project;
      });
      mutate(updatedProjects, false);
      mutateGlobal(`/api/projects/getById/${id}`, null, { revalidate: true });
    },
    [data, mutate, mutateGlobal]
  );

  const handleToDeleteProject = useCallback(
    (id: string) => {
      updateProject(`/api/projects/delete/${id}`, 'POST');

      const updatedProjects = data?.filter((project: any) => project.id !== id);
      mutate(updatedProjects, false);
      mutateGlobal(`/api/projects/getById/${id}`, null, { revalidate: true });
    },
    [data, mutate, mutateGlobal]
  );

  if (!data) return <Loading />;
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
            {data.map((project: any, index: any) => (
              <tr
                key={project.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {(index += 1)}
                </th>
                <td className="py-4 px-6">{project.title}</td>
                <td className="py-4 px-6">{project.responsible.name}</td>
                <td className="py-4 px-6">R${project.budget},00</td>
                <td className="py-4 px-6">
                  <Status status={project.status} />
                </td>
                <td className="flex items-center justify-center">
                  <Link href={`/projetos/projeto/${project.id}`}>
                    <a
                      title="Detalhes"
                      aria-label="Detalhes"
                      className="inline-block rounded-full text-xl text-blue p-1 transition durantion-300 hover:bg-[#EFEFEF]"
                    >
                      <BiDetail />
                    </a>
                  </Link>

                  {!project.completed && !project.canceled && (
                    <button
                      title="Completar projeto"
                      aria-label="Completar projeto"
                      className="rounded-full text-xl text-green p-1 transition durantion-300 hover:bg-[#EFEFEF] "
                      onClick={(e) => handleToCompleteProject(project.id)}
                    >
                      <BiCheckDouble />
                    </button>
                  )}

                  {!project.completed && !project.canceled && (
                    <button
                      title="Cancelar projeto"
                      aria-label="Cancelar projeto"
                      className="rounded-full text-xl text-red p-1 transition durantion-300 hover:bg-[#EFEFEF] "
                      onClick={() => handleToCancelProject(project.id)}
                    >
                      <FaTimes />
                    </button>
                  )}

                  <button
                    title="Deletar"
                    aria-label="Deletar"
                    className="rounded-full text-xl text-red p-1 transition durantion-300 hover:bg-[#EFEFEF] "
                    onClick={() => handleToDeleteProject(project.id)}
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

export default Projects;
