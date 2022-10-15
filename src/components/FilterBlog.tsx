import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

const FilterBlog = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  function handleOpenFilter() {
    setFilterOpen((prevState) => !prevState);
  }

  return (
    <div className="my-10">
      <div className=" flex items-center gap-3 sm:gap-5 md:gap-10 mb-5">
        <form className="w-full">
          <input
            type="text"
            name="search_term"
            placeholder="Pesquise pelo título"
            className="outline-none block w-full h-12 bg-background p-2 border border-text text-sm text-black rounded-md"
          />
        </form>
        <div>
          <button
            onClick={handleOpenFilter}
            className="h-12 w-12 flex items-center justify-center rounded-md text-lg bg-blue text-[#fff] transition duration-300 hover:bg-darkBlue"
          >
            <FaFilter />
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300  w-full ${
          filterOpen
            ? 'min-h-[300px] p-5 opacity-100 pointer-events-auto'
            : 'h-0 p-0 opacity-0 pointer-events-none'
        } bg-[#fff] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
      >
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-black mb-3 font-bold text-lg">
              Data Públicação:
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="published_date"
                  id="published_date_asc"
                  value="crescente"
                />
                <label htmlFor="published_date_asc">Crescente</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="published_date"
                  id="published_date_desc"
                  value="decrescente"
                />
                <label htmlFor="published_date_desc">Decrescente</label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-black mb-3 font-bold text-lg">
              Tempo de leitura:
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="read_time"
                  id="five_to_ten"
                  value="five_to_ten"
                />
                <label htmlFor="five_to_ten">5 a 10min</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="read_time"
                  id="ten_to_twenty"
                  value="ten_to_twenty"
                />
                <label htmlFor="ten_to_twenty">10 a 20min</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="read_time"
                  id="twenty_to_thirty"
                  value="twenty_to_thirty"
                />
                <label htmlFor="twenty_to_thirty">20 a 30min</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="read_time"
                  id="more_than_thirty"
                  value="more_than_thirty"
                />
                <label htmlFor="more_than_thirty">+30min</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-black mb-3 font-bold text-lg">Autores:</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="author"
                id="author"
                value="kaua-lucio"
              />
              <label htmlFor="author">Kauã Lúcio</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="author"
                id="author"
                value="kaua-lucio"
              />
              <label htmlFor="author">Kauã Lúcio</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="author"
                id="author"
                value="kaua-lucio"
              />
              <label htmlFor="author">Kauã Lúcio</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="author"
                id="author"
                value="kaua-lucio"
              />
              <label htmlFor="author">Kauã Lúcio</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="author"
                id="author"
                value="kaua-lucio"
              />
              <label htmlFor="author">Kauã Lúcio</label>
            </div>
          </div>
        </div>
        <div className="relative">
          <h3 className="text-black mb-3 font-bold text-lg">Categorias:</h3>
          <div className="relative flex flex-col justify-between gap-3">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="programming"
                id="programming"
                value="programming"
              />
              <label htmlFor="programming">Programação</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" name="mkd" id="mkd" value="mkd" />
              <label htmlFor="mkd">Marketing Digital</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="grafic_design"
                id="grafic_design"
                value="grafic_design"
              />
              <label htmlFor="grafic_design">Design Gráfico</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="content_marketing"
                id="content_marketing"
                value="content_marketing"
              />
              <label htmlFor="content_marketing">Marketing de Conteúdo</label>
            </div>
          </div>
          <button className="mt-7 w-full px-3 py-4 md:mt-0 md:w-auto md:py-2 md:absolute right-[10px] bottom-0 rounded-md bg-blue text-sm text-[#fff] transition duration-300 hover:bg-darkBlue">
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBlog;
