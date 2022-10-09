import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { Title } from '../../src/components/Title';

const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

const Depoimentos = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Depoimentos" size="xl" />
        <Link href="/depoimentos/novo">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Adicionar novo
          </a>
        </Link>
      </div>
      <div className="mt-8 flex flex-col items-center gap-10">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5">
          {arr.map((num) => (
            <div
              key={num}
              className="max-h-[300px] flex flex-col justify-between bg-[#fff] rounded-md shadow-md p-5"
            >
              <div>
                <div className="flex items-start gap-3 border">
                  <div className="w-16 h-16 rounded-full border-2 border-primary mb-5">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                      height={64}
                      width={64}
                      objectFit="cover"
                      style={{ borderRadius: 999 }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm text-text font-medium">
                      Nome pessoa/empresa
                    </h3>
                    <p className="text-sm text-text">email@exemplo.com</p>
                    <p className="text-sm text-text">(84) 98888-1111</p>
                  </div>
                </div>
                <div>
                  <p className="text-primary text-sm text-justify font-thin">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Commodi, repudiandae debitis. Ab voluptates at consequuntur,
                    maxime delectus mollitia.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center flex-col md:flex-row gap-3 text-center">
                <Link href="">
                  <a className="block w-full px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
                    Editar
                  </a>
                </Link>
                <Link href="">
                  <a className="block w-full px-5 py-2 bg-red text-[#fff] font-medium text-sm rounded-md transition duration-300 hover:brightness-90">
                    Excluir
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <button>
            <FaChevronLeft />
          </button>
          <div className="flex items-center gap-3">
            <button>1</button>
            <button>2</button>
            <button className="text-xl font-bold underline">3</button>
            <button>4</button>
            <button>5</button>
          </div>
          <button>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
