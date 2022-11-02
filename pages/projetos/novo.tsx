import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import useSWR, { useSWRConfig } from 'swr';
import { Button } from '../../src/components/Button';
import { CheckboxContainer } from '../../src/components/CheckboxContainer';
import { FormControl } from '../../src/components/FormControl';
import { Header } from '../../src/components/Header';
import { Message } from '../../src/components/Message';
import { Select } from '../../src/components/Select';
import { Title } from '../../src/components/Title';
import { services } from '../../src/utils/type-services';

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
    client_id: '',
    description: '',
    objective: '',
    title: '',
    phone: '',
    responsible_id: '',
    budget: 0,
    type_service: [] as string[],
  });
  const [users, setUsers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSelectClient(value: string) {
    setNewProject((prevState) => ({ ...prevState, client_id: value }));
  }

  function handleSelectResponsible(value: string) {
    setNewProject((prevState) => ({ ...prevState, responsible_id: value }));
  }

  function handleSelectService(value: string) {
    const serviceIsAlreadySelected = newProject.type_service.find(
      (item) => item === value
    );
    if (serviceIsAlreadySelected) {
      setNewProject((prevState) => ({
        ...prevState,
        type_service: [
          ...prevState.type_service.filter((item) => item !== value),
        ],
      }));
    } else {
      setNewProject((prevState) => ({
        ...prevState,
        type_service: [...prevState.type_service, value],
      }));
    }
  }

  async function handleCreateProject(e: FormEvent) {
    e.preventDefault();
    if (
      !newProject.client_id ||
      !newProject.responsible_id ||
      !newProject.title ||
      !newProject.description ||
      !newProject.objective ||
      !newProject.budget ||
      !newProject.type_service
    ) {
      return toast.error(
        'Preencha os campos obrigatórios para prosseguir com o cadastro do projeto'
      );
    }

    const result = await axios.post('/api/projects/create', {
      ...newProject,
    });
    mutate('/api/projects/get', null, {
      optimisticData: result.data.project,
    });
    if (result.data.type === 'success') {
      setNewProject({
        client_id: '',
        description: '',
        objective: '',
        title: '',
        phone: '',
        responsible_id: '',
        budget: 0,
        type_service: [] as string[],
      });
    }

    if (result.data.type === 'success') {
      toast.success(result.data.response);
    } else {
      toast.error(result.data.response);
    }

    setIsDisabled(false);
  }

  useEffect(() => {
    axios.get('/api/user/get').then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/clients/get').then((res) => {
      setClients(res.data);
    });
  }, []);

  return (
    <section className="w-full p-5 h-full">
      <Header titlePage="Adicionar Projeto" link="/projetos" label="Voltar" />
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleCreateProject}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <Select
            placeHolder="Selecione o cliente"
            isRequired
            id="client"
            name="client"
            label="Cliente"
            data={clients}
            value={newProject.client_id}
            handleChangeSelectValue={handleSelectClient}
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
          <Select
            placeHolder="Selecione o responsável"
            isRequired
            id="responsible"
            name="responsible"
            label="Responsável"
            data={users}
            value={newProject.responsible_id}
            handleChangeSelectValue={handleSelectResponsible}
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

          <CheckboxContainer
            data={services}
            handleChange={handleSelectService}
            title="Tipo de serviço"
            isRequired
          />

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
          <FormControl
            value={newProject.objective}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                objective: e.target.value,
              }))
            }
            label="Objetivo"
            isRequired
            name="objective"
            type="text"
            placeholder="Escreva em apenas uma frase"
          />
          <FormControl
            value={newProject.description}
            onChange={(e) =>
              setNewProject((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            label="Descrição"
            isRequired
            isTextArea
            name="description"
            type="text"
          />
          <Button type="submit" disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

export default AddNewProject;
