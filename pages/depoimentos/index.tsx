import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSWRConfig } from 'swr';
import { Header } from '../../src/components/Header';
import { Loading } from '../../src/components/Loading';
import { Testimonial } from '../../src/components/Testimonial';
import { useFetch } from '../../src/hooks/useFetch';

const Testimonials = () => {
  const { mutate: mutateGlobal } = useSWRConfig();
  const { data, error, mutate } = useFetch('/api/testimonials/get');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDeleteTestimonial = useCallback(
    (id: string | undefined) => {
      if (id) {
        axios.post(`/api/testimonials/delete/${id}`);

        const updatedTestimonials = data?.filter(
          (testimonial: any) => testimonial.id !== id
        );
        mutate(updatedTestimonials, false);
        mutateGlobal(`/api/testimonials/getByOrderDate`, null, {
          revalidate: true,
        });
      }
    },
    [data, mutate, mutateGlobal]
  );

  if (!data) return <Loading />;
  return (
    <section className="w-full p-5 h-full">
      <Header
        titlePage="Depoimentos"
        link="/depoimentos/novo"
        label="Adicionar novo"
      />
      <div className="mt-8">
        {data.length > 0 ? (
          <>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5">
              {data?.map((testimonial: any) => (
                <Testimonial
                  key={testimonial.id}
                  data={testimonial}
                  handleDeleteTestimonial={handleDeleteTestimonial}
                  isDisabled={isDisabled}
                />
              ))}
            </div>
            <div className="max-w-[250px] mt-10 mx-auto flex gap-5 justify-center items-center">
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
            </div>
          </>
        ) : (
          <h2 className="mt-10 text-lg font-medium text-text">
            Nenhum depoimento cadastrado ainda!
          </h2>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
