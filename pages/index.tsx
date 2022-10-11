import type { NextPage } from 'next';
import { Title } from '../src/components/Title';

import styles from '../styles/home.module.scss';

const Home: NextPage = () => {
  return (
    <section className="w-full p-5 h-full">
      <Title title="Dashboard" size="xl" />
      <div className={`mt-10 grid grid-cols-6 grid-rows-8 gap-6`}>
        <div
          className={`col-span-6 xl:col-span-4 row-span-1 xl:col-span-4 ${styles.metric} grid grid-cols-3 gap-5`}
        >
          <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-primary"></div>
              <div>
                <h3 className="text-xs text-text font-medium uppercase">
                  Artigos
                </h3>
                <p className="text-xs text-text">Total de artigos:</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-black">20</p>
          </div>
          <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-primary"></div>
              <div>
                <h3 className="text-xs text-text font-medium uppercase">
                  Clientes
                </h3>
                <p className="text-xs text-text">Total de clientes:</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-black">150</p>
          </div>
          <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-primary"></div>
              <div>
                <h3 className="text-xs text-text font-medium uppercase">
                  Projetos
                </h3>
                <p className="text-xs text-text">Total de projetos:</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-black">200</p>
          </div>
        </div>
        <div
          className={`col-span-6 lg:col-span-3 xl:col-span-2 row-span-3 rounded-md shadow-sm bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 lg:col-span-3 xl:col-span-4 row-span-2  rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 md:col-span-3 xl:col-span-2 row-span-2 rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 md:col-span-3 xl:col-span-2 row-span-2 rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 md:col-span-3 xl:col-span-2 row-span-2 rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 md:col-span-3 row-span-2 rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 md:col-span-3 row-span-2 rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
        <div
          className={`col-span-6 rounded-md shadow-sm h-96 bg-[#fff] p-3`}
        ></div>
      </div>
    </section>
  );
};

export default Home;
