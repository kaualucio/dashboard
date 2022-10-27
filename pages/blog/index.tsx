import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';

import { Title } from '../../src/components/Title';
import FilterBlog from '../../src/components/FilterBlog';
import axios from 'axios';
import moment from 'moment';

const Blog = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/blog/get').then((res) => {
      setArticles(res.data.data);
    });
  }, []);

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
        {articles?.map((article) => (
          <div
            key={article.id}
            className="relative z-40 xl:col-span-3 md:col-span-1 col-span-3 flex xl:flex-row flex-col min-h-[270px]"
          >
            {!article.isPublished && (
              <span className="absolute top-5 left-5 z-50 inline-block p-1 rounded-full bg-blue text-xs text-bold text-[#fff]">
                Rascunho
              </span>
            )}
            <div className="xl:w-1/3 w-full ">
              <Image
                src={article.thumbnail}
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
                  <a
                    className={`${
                      article.isPublished && 'pointer-events-none'
                    } flex items-center text-black transition duration-300 font-bold text-2xl hover:text-blue`}
                  >
                    {article.title}
                  </a>
                </Link>
                <div className="flex items-center text-text gap-2">
                  <div className="flex items-center gap-1 text-sm ">
                    <AiFillCalendar size={18} />
                    {moment(article.created_at).format('DD/MM/YYYY')}
                  </div>
                  |
                  <div className="flex items-center gap-1 text-sm">
                    <AiFillClockCircle size={18} />
                    {article.reading_time} min
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-text font-medium">
                  <GoPencil size={18} />
                  {article.author.name}
                </div>
                <p
                  className="text-sm text-text"
                  dangerouslySetInnerHTML={{
                    __html: `${article.content.slice(0, 500)}...`,
                  }}
                ></p>
              </div>
              <div className="xl:self-end xl:mt-0 mt-5 flex md:items-center lg:flex-row flex-col gap-3">
                <Link href={`/blog/editar/${article.id}`}>
                  <a className="block lg:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium  rounded-md">
                    Editar
                  </a>
                </Link>
                <Link href={`/blog/deletar/${article.id}`}>
                  <a className="block lg:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-red text-[#fff] transition duration-300 hover:brightness-90 font-medium rounded-md">
                    Excluir
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
