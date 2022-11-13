import axios from 'axios';
import { signIn } from 'next-auth/react';
import React, { useState, FormEvent, useEffect } from 'react';
import { Button } from '../src/components/Button';
import { FormControl } from '../src/components/FormControl';

const Login = () => {
  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('12345678');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: true,
      login,
      password,
      callbackUrl: '/',
    });

    // console.log(res);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background p-4">
      <div className="flex items-center w-[900px] h-[500px] rounded-lg bg-[#fff] shadow-md">
        <div className="hidden lg:flex flex-col items-center justify-center bg-blue min-w-[370px] max-w-[370px] h-full py-5 px-7 rounded-tl-lg rounded-bl-lg text-center text-[#fff]">
          <h2 className="font-bold text-xl">Olá, bem-vindo ao painel CMS</h2>
          <p className="font-light text-sm">
            Faça seu login de administrador para continuar
          </p>
        </div>
        <div className="w-full h-full py-5 px-7 flex flex-col gap-5 items-center justify-center">
          <h2 className="text-2xl font-bold text-primary text-center">
            Nome da empresa
          </h2>
          <form
            onSubmit={handleLogin}
            className=" w-full flex flex-col gap-5 justify-center"
          >
            <div className="flex flex-col gap-2 sm:w-[400px] w-full mx-auto">
              <label
                htmlFor="login"
                className="self-start font-medium text-text text-md"
              >
                Login
              </label>
              <input
                type="text"
                id="login"
                name="login"
                className="block h-10 border border-text rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 sm:w-[400px] w-full mx-auto">
              <label
                htmlFor="password"
                className="self-start font-medium text-text text-md"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block h-10 border border-text rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 sm:w-[400px] w-full mx-auto">
              <button className="mt-5 w-[400] text-[#fff] h-12 rounded-md text-center bg-blue transition duration-300 hover:bg-darkBlue">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
