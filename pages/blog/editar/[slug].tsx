import React, { FormEvent, useEffect, useState, ReactElement } from 'react';

import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { useFetch } from '../../../src/hooks/useFetch';
import { Loading } from '../../../src/components/Loading';
import { useRouter } from 'next/router';
import { FormControl } from '../../../src/components/FormControl';
import { TextEditor } from '../../../src/components/TextEditor';
import { Button } from '../../../src/components/Button';
import { Select } from '../../../src/components/Select';
import { Header } from '../../../src/components/Header';
import { Layout } from '../../../src/components/Layout';
import Head from 'next/head';

import { api } from '../../../src/service/api/api';
import { InputFile } from '../../../src/components/Inputs/InputFile';
import { addImageFile } from '../../../src/utils/add_image_file';

const ArticleSingle = () => {
  const { mutate: globalMutate } = useSWRConfig();
  const router = useRouter();
  const { data } = useFetch(`/api/blog/getBySlug/${router.query.slug}`);
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    authorId: '',
    categoryId: '',
    thumbnail:  '',
    key_words: '',
    reading_time: 0,
  });
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [content, setContent] = useState(data?.content);
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleCreateAArticle(e: FormEvent) {
    e.preventDefault();

    if (
      !articleData.authorId &&
      !articleData.categoryId &&
      !articleData.description &&
      !articleData.key_words &&
      !articleData.reading_time &&
      !articleData.title
    ) {
      return toast.error(
        'Não é possivel salvar como rascunho se todos os campos estiverem em branco!'
      );
    }

    const result: any = await api.post(`/api/blog/edit/${data.id}`, {
      ...articleData,
      content,
    });

    setIsDisabled(false);
    if (result.data.type === 'success') {
      globalMutate('/api/blog/get', null, { revalidate: true });
      return toast.success(result.data.response);
    } else {
      return toast.error(result.data.response);
    }
  }

  function handleSelectAuthor(value: string) {
    setArticleData((prevState) => ({ ...prevState, authorId: value }));
  }

  function handleSelectCategory(value: string) {
    setArticleData((prevState) => ({ ...prevState, categoryId: value }));
  }

  async function handleSelectThumbnail(thumbnail: File) {
    const result = await addImageFile(thumbnail, 'articles_thumbnail');

    if(result.type === 'success') {
      toast.success('A capa do artigo foi selecionada com sucesso!')
      setArticleData(prevState => ({ ...prevState, thumbnail: result.picture_url }))
    }else if(result.type === 'error') {
      toast.success('Não foi possível selecionar a capa do artigo, tente novamente!')
    }

  }


  useEffect(() => {
    api.get('/api/user/get').then((res) => {
      setAuthors(res.data.data);
    });

    api.get('/api/categories/get').then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setArticleData({
        title: data?.title,
        description: data?.description,
        authorId: data?.authorId,
        categoryId: data?.categoryId,
        thumbnail: data?.thumbnail,
        key_words: data?.key_words.join(', '),
        reading_time: Number(data?.reading_time),
      });
      setContent(data?.content);
    }
  }, [data]);

  if (!data) return <Loading />;

  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Editar Artigo</title>
      </Head>
      <Header
        titlePage={data.isPublished ? 'Editar artigo' : 'Continuar rascunho'}
        link="/blog"
        label="Voltar"
      />
      <div className="mt-10 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form className="max-w-[800px] mx-auto flex flex-col gap-5">
          <FormControl
            value={articleData.title}
            onChange={(e) =>
              setArticleData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            label="Título"
            name="title"
            type="text"
          />
          <FormControl
            value={articleData.description}
            onChange={(e) =>
              setArticleData((prevState) => ({
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
            value={articleData.authorId}
            placeHolder="Selecione o autor"
            handleChangeSelectValue={handleSelectAuthor}
          />

          <Select
            data={categories}
            id="category"
            name="category"
            label="Categoria"
            value={articleData.categoryId}
            placeHolder="Selecione a categoria"
            handleChangeSelectValue={handleSelectCategory}
          />

          <FormControl
            value={articleData.key_words}
            onChange={(e) =>
              setArticleData((prevState) => ({
                ...prevState,
                key_words: e.target.value,
              }))
            }
            label="Palavras Chave"
            name="keywords"
            type="text"
          />
          <FormControl
            value={String(articleData.reading_time)}
            onChange={(e) =>
              setArticleData((prevState) => ({
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
              label="Salvar edição"
              type="submit"
              disabled={isDisabled}
              onClick={handleCreateAArticle}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

ArticleSingle.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ArticleSingle;
