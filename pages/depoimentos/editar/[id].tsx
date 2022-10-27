import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React, { FormEvent, useState, useEffect } from 'react';
import FormControl from '../../../src/components/FormControl';
import Message from '../../../src/components/Message';
import { Title } from '../../../src/components/Title';

const EditTestimonial = ({ testimonial }: any) => {
  const [editedTestimonial, setEditedTestimonial] = useState({
    hirerName: testimonial.hirerName,
    hirerEmail: testimonial.hirerEmail,
    hirerCompany: testimonial.hirerCompany,
    testimonial: testimonial.testimonial,
  });
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleEditTestimonial(e: FormEvent, id: string) {
    e.preventDefault();
    if (
      !editedTestimonial.hirerEmail ||
      !editedTestimonial.hirerName ||
      !editedTestimonial.hirerCompany ||
      !editedTestimonial.testimonial
    ) {
      return setResponse({
        type: 'error',
        response: 'Preencha os campos obrigatório para prosseguir',
      });
    }

    const res: any = await axios.post('/api/testimonials/update', {
      ...editedTestimonial,
      id: testimonial.id,
    });
    setResponse({
      type: res.data.type,
      response: res.data.response,
    });
    setIsDisabled(false);
  }

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
        <Title title="Editar Depoimento" size="xl" />
        <Link href="/depoimentos">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
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

  const res = await axios.get(
    'http://localhost:3000/api/testimonials/getById',
    {
      id: params?.id,
    }
  );

  return {
    props: {
      testimonial: res.data,
    },
  };
};

export default EditTestimonial;
