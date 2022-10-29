import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useState, useEffect } from 'react';
import { Button } from '../../src/components/Button';
import { FormControl } from '../../src/components/FormControl';
import { Message } from '../../src/components/Message';
import { Title } from '../../src/components/Title';

const AddTestimonial = () => {
  const [newTestimonial, setNewTestimonial] = useState({
    hirerName: '',
    hirerEmail: '',
    hirerCompany: '',
    testimonial: '',
  });
  const [response, setResponse] = useState({ type: 'none', response: '' });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleAddNewTestimonial(e: FormEvent) {
    e.preventDefault();
    if (
      !newTestimonial.hirerEmail ||
      !newTestimonial.hirerName ||
      !newTestimonial.hirerCompany ||
      !newTestimonial.testimonial
    ) {
      return setResponse({
        type: 'error',
        response: 'Preencha os campos obrigatório para prosseguir',
      });
    }

    const res: any = await axios.post('/api/testimonials/create', {
      ...newTestimonial,
    });

    setNewTestimonial({
      hirerName: '',
      hirerEmail: '',
      hirerCompany: '',
      testimonial: '',
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
        <Title title="Adicionar Depoimento" size="xl" />
        <Link href="/depoimentos">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Voltar
          </a>
        </Link>
      </div>
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
          <Button disabled={isDisabled} label="Adicionar" />
        </form>
      </div>
    </section>
  );
};

export default AddTestimonial;
