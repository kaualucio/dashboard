import { api } from '../src/service/api/api';
import moment from 'moment';
import styles from '../styles/home.module.scss';
import { Title } from '../src/components/Title';
import { ModalContainer } from '../src/components/ModalContainer';
import { TaskForm } from '../src/components/Forms/TaskForm';
import { useState, ReactElement } from 'react';
import { FaTasks } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useFetch } from '../src/hooks/useFetch';
import { Loading } from '../src/components/Loading';
import TaskDetailsModal from '../src/components/Modals/TaskDetailsModal';

import { Layout } from '../src/components/Layout';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

const Home = () => {
  const [openCreateTodoModal, setOpenCreateTodoModal] = useState(false);
  const [openDetailsTodoModal, setOpenDetailsTodoModal] = useState(false);
  const [task, setTask] = useState<any>(null);
  const { data, isValidating, mutate } = useFetch('/api/tasks/get');

  function handleOpenTaskModal() {
    setOpenCreateTodoModal((prevState) => !prevState);
  }

  function handleOpenTaskDetailsModal(task?: any) {
    setTask(task ? task : null);
    setOpenDetailsTodoModal((prevState) => !prevState);
  }

  function handleCompleteTask(taskId: string) {
    api.post(`/api/tasks/complete/${taskId}`, {
      completed_by_user_id: '9cfd74d8-b4bc-4c0d-83ed-53bb4cea9e62',
    });

    const updatedTasks = data?.map((task: any) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: true,
          completed_at: moment(new Date()).format('DD/MM/YYYY'),
          completed_by_user: { name: 'Kauã' },
        };
      }

      return task;
    });
    handleOpenTaskDetailsModal();
    mutate(updatedTasks, false);
  }

  function handleDeleteTask(taskId: string) {
    api.post(`/api/tasks/delete/${taskId}`);

    const updatedTasks = data?.filter((task: any) => task.id !== taskId);
    handleOpenTaskDetailsModal();
    mutate(updatedTasks, false);
  }

  return (
    <section className="w-full p-5 h-full">
      <Head>
        <title>SITE NAME | Dashboard</title>
      </Head>
      {openCreateTodoModal ? (
        <ModalContainer
          handleOpenModal={() => handleOpenTaskModal()}
          title="Criar nova tarefa"
        >
          <TaskForm tasks={data} />
        </ModalContainer>
      ) : openDetailsTodoModal ? (
        <TaskDetailsModal
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleCompleteTask={handleCompleteTask}
          handleOpenTaskDetailsModal={handleOpenTaskDetailsModal}
          titleModal={'Detalhes da tarefa'}
        />
      ) : null}

      <Title title="Dashboard" size="xl" />
      <div className={`mt-10 grid grid-cols-6 grid-rows-8 gap-6`}>
        <div
          className={`col-span-6 xl:col-span-4 row-span-1 xl:col-span-4 ${styles.metric} grid grid-cols-3 gap-5`}
        >
          <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 md:px-3 shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-primary"></div>
              <div>
                <h3 className="text-xs text-text font-medium uppercase">
                  Artigos
                </h3>
                <p className="text-xs text-text">Total de artigos:</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-black">20</p>
          </div>
          <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 md:px-3 shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-primary"></div>
              <div>
                <h3 className="text-xs text-text font-medium uppercase">
                  Clientes
                </h3>
                <p className="text-xs text-text">Total de clientes:</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-black">150</p>
          </div>
          <div className="col-span-3 lg:col-span-1 bg-[#fff] h-[100px] max-h-[100px] px-6 md:px-3 shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-primary"></div>
              <div>
                <h3 className="text-xs text-text font-medium uppercase">
                  Projetos
                </h3>
                <p className="text-xs text-text">Total de projetos:</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-black">200</p>
          </div>
        </div>
        <div
          className={`col-span-6 lg:col-span-3 xl:col-span-2 row-span-3 rounded-md shadow-sm bg-[#fff] p-6`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-black font-bold text-xl">
              <FaTasks />
              <h2>Tarefas</h2>
            </div>
            <button
              onClick={handleOpenTaskModal}
              className="p-1 rounded-full text-xl text-blue font-bold cursor-pointer transition duration-300 hover:text-darkBlue  hover:bg-[#EFEFEF]"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <div className="h-[400px] mt-7 flex flex-col gap-2 overflow-y-auto">
            {!data && isValidating ? (
              <Loading />
            ) : (
              data.map((task: any) => (
                <button
                  key={task.id}
                  onClick={() => handleOpenTaskDetailsModal(task)}
                  className="border-b-[3px] border-b-[#ccc] px-2 py-3 rounded-md transition duration-300 hover:border-b-blue hover:bg-[#faf5f5]"
                >
                  <h3
                    className={`text-black font-medium ${
                      task.completed ? 'line-through' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                </button>
              ))
            )}
          </div>
        </div>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { access_token, refresh_token } = parseCookies(ctx);

  if (!access_token && !refresh_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else if (!access_token && refresh_token) {
    //use the api api service that make the access_token refresh
  }

  return {
    props: {},
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
// Home.auth = true;

export default Home;
