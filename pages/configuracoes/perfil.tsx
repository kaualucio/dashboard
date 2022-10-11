import Image from 'next/image';
import React from 'react';
import { Title } from '../../src/components/Title';

import { BsPatchCheckFill } from 'react-icons/bs';
import { IoMdConstruct } from 'react-icons/io';

const Perfil = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Meu perfil" size="xl" />
      </div>
      <div className="mt-10 p-5">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="relative z-10 w-52 h-52 rounded-full border-4 border-blue">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                height={208}
                width={208}
                objectFit="cover"
                style={{ borderRadius: 999, zIndex: 30 }}
              />
              <div className="absolute top-0 left-0 z-40 opacity-0 hover:opacity-100 flex items-center justify-center w-full h-full bg-black/50 rounded-full">
                <label
                  htmlFor="profile_picture"
                  className="relative cursor-pointer z-50 text-[#fff] flex items-center justify-center w-full h-full  rounded-full"
                >
                  Mudar Foto
                </label>
                <input
                  type="file"
                  name="profile_picture"
                  id="profile_picture"
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <h2 className="text-black text-3xl font-bold">Nome da pessoa</h2>
              <p className="text-text text-lg">Product Manager</p>
              <p className="text-text text-md">email@teste.com</p>
            </div>
          </div>
          <p className="text-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto alias
            maxime in. Dolores quod magni illum? Eaque similique aperiam amet
            architecto illum porro veniam laborum, modi earum non, totam quidem!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
            excepturi alias voluptatibus labore sint eligendi quisquam eaque
            corrupti mollitia natus, aperiam culpa officiis est, doloribus
            dolorum asperiores eos, non corporis.
          </p>
          <div className="grid grid-cols-4 gap-5">
            <div className="flex px-3 items-center justify-between h-[70px] rounded-md bg-[#fff] shadow-md">
              <div className="flex items-center text-lg font-medium gap-2 text-text">
                <BsPatchCheckFill />
                <p>Projetos completos:</p>
              </div>
              <p className="text-primary text-xl font-bold">5</p>
            </div>
            <div className="flex px-3 items-center justify-between h-[70px] rounded-md bg-[#fff] shadow-md">
              <div className="flex items-center text-lg font-medium gap-2 text-text">
                <IoMdConstruct />
                <p>Projetos atuais:</p>
              </div>
              <p className="text-primary text-xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
