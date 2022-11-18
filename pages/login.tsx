import Head from 'next/head';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { TailSpin } from 'react-loader-spinner'
import React, { useState, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { SITE_NAME } from '../src/constants';
import { api } from '../src/service/api/api';
const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true)
    try {
      if (!login || !password) {
        return toast.error(
          'Campas em branco não são permitidos, preencha-os para continuar'
        );
      }

      const {
        data: { access_token, refresh_token, session_token },
      } = await api.post('/api/auth/login', {
        login,
        password,
      });

      setCookie(null, 'beru.access_token', access_token, {
        maxAge: 60 * 60 * 24, // 1 day
      });

      setCookie(null, 'beru.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24, // 1 day
      });

      setIsLoading(false)
      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background p-4">
      <Head>
        <title>SITE NAME | Login</title>
      </Head>
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
                onChange={(e) => setLogin(e.target.value)}
                value={login}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                className="block h-10 border border-text rounded-md"
              />
            </div>
            <div 
            className="flex flex-col gap-2 sm:w-[400px] w-full mx-auto">
              <button
              disabled={isLoading}
              className={`mt-5 w-[400] text-[#fff] h-12 rounded-md text-center ${isLoading ? 'bg-darkBlue cursor cursor-default' : 'bg-blue'} transition duration-300 hover:bg-darkBlue`}>
                {!isLoading ? 'Entrar' : (
                  <div className="flex items-center justify-center">
                    <TailSpin radius={1} height="15" width="15" color="#fff" visible={true}/>
                  </div>
                ) }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
