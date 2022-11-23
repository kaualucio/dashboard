import Head from 'next/head';
import React, { FormEvent, useEffect, useState, ReactElement } from 'react';
import toast from 'react-hot-toast';

import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Header } from '../../src/components/Header';
import { InputFile } from '../../src/components/Inputs/InputFile';
import { Layout } from '../../src/components/Layout';
import { Select } from '../../src/components/Select';
import { TextEditor } from '../../src/components/TextEditor';

import { api } from '../../src/service/api/api';
import { addImageFile } from '../../src/utils/add_image_file';

const AddNewBlogPost = () => {
  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    authorId: '',
    categoryId: '',
    thumbnail: '',
    key_words: '',
    reading_time: 0,
  });
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  async function handleCreateAArticle(e: FormEvent, notSaveAsDraft: boolean) {
    e.preventDefault();

    if (
      !newArticle.authorId &&
      !newArticle.categoryId &&
      !newArticle.description &&
      !newArticle.key_words &&
      !newArticle.reading_time &&
      !newArticle.title
    ) {
      return toast.error(
        'Não é possivel salvar como rascunho se todos os campos estiverem em branco!'
      );
    }

    const result: any = await api.post('/api/blog/create', {
      ...newArticle,
      content,
      isPublished: notSaveAsDraft,
    });

    setNewArticle({
      title: '',
      description: '',
      authorId: '',
      categoryId: '',
      thumbnail: '',
      key_words: '',
      reading_time: 0,
    });

    setIsDisabled(false);
    if (result.data.type === 'success') {
      return toast.success(result.data.response);
    } else {
      return toast.error(result.data.response);
    }
  }

  function handleSelectAuthor(value: string) {
    setNewArticle((prevState) => ({ ...prevState, authorId: value }));
  }

  function handleSelectCategory(value: string) {
    setNewArticle((prevState) => ({ ...prevState, categoryId: value }));
  }

  async function handleSelectThumbnail(thumbnail: File) {
    const result = await addImageFile(thumbnail, 'articles_thumbnail');

    if(result.type === 'success') {
      toast.success('A capa do artigo foi selecionada com sucesso!')
      setNewArticle(prevState => ({ ...prevState, thumbnail: result.picture_url }))
    }else if(result.type === 'error') {
      toast.success('Não foi possível selecionar a capa do artigo, tente novamente!')
    }

  }

  useEffect(() => {
    api.get('/api/user/get').then((res) => {
      setAuthors(res.data.data);
    });

    api.get('/api/categories/get').then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Novo Artigo</title>
      </Head>
      <Header titlePage="Novo post" link="/blog" label="Voltar" />
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

          <Select
            data={authors}
            id="author"
            name="author"
            label="Autor"
            value={newArticle.authorId}
            placeHolder="Selecione o autor"
            handleChangeSelectValue={handleSelectAuthor}
          />

          <Select
            data={categories}
            id="category"
            name="category"
            label="Categoria"
            value={newArticle.categoryId}
            placeHolder="Selecione a categoria"
            handleChangeSelectValue={handleSelectCategory}
          />

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
          <InputFile
            onChange={(e) => e.currentTarget.files ? handleSelectThumbnail(e.currentTarget.files[0]) : null}
            label="Capa"
            name="thumbnail"
            type="file"
          />
          <TextEditor label="Conteúdo" value={content} setValue={setContent} />

          <div className="mt-20 sm:mt-10 w-full flex items-center justify-end self-start gap-3 sm:flex-row flex-col">
            <Button
              label="Publicar"
              type="submit"
              disabled={isDisabled}
              onClick={(e) => handleCreateAArticle(e, true)}
            />
            <Button
              label="Salvar como rascunho"
              type="submit"
              disabled={isDisabled}
              onClick={(e) => handleCreateAArticle(e, false)}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

AddNewBlogPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddNewBlogPost;
