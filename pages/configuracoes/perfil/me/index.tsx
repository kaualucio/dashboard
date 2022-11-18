import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import Image from 'next/image';
import React, { ReactElement } from 'react';

import { BsPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import { IoMdConstruct } from 'react-icons/io';
import { RiAttachment2 } from 'react-icons/ri';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillFacebook,
} from 'react-icons/ai';

import { IconButton } from '../../../../src/components/IconButton';
import { Header } from '../../../../src/components/Header';
import { Layout } from '../../../../src/components/Layout';

import { roles } from '../../../../src/utils/roles';
import { phoneMask } from '../../../../src/utils/phone-mask';

import placeholderProfilePicture from '../../../../public/images/placeholder_profile_picture.jpg';
import { SITE_NAME } from '../../../../src/constants';

const Profile = () => {
  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Meu Perfil</title>
      </Head>
      <Header
        titlePage="Meu perfil"
        link="/configuracoes/perfil/me/editar"
        label="Me editar"
      />
      <div className="mt-10 p-5">
        <div className="flex md:flex-row flex-col gap-10">
          <div className="w-full md:w-96 md:max-w-sm bg-[#fff] px-5 py-7 rounded-lg text-center">
            <div className="relative z-10 w-44 h-44 mx-auto rounded-full border-4 border-black">
              <Image
                src={placeholderProfilePicture}
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
            <div className="mt-5">
              <h2 className="text-black text-lg font-bold"></h2>
              <p className="text-text text-md"></p>
            </div>
            <div className="mt-10 flex flex-col gap-7">
              <div className="flex px-3 items-center justify-between ">
                <div className="flex items-center text-sm xl:text-md font-medium gap-2 text-text">
                  <BsPatchCheckFill />
                  <p>Projetos completos:</p>
                </div>
                <p className="text-primary text-md font-bold"></p>
              </div>
              <div className="flex px-3 items-center justify-between ">
                <div className="flex items-center text-sm xl:text-md font-medium gap-2 text-text">
                  <IoMdConstruct />
                  <p>Projetos atuais:</p>
                </div>
                <p className="text-primary text-md font-bold"></p>
              </div>
              <div className="flex px-3 items-center justify-between ">
                <div className="flex items-center text-sm xl:text-md font-medium gap-2 text-text">
                  <BsPencilFill />
                  <p>Artigos Escritos:</p>
                </div>
                <p className="text-primary text-md font-bold"></p>
              </div>
            </div>
          </div>
          <div className="bg-[#fff] w-full md:max-w-[820px] p-5 rounded-lg">
            <div>
              <h4 className="text-text text-md font-medium mb-2">Sobre min:</h4>
              <p className="text-black text-md "></p>
            </div>
            <div className="mt-5 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-7">
              <div>
                <h4 className="text-text text-md font-medium mb-2">Nome:</h4>
                <p className="text-black text-md "></p>
              </div>
              <div>
                <h4 className="text-text text-md font-medium mb-2">Cargo:</h4>
                <p className="text-black text-md "></p>
              </div>

              <div>
                <h4 className="text-text text-md font-medium mb-2">E-mail:</h4>
                <p className="text-black text-md "></p>
              </div>
              <div>
                <h4 className="text-text text-md font-medium mb-2">
                  Telefone:
                </h4>
                <p className="text-black text-md "></p>
              </div>

              <div>
                <h4 className="text-text text-md font-medium mb-2">Sexo:</h4>
                <p className="text-black text-md "></p>
              </div>
              <div>
                <h4 className="text-text text-md font-medium mb-2">Idade:</h4>
                <p className="text-black text-md "></p>
              </div>
            </div>
            <div className="flex items-center sm:flex-row flex-col gap-3">
              <IconButton
                icon={<RiAttachment2 size={20} color="#fff" />}
                href=""
              />
              <IconButton
                icon={<AiFillInstagram size={20} color="#fff" />}
                href=""
              />
              <IconButton
                icon={<AiOutlineTwitter size={20} color="#fff" />}
                href=""
              />
              <IconButton
                icon={<AiFillLinkedin size={20} color="#fff" />}
                href=""
              />
              <IconButton
                icon={<AiFillFacebook size={20} color="#fff" />}
                href=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
