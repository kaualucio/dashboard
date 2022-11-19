import React, { useEffect, useState, ReactElement } from 'react';

import { FilterBlog } from '../../src/components/FilterBlog';
import { Header } from '../../src/components/Header';
import { useFetch } from '../../src/hooks/useFetch';
import { Loading } from '../../src/components/Loading';
import { Article } from '../../src/components/Article';
import { Layout } from '../../src/components/Layout';
import Head from 'next/head';
import { api } from '../../src/service/api/api';

export interface Article {
  title: string;
  slug: string;
  description: string;
  key_words: string[];
  reading_time: number;
  content: string;
  isPublished: boolean;
  thumbnail: string;
  categoryId: string;
  authorId: string;
}

const Blog = () => {
  const { data, mutate } = useFetch('/api/blog/get');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedArticles, setSearchedArticles] = useState<any[]>([]);

  function handleDeleteArticle(id: string) {
    api.post(`/api/blog/delete/${id}`);

    const updatedArticles = data?.filter((article: any) => article.id !== id);
    mutate(updatedArticles, false);
  }

  function handlePublishArticleArticle(id: string) {
    api.post(`/api/blog/publish/${id}`);
    const updatedArticles = data?.map((article: any) => {
      if (article.id === id) {
        return { ...article, isPublished: true, published_at: new Date() };
      }

      return article;
    });
    mutate(updatedArticles, false);
  }

  function handleSearchTerm(value: string) {
    setSearchTerm(value);
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      api
        .post('/api/blog/search/', {
          searchTerm,
        })
        .then((res) => {
          // console.log(res);
          setSearchedArticles(res.data);
        });
    } else if (searchTerm.length === 0) {
      setSearchedArticles([]);
    }
  }, [searchTerm]);

  if (!data) return <Loading />;

  return (
    <section className="relative w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Blog</title>
      </Head>
      <Header
        titlePage={`Blog - Artigos (${data.length})`}
        link="/blog/novo"
        label="Adicionar novo"
      />
      <FilterBlog handleSearchTerm={handleSearchTerm} searchTerm={searchTerm} />
      <div className="grid grid-cols-3 items-center gap-7">
        {searchedArticles.length > 0
          ? searchedArticles.map((article) => (
              <Article
                key={article.id}
                article={article}
                handleDeleteArticle={handleDeleteArticle}
                handlePublishArticleArticle={handlePublishArticleArticle}
              />
            ))
          : data?.map((article: any) => (
              <Article
                key={article.id}
                article={article}
                handleDeleteArticle={handleDeleteArticle}
                handlePublishArticleArticle={handlePublishArticleArticle}
              />
            ))}
      </div>
    </section>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Blog;
