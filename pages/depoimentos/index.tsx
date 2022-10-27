import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useMemo } from 'react';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Testimonial } from '../../src/components/Testimonial';

import { Title } from '../../src/components/Title';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [status, setStatus] = useState('idle');
  const [isDisabled, setIsDisabled] = useState(false);

  function handleDeleteTestimonial(id: string | undefined) {
    if (id) {
      setIsDisabled(true);
      setStatus('loading');
      axios
        .post(`/api/testimonials/delete`, {
          id,
        })
        .finally(() => {
          setStatus('idle');
          setIsDisabled(false);
        });
    } else {
      return;
    }
  }

  useEffect(() => {
    if (status === 'idle') {
      axios.get('/api/testimonials/get').then((res) => {
        setTestimonials(res.data.data);
      });
    }
  }, [status]);

  return (
    <section className="w-full p-5 h-full">
      <div className="flex items-center justify-between">
        <Title title="Depoimentos" size="xl" />
        <Link href="/depoimentos/novo">
          <a className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Adicionar novo
          </a>
        </Link>
      </div>
      <div className="mt-8 flex flex-col items-center gap-10">
        {testimonials.length > 0 ? (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5">
            {testimonials?.map((testimonial) => (
              <Testimonial
                key={testimonial.id}
                data={testimonial}
                handleDeleteTestimonial={handleDeleteTestimonial}
                isDisabled={isDisabled}
              />
            ))}
          </div>
        ) : (
          <h2 className="mt-10 text-lg font-medium text-text">
            Nenhum depoimento cadastrado ainda!
          </h2>
        )}
        {/* <div className="flex gap-5 items-center">
          <button>
            <FaChevronLeft />
          </button>
          <div className="flex items-center gap-3">
            <button>1</button>
            <button>2</button>
            <button className="text-xl font-bold underline">3</button>
            <button>4</button>
            <button>5</button>
          </div>
          <button>
            <FaChevronRight />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
