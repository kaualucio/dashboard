import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';

import FilterBlog from '../../src/components/FilterBlog';
import moment from 'moment';
import { Header } from '../../src/components/Header';
import { useFetch } from '../../src/hooks/useFetch';
import { Loading } from '../../src/components/Loading';
import axios from 'axios';

const Blog = () => {
  const { data, mutate } = useFetch('/api/blog/get');

  if (!data) return <Loading />;

  function handleDeleteArticle(id: string) {
    axios.post(`/api/blog/delete/${id}`);

    const updatedArticles = data?.filter((article: any) => article.id !== id);
    mutate(updatedArticles, false);
  }

  function handlePublishArticleArticle(id: string) {
    axios.post(`/api/blog/publish/${id}`);
    const updatedArticles = data?.map((article: any) => {
      if (article.id === id) {
        return { ...article, isPublished: true, published_at: new Date() };
      }

      return article;
    });
    mutate(updatedArticles, false);
  }

  return (
    <section className="w-full p-5 h-full">
      <Header
        titlePage={`Blog - Artigos (${data.length})`}
        link="/blog/novo"
        label="Adicionar novo"
      />
      <FilterBlog />
      <div className="grid grid-cols-3 items-center gap-7">
        {data?.map((article: any) => (
          <div
            key={article.id}
            className="relative z-40 xl:col-span-3 md:col-span-1 col-span-3 flex xl:flex-row flex-col xl:min-h-[270px] min-h-[830px]"
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
                    {moment(article.published_at).format('DD/MM/YYYY')}
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
              <div className="xl:self-end xl:mt-0 mt-5 flex md:items-center xl:flex-row flex-col gap-3">
                {!article.isPublished ? (
                  <button
                    onClick={() => handlePublishArticleArticle(article.id)}
                    className="block xl:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-green text-[#fff] transition duration-300 hover:brightness-90 font-medium  rounded-md"
                  >
                    Publicar
                  </button>
                ) : null}
                <Link href={`/blog/editar/${article.slug}`}>
                  <a className="block xl:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium  rounded-md">
                    {article.isPublished ? 'Editar' : 'Continuar o artigo'}
                  </a>
                </Link>
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="block xl:w-40 w-full md:py-3 py-5 md:text-sm text-md text-center bg-red text-[#fff] transition duration-300 hover:brightness-90 font-medium rounded-md"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
