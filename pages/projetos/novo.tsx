import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState, FormEvent } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import FormControl from '../../src/components/FormControl';
import Message from '../../src/components/Message';
import { Title } from '../../src/components/Title';

const fetcher = async (url: string, method: string) => {
  const { data } = await axios({
    method,
    url,
  });

  return data;
};

const AddNewProject = () => {
  const { mutate } = useSWRConfig();
  const [newProject, setNewProject] = useState({
    hirerName: '',
    title: '',
    responsible_email: '',
    phone: '',
    responsible_id: '',
    budget: 0,
    type_service: [] as string[],
  });
  const [users, setUsers] = useState<any[]>([]);
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleCreateProject(e: FormEvent) {
    e.preventDefault();
    if (
      !newProject.hirerName ||
      !newProject.title ||
      !newProject.responsible_email ||
      !newProject.budget ||
      !newProject.type_service
    ) {
      return setResponse({
        type: 'error',
        response:
          'Preencha os campos obrigatórios para prosseguir com o cadastro do projeto',
      });
    }

    const result = await axios.post('/api/projects/create', {
      ...newProject,
    });
    mutate('/api/projects/get', null, {
      optimisticData: result.data.project,
    });
    if (result.data.type === 'success') {
      setNewProject({
        hirerName: '',
        title: '',
        responsible_email: '',
        phone: '',
        responsible_id: '',
        budget: 0,
        type_service: [] as string[],
      });
    }

    setResponse({
      type: result.data.type,
      response: result.data.response,
    });

    setIsDisabled(false);
  }

  useEffect(() => {
    axios.get('/api/user/get').then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (response.type !== 'none') {
      setTimeout(() => {
        setResponse({
          type: 'none',
          response: '',
        });
      }, 5000);
    }
  }, [response]);
  return (
    <section className="w-full p-5 h-full">
      <Message type={response.type} text={response.response} />
      <div className="flex items-center justify-between">
        <Title title="Adicionar Projeto" size="xl" />
        <Link href="/projetos">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleCreateProject}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <FormControl
            value={newProject.hirerName}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                hirerName: e.target.value,
              }))
            }
            label="Nome do contratante"
            isRequired
            name="name"
            type="text"
          />

          <FormControl
            value={newProject.title}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            label="Título do projeto"
            isRequired
            name="title"
            type="text"
          />

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="responsible"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Responsável
            </label>
            <select
              value={newProject.responsible_id}
              onChange={(e) =>
                setNewProject((prevState) => ({
                  ...prevState,
                  responsible_id: e.target.value,
                }))
              }
              name="responsible"
              id="responsible"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="" selected disabled>
                Selecione o o responsável pelo projeto
              </option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <FormControl
            value={newProject.responsible_email}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                responsible_email: e.target.value,
              }))
            }
            label="Email do contratante"
            isRequired
            name="email"
            type="email"
          />
          <FormControl
            value={newProject.phone}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
            label="Telefone/Celular"
            name="phone"
            type="text"
          />
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="type_service"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Tipo de serviço <span className="text-red">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 block w-full lg:w-[500px] p-2 gap-5">
              <div className="flex items-start gap-2">
                <input
                  onChange={(e) =>
                    setNewProject((prevState) => ({
                      ...prevState,
                      type_service: [...prevState.type_service, e.target.value],
                    }))
                  }
                  type="checkbox"
                  value="website-personalizado"
                  id="website-personalizado"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="website-personalizado">
                  Website personalizado
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  onChange={(e) =>
                    setNewProject((prevState) => ({
                      ...prevState,
                      type_service: [...prevState.type_service, e.target.value],
                    }))
                  }
                  type="checkbox"
                  value="website-pronto"
                  id="website-pronto"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="website-pronto">Website pronto</label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  onChange={(e) =>
                    setNewProject((prevState) => ({
                      ...prevState,
                      type_service: [...prevState.type_service, e.target.value],
                    }))
                  }
                  type="checkbox"
                  value="design-branding"
                  id="design-branding"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="design-branding">Design Branding</label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  onChange={(e) =>
                    setNewProject((prevState) => ({
                      ...prevState,
                      type_service: [...prevState.type_service, e.target.value],
                    }))
                  }
                  type="checkbox"
                  value="gestao-de-trafego"
                  id="gestao-de-trafego"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="gestao-de-trafego">Gestão de Tráfego</label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  onChange={(e) =>
                    setNewProject((prevState) => ({
                      ...prevState,
                      type_service: [...prevState.type_service, e.target.value],
                    }))
                  }
                  type="checkbox"
                  value="ads"
                  id="ads"
                  className="w-5 h-5 border border-text rounded-md"
                />
                <label htmlFor="ads">Criação de campanhas de ADS</label>
              </div>
            </div>
          </div>
          <FormControl
            value={newProject.budget}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                budget: Number(e.target.value),
              }))
            }
            label="Orçamento"
            isRequired
            name="budget"
            type="text"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue"
          >
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewProject;
