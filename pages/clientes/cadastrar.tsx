import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import FormControl from '../../src/components/FormControl';
import Message from '../../src/components/Message';
import { Title } from '../../src/components/Title';

const AddNewClient = () => {
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
  });
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleAddANewUser(e: FormEvent) {
    e.preventDefault();
    if (!newClient.name || !newClient.email || !newClient.phone) {
      return setResponse({
        type: 'error',
        response:
          'Preencha os campos obrigatórios para prosseguir com o cadastro do projeto',
      });
    }

    const result = await axios.post('/api/clients/create', newClient);
    // mutate('/api/projects/get', null, {
    //   optimisticData: result.data.project,
    // });
    if (result.data.type === 'success') {
      setNewClient({
        name: '',
        email: '',
        phone: '',
        image: '',
      });
    }

    setResponse({
      type: result.data.type,
      response: result.data.response,
    });

    setIsDisabled(false);
  }

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
        <Title title="Adicionar Cliente" size="xl" />
        <Link href="/clientes">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleAddANewUser}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <FormControl
            label="Nome"
            isRequired
            name="name"
            type="text"
            value={newClient.name}
            onChange={(e) =>
              setNewClient((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <FormControl
            label="Email"
            isRequired
            name="email"
            type="email"
            value={newClient.email}
            onChange={(e) =>
              setNewClient((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <FormControl
            label="Telefone/Celular"
            isRequired
            name="phone"
            type="text"
            value={newClient.phone}
            onChange={(e) =>
              setNewClient((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
          />
          <FormControl label="Imagem" isRequired name="image" type="file" />

          <button
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

export default AddNewClient;
