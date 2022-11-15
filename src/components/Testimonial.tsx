
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TestomialData {
  id: string;
  hirerName: string;
  hirerCompany: string;
  hirerEmail: string;
  testimonial: string;
  created_at: number;
  updated_at: number;
}

interface TesmonialProps {
  data?: TestomialData;
  handleDeleteTestimonial: (id: string | undefined) => void;
  isDisabled: boolean;
}

const Testimonial = ({
  data,
  handleDeleteTestimonial,
  isDisabled,
}: TesmonialProps) => {
  return (
    <div className="min-h-[300px] max-w-[300px] flex flex-col justify-between bg-[#fff] rounded-md shadow-md p-5">
      <div>
        <div className="flex items-center justify-center flex-col gap-1 ">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-black shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              height={80}
              width={80}
              objectFit="cover"
              style={{ borderRadius: 999 }}
            />
          </div>
          <div className="text-center my-2">
            <h3 className="text-sm text-text font-medium">{data?.hirerName}</h3>
            <p className="text-sm text-text">{data?.hirerEmail}</p>
            <p className="text-sm text-text">{data?.hirerCompany}</p>
          </div>
        </div>
        <div>
          <p className="text-primary text-sm text-justify font-thin">
            {data?.testimonial}
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center flex-col md:flex-row gap-3 text-center">
        <Link href={`/depoimentos/editar/${data?.id}`}>
          <a className="block w-full px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md">
            Editar
          </a>
        </Link>
        <button
          disabled={isDisabled}
          onClick={() => handleDeleteTestimonial(data?.id)}
          className="block w-full px-5 py-2 bg-red text-[#fff] font-medium text-sm rounded-md transition duration-300 hover:brightness-90"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export { Testimonial };
