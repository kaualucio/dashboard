import axios from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import FormControl from '../../src/components/FormControl';
import Message from '../../src/components/Message';
import { Title } from '../../src/components/Title';
import { emailValidation } from '../../src/utils/email-validation';

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    profile_picture: '',
  });
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

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
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="role"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Cargo
            </label>
            <select
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  role: e.target.value,
                }))
              }
              value={newUser.role}
              name="role"
              id="role"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="" disabled selected>
                Selecione o cargo a ser ocupado
              </option>
              <option value="product-manager">Product Manager</option>
              <option value="programador">Programador</option>
              <option value="analista-de-marketing">
                Analista de Marketing
              </option>
              <option value="designer">Designer</option>
            </select>
          </div>
          <FormControl label="Imagem" name="profile_picture" type="file" />

          <button
            type="submit"
            className="disabled:cursor-not-allowed mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue"
            disabled={isDisabled}
          >
            Adicionar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddUser;
