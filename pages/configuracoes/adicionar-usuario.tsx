import axios from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Message } from '../../src/components/Message';
import { Select } from '../../src/components/Select';
import { Title } from '../../src/components/Title';
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
      return setResponse({
        type: 'error',
        response: 'Preencha os campos obrigatórios para continuar',
      });
    }
    if (!emailValidation(newUser.email)) {
      return setResponse({
        type: 'error',
        response: 'Email inválido, corrija-o para continuar',
      });
    }

    const res: any = await axios.post('/api/user/create', newUser);
    setNewUser({
      name: '',
      email: '',
      role: '',
      profile_picture: '',
    });
    setResponse({
      type: res.data.type,
      response: res.data.response,
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
    <section className="relative w-full p-5 h-full">
      <Message type={response.type} text={response.response} />
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

          <Button disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

export default AddUser;
