import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Testimonial } from '../../src/components/Testimonial';

import { Title } from '../../src/components/Title';

const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

const Testimonials = () => {
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
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5">
          {arr.map((num) => (
            <Testimonial key={num} />
          ))}
        </div>
        <div className="flex gap-5 items-center">
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
      </div>
    </section>
  );
};

export default Testimonials;
