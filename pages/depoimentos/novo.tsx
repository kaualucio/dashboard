import Head from 'next/head';
import React, { FormEvent, useState, ReactElement } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Header } from '../../src/components/Header';
import { InputFile } from '../../src/components/Inputs/InputFile';
import { Layout } from '../../src/components/Layout';

import { api } from '../../src/service/api/api';
import { addImageFile } from '../../src/utils/add_image_file';

const AddTestimonial = () => {
  const [newTestimonial, setNewTestimonial] = useState({
    hirerName: '',
    hirerEmail: '',
    hirerCompany: '',
    hirerPhoto: '',
    testimonial: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleAddNewTestimonial(e: FormEvent) {
    e.preventDefault();
    if (
      !newTestimonial.hirerEmail ||
      !newTestimonial.hirerName ||
      !newTestimonial.hirerCompany ||
      !newTestimonial.testimonial
    ) {
      return toast.error('Preencha os campos obrigatório para prosseguir');
    }

    const result: any = await api.post('/api/testimonials/create', {
      ...newTestimonial,
    });

    setNewTestimonial({
      hirerName: '',
      hirerEmail: '',
      hirerCompany: '',
      hirerPhoto: '',
      testimonial: '',
    });
    if (result.data.type === 'success') {
      toast.success(result.data.response);
    } else {
      toast.error(result.data.response);
    }
    setIsDisabled(false);
  }

  async function handleSelectThumbnail(thumbnail: File) {
    if(thumbnail) {
      const result = await addImageFile(thumbnail, 'articles_thumbnail');

      if(result.type === 'success') {
        toast.success('A capa do artigo foi selecionada com sucesso!')
        setNewTestimonial(prevState => ({ ...prevState, hirerPhoto: result.picture_url }))
      }else if(result.type === 'error') {
        toast.success('Não foi possível selecionar a capa do artigo, tente novamente!')
      }
    }
  }

  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Novo Depoimento</title>
      </Head>
      <Header
        titlePage="Adicionar Depoimento"
        link="/depoimentos"
        label="Voltar"
      />

      <div className="mt-8 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={handleAddNewTestimonial}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <FormControl
            label="Nome do contratante"
            isRequired
            name="name"
            type="text"
            value={newTestimonial.hirerName}
            onChange={(e) =>
              setNewTestimonial((prevState) => ({
                ...prevState,
                hirerName: e.target.value,
              }))
            }
          />

          <FormControl
            label="E-mail do contratante"
            isRequired
            name="email"
            type="email"
            value={newTestimonial.hirerEmail}
            onChange={(e) =>
              setNewTestimonial((prevState) => ({
                ...prevState,
                hirerEmail: e.target.value,
              }))
            }
          />

          <FormControl
            label="Compania"
            name="company"
            type="text"
            isRequired
            value={newTestimonial.hirerCompany}
            onChange={(e) =>
              setNewTestimonial((prevState) => ({
                ...prevState,
                hirerCompany: e.target.value,
              }))
            }
          />

          <FormControl
            label="Depoimento"
            name="testimonial"
            isTextArea
            isRequired
            value={newTestimonial.testimonial}
            onChange={(e) =>
              setNewTestimonial((prevState) => ({
                ...prevState,
                testimonial: e.target.value,
              }))
            }
          />
        <InputFile
            onChange={(e) => e.currentTarget.files ? handleSelectThumbnail(e.currentTarget.files[0]) : null}
            label="Capa"
            name="thumbnail"
            type="file"
          />
          <Button disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

AddTestimonial.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddTestimonial;
