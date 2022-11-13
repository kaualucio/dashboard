import axios from 'axios';
import React, { FormEvent, ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Header } from '../../src/components/Header';
import { Layout } from '../../src/components/Layout';

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
      return toast.error(
        'Preencha os campos obrigatórios para prosseguir com o cadastro do projeto'
      );
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
      toast.success(result.data.response);
    } else {
      toast.error(result.data.response);
    }

    setIsDisabled(false);
  }

  return (
    <section className="w-full p-5 h-full">
      <Header titlePage="Adicionar Cliente" link="/clientes" label="Voltar" />
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

          <Button type="submit" disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

AddNewClient.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddNewClient;
