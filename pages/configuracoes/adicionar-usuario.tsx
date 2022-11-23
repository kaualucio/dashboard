import React, { useState, ReactElement, FormEvent } from 'react';
import toast from 'react-hot-toast';
import Head from 'next/head';

import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Layout } from '../../src/components/Layout';
import { Select } from '../../src/components/Select';
import { Title } from '../../src/components/Title';

import { api } from '../../src/service/api/api';
import { emailValidation } from '../../src/utils/email-validation';
import { rolesOptions } from '../../src/utils/roles';

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    profile_picture: '',
  });
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSelectUserRole(value: string) {
    setNewUser((prevState) => ({ ...prevState, role: value }));
  }

  async function handleCreateNewUser(e: FormEvent) {
    e.preventDefault();
    setIsDisabled(true);
    if (!newUser.name || !newUser.email || !newUser.role) {
      return toast.error('Preencha os campos obrigatórios para continuar');
    }
    if (!emailValidation(newUser.email)) {
      return toast.error('Email inválido, corrija-o para continuar');
    }

    const result: any = await api.post('/api/user/create', newUser);
    setNewUser({
      name: '',
      email: '',
      role: '',
      profile_picture: '',
    });
    if (result.data.type === 'success') {
      toast.success(result.data.response);
    } else {
      toast.error(result.data.response);
    }
    setIsDisabled(false);
  }

  return (
    <section className="relative w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Adicionar novo usuário</title>
      </Head>
      <div className="flex items-center justify-between">
        <Title title="Adicionar Usuário" size="xl" />
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleCreateNewUser}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <FormControl
            onChange={(e) =>
              setNewUser((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            value={newUser.name}
            label="Nome"
            isRequired
            name="name"
            type="text"
          />
          <FormControl
            onChange={(e) =>
              setNewUser((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            value={newUser.email}
            label="Email"
            isRequired
            name="email"
            type="email"
          />
          <Select
            label="Cargo"
            isRequired
            data={rolesOptions}
            id="role"
            name="role"
            placeHolder="Selecione o cargo a ser ocupado"
            value={newUser.role}
            handleChangeSelectValue={handleSelectUserRole}
          />

          <FormControl label="Imagem" name="profile_picture" type="file" />

          <Button type="submit" disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

AddUser.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddUser;
