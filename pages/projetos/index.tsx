import Link from 'next/link';
import React, { useEffect, useState, FormEvent } from 'react';
import { Title } from '../../src/components/Title';

import { BiDetail, BiCheckDouble, BiTrash } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import axios from 'axios';
import Status from '../../src/components/Status';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  function handleToCompleteProject(e: FormEvent, id: string) {
    axios.post('/api/projects/complete', {
      id,
    });
  }

  function handleToCancelProject(e: FormEvent, id: string) {
    axios.post('/api/projects/cancel', {
      id,
    });
  }

  function handleToDeleteProject(e: FormEvent, id: string) {
    axios.post('/api/projects/delete', {
      id,
    });
  }

  useEffect(() => {
    axios.get('/api/projects/get').then((res) => {
      setProjects(res.data.data);
    });
  }, []);

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
            {projects?.map((project, index) => (
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
                  <button
                    title="Detalhes"
                    aria-label="Detalhes"
                    className="text-xl text-blue px-2 py-1"
                  >
                    <BiDetail />
                  </button>

                  {!project.completed && !project.canceled && (
                    <button
                      title="Completar projeto"
                      aria-label="Completar projeto"
                      className="text-xl text-green px-2 py-1"
                      onClick={(e) => handleToCompleteProject(e, project.id)}
                    >
                      <BiCheckDouble />
                    </button>
                  )}

                  {!project.completed && !project.canceled && (
                    <button
                      title="Cancelar projeto"
                      aria-label="Cancelar projeto"
                      className="text-xl text-red px-2 py-1"
                      onClick={(e) => handleToCancelProject(e, project.id)}
                    >
                      <FaTimes />
                    </button>
                  )}

                  <button
                    title="Deletar"
                    aria-label="Deletar"
                    className="text-xl text-red px-2 py-1"
                    onClick={(e) => handleToDeleteProject(e, project.id)}
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
