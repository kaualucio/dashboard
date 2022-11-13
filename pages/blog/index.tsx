import React, { useEffect, useState, ReactElement } from 'react';
import axios from 'axios';
import { FilterBlog } from '../../src/components/FilterBlog';
import { Header } from '../../src/components/Header';
import { useFetch } from '../../src/hooks/useFetch';
import { Loading } from '../../src/components/Loading';
import { Article } from '../../src/components/Article';
import { Layout } from '../../src/components/Layout';

const Blog = () => {
  const { data, mutate } = useFetch('/api/blog/get');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedArticles, setSearchedArticles] = useState<any[]>([]);

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

  function handleSearchTerm(value: string) {
    setSearchTerm(value);
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      axios
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
