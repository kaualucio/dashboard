
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React, { FormEvent, useState, useEffect, ReactElement } from 'react';
import toast from 'react-hot-toast';
import { FormControl } from '../../../src/components/FormControl';
import { Header } from '../../../src/components/Header';
import { Layout } from '../../../src/components/Layout';
import { Message } from '../../../src/components/Message';
import { api } from '../../../src/service/api/api';

const EditTestimonial = ({ testimonial }: any) => {
  const [editedTestimonial, setEditedTestimonial] = useState({
    hirerName: testimonial.hirerName,
    hirerEmail: testimonial.hirerEmail,
    hirerCompany: testimonial.hirerCompany,
    testimonial: testimonial.testimonial,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleEditTestimonial(e: FormEvent, id: string) {
    e.preventDefault();
    if (
      !editedTestimonial.hirerEmail ||
      !editedTestimonial.hirerName ||
      !editedTestimonial.hirerCompany ||
      !editedTestimonial.testimonial
    ) {
      return toast.error('Preencha os campos obrigatório para prosseguir');
    }

    const result: any = await api.post('/api/testimonials/update', {
      ...editedTestimonial,
      id: testimonial.id,
    });
    if (result.data.type === 'success') {
      toast.success(result.data.response);
    } else {
      toast.error(result.data.response);
    }
    setIsDisabled(false);
  }

  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Editar Depoimento</title>
      </Head>
      <Header
        titlePage="Editar Depoimento"
        link="/depoimentos"
        label="Voltar"
      />

      <div className="mt-8 bg-[#fff] rounded-md shadow-md py-10 px-5">
        <form
          onSubmit={(e) => handleEditTestimonial(e, testimonial.id)}
          className="max-w-[800px] mx-auto flex flex-col gap-5"
        >
          <FormControl
            label="Nome do contratante"
            isRequired
            name="name"
            type="text"
            value={editedTestimonial.hirerName}
            onChange={(e) =>
              setEditedTestimonial((prevState) => ({
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
            value={editedTestimonial.hirerEmail}
            onChange={(e) =>
              setEditedTestimonial((prevState) => ({
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
            value={editedTestimonial.hirerCompany}
            onChange={(e) =>
              setEditedTestimonial((prevState) => ({
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
            value={editedTestimonial.testimonial}
            onChange={(e) =>
              setEditedTestimonial((prevState) => ({
                ...prevState,
                testimonial: e.target.value,
              }))
            }
          />
          <button
            disabled={isDisabled}
            type="submit"
            className="mt-5 self-end w-full sm:w-40 text-[#fff] rounded-md py-3 text-center bg-blue"
          >
            Editar
          </button>
        </form>
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/testimonials/get');
  const result = await res.json();
  return {
    paths: result.data.map((testimonial: any) => ({
      params: { id: testimonial.id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const res = await api.get('http://localhost:3000/api/testimonials/getById', {
    id: params?.id,
  });

  return {
    props: {
      testimonial: res.data,
    },
  };
};

EditTestimonial.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditTestimonial;
