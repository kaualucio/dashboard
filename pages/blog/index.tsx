import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TbTypography } from 'react-icons/tb';
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';

import { Title } from '../../src/components/Title';
import FilterBlog from '../../src/components/FilterBlog';

const Blog = () => {
  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Blog - Artigos (0)" size="xl" />
        <Link href="/blog/novo">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Adicionar novo
          </a>
        </Link>
      </div>
      <FilterBlog />
      <div className="grid grid-cols-3 items-center gap-7">
        <div className="xl:col-span-3 md:col-span-1 col-span-3 flex xl:flex-row flex-col min-h-[270px]">
          <div className="xl:w-1/3 w-full ">
            <Image
              src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
              objectFit="cover"
              width={600}
              height={400}
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          <div className="xl:w-2/3 w-full p-3 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <Link href="/depoimentos/novo">
                <a className="flex items-center text-black transition duration-300 font-bold text-2xl hover:text-blue">
                  Título do artigo
                </a>
              </Link>
              <div className="flex items-center text-text gap-2">
                <div className="flex items-center gap-1 text-sm ">
                  <AiFillCalendar size={18} />
                  12/10/22
                </div>
                |
                <div className="flex items-center gap-1 text-sm">
                  <AiFillClockCircle size={18} />
                  10 min
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-text font-medium">
                <GoPencil size={18} />
                Kauã Lúcio
              </div>
              <p className="text-sm text-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                harum error maxime velit aspernatur vero in iste esse modi
                corporis eligendi, natus reiciendis qui provident quisquam
                molestias officia ratione omnis velit aspernatur vero in iste
                esse modi corporis eligendi, natus reiciendis qui provident
                quisquam molestias officia ratione omnis.
              </p>
            </div>
            <div className="xl:self-end xl:mt-0 mt-5 flex md:items-center lg:flex-row flex-col gap-3">
              <Link href="/blog/editar/idPost">
                <a className="block lg:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium  rounded-md">
                  Editar
                </a>
              </Link>
              <Link href="/blog/editar/idPost">
                <a className="block lg:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-red text-[#fff] transition duration-300 hover:brightness-90 font-medium rounded-md">
                  Excluir
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
