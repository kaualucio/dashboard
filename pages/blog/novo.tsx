import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import FormControl from '../../src/components/FormControl';
import Message from '../../src/components/Message';
import TextEditor from '../../src/components/TextEditor';

import { Title } from '../../src/components/Title';

const AddNewBlogPost = () => {
  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    authorId: '',
    categoryId: '',
    thumbnail:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    key_words: '',
    reading_time: 0,
  });
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  async function handleCreateAArticle(e: FormEvent, notSaveAsDraft: boolean) {
    e.preventDefault();

    if (
      !newArticle.authorId &&
      !newArticle.categoryId &&
      !newArticle.description &&
      !newArticle.key_words &&
      !newArticle.reading_time &&
      !newArticle.thumbnail &&
      !newArticle.title
    ) {
      return setResponse({
        type: 'error',
        response:
          'Não é possivel salvar como rascunho se todos os campos estiverem em branco!',
      });
    }

    const res: any = await axios.post('/api/blog/create', {
      ...newArticle,
      content,
      isPublished: notSaveAsDraft,
    });

    setNewArticle({
      title: '',
      description: '',
      authorId: '',
      categoryId: '',
      thumbnail:
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      key_words: '',
      reading_time: 0,
    });
    setResponse({
      type: res.data.type,
      response: res.data.response,
    });
    setIsDisabled(false);
  }

  useEffect(() => {
    axios.get('/api/user/get').then((res) => {
      setAuthors(res.data.data);
    });

    axios.get('/api/categories/get').then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (response.type !== 'none') {
      setTimeout(() => {
        setResponse({
          type: 'none',
          response: '',
        });
      }, 5000);
    }
  }, [response]);

  return (
    <section className="w-full p-5 h-full">
      <Message type={response.type} text={response.response} />
      <div className="flex items-center justify-between">
        <Title title="Novo post" size="xl" />
        <Link href="/blog">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <FormControl
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            label="Título"
            name="title"
            type="text"
          />
          <FormControl
            value={newArticle.description}
            onChange={(e) =>
              setNewArticle((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            label="Descrição"
            isTextArea
            name="description"
            type="text"
          />
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="author"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Autor
            </label>
            <select
              value={newArticle.authorId}
              onChange={(e) =>
                setNewArticle((prevState) => ({
                  ...prevState,
                  authorId: e.target.value,
                }))
              }
              name="author"
              id="author"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="" selected disabled>
                Selecione o autor do artigo
              </option>
              {authors?.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="category"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Categoria
            </label>
            <select
              value={newArticle.categoryId}
              onChange={(e) =>
                setNewArticle((prevState) => ({
                  ...prevState,
                  categoryId: e.target.value,
                }))
              }
              name="category"
              id="category"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            >
              <option value="" selected disabled>
                Selecione a categoria
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <FormControl
            value={newArticle.key_words}
            onChange={(e) =>
              setNewArticle((prevState) => ({
                ...prevState,
                key_words: e.target.value,
              }))
            }
            label="Palavras Chave"
            name="keywords"
            type="text"
          />
          <FormControl
            value={String(newArticle.reading_time)}
            onChange={(e) =>
              setNewArticle((prevState) => ({
                ...prevState,
                reading_time: Number(e.target.value),
              }))
            }
            label="Tempo min de leitura"
            name="time_lecture"
            type="number"
          />
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <label
              htmlFor="thumbnail"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Capa
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              placeholder="Use ponto e virgula (;) para separar as palavras-chave"
              className="outline-none block w-full lg:w-[500px] p-2 border border-text text-sm text-black rounded-md"
            />
          </div>
          <div className="flex items-start flex-col gap-5">
            <label
              htmlFor="content"
              className="text-md text-text font-medium mb-3 lg:mb-0"
            >
              Conteúdo
            </label>
            <TextEditor value={content} setValue={setContent} />
          </div>
          <div className="mt-20 sm:mt-10 w-full flex items-center justify-end self-start gap-3 sm:flex-row flex-col">
            <button
              disabled={isDisabled}
              onClick={(e) => handleCreateAArticle(e, true)}
              className="w-full sm:w-fit text-[#fff] rounded-md px-5 py-2 text-center bg-blue"
            >
              Publicar
            </button>
            <button
              disabled={isDisabled}
              onClick={(e) => handleCreateAArticle(e, false)}
              className="w-full sm:w-fit text-[#fff] rounded-md px-5 py-2 text-center bg-blue"
            >
              Salvar como rascunho
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewBlogPost;
