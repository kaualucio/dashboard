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
import { StatisticSingle } from '../src/components/StatisticSingle';
import GridContainer from '../src/components/GridContainer';
import { SITE_NAME } from '../src/constants';
import { OpenTaskButton } from '../src/components/Buttons/OpenTaskButton';
import toast from 'react-hot-toast';

const Home = () => {
  const [openCreateTodoModal, setOpenCreateTodoModal] = useState(false);
  const [openDetailsTodoModal, setOpenDetailsTodoModal] = useState(false);
  const [task, setTask] = useState<any>(null);
  const { data: tasks, isValidating, mutate } = useFetch('/api/tasks/get');
  const [isLoading, setIsLoading] = useState(false);

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

    const updatedTasks = tasks?.map((task: any) => {
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

  async function handleDeleteTask(taskId: string) {
    setIsLoading(true)
    const { data } = await api.post(`/api/tasks/delete/${taskId}`);
    if(data.type === 'success') {
      toast.success(data.response)
      const updatedTasks = tasks?.filter((task: any) => task.id !== taskId);
      handleOpenTaskDetailsModal();
      mutate(updatedTasks, false);
    }else if(data.type === 'error') {
      toast.error(data.response)
    }
    setIsLoading(false)
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
          <TaskForm tasks={tasks} />
        </ModalContainer>
      ) : openDetailsTodoModal ? (
        <TaskDetailsModal
          task={task}
          isLoading={isLoading}
          handleDeleteTask={handleDeleteTask}
          handleCompleteTask={handleCompleteTask}
          handleOpenTaskDetailsModal={handleOpenTaskDetailsModal}
          titleModal={'Detalhes da tarefa'}
        />
      ) : null}

      <Title title="Dashboard" size="xl" />
      <div className={`mt-10 grid grid-cols-6 grid-rows-8 gap-6`}>
        <div
          className={`col-span-6  row-span-1 ${styles.metric} grid grid-cols-3 gap-5`}
        >
          <StatisticSingle title="Artigos" value="20" label="Total artigos" />

          <StatisticSingle title="Visitas" value="150" label="Total de visitas" />

          <StatisticSingle title="Projetos" value="200" label="Total de projetos" />
        </div>
        <GridContainer gridClass="h-96 col-span-6 lg:col-span-3 xl:col-span-4 row-span-2"></GridContainer>
        <GridContainer gridClass="col-span-6 lg:col-span-3 xl:col-span-2 row-span-4">
          <>
            <div className="flex items-center justify-between p-3">
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
            <div className="mt-7 flex flex-col gap-2 overflow-y-auto lg:min-h-auto">
              {(!tasks && isValidating) || (!tasks && !isValidating) ? (
                <Loading />
              ) : tasks.length === 0 ? (
                <p className="text-text font-sm text-center font-medium">Nenhuma tarefa pendente</p>
              ) : (
                tasks.map((task: any) => (
                  <OpenTaskButton 
                    key={task.id} 
                    task={task}
                    handleOpenTaskDetailsModal={handleOpenTaskDetailsModal}
                  />
                ))
              )}
            </div>
          </>
        </GridContainer>
        <GridContainer gridClass=" h-96 col-span-6 md:col-span-3 xl:col-span-2 row-span-2"></GridContainer>
        {/* <GridContainer gridClass=" h-96 col-span-6 md:col-span-3 xl:col-span-2 row-span-2"></GridContainer> */}
        <GridContainer gridClass=" h-96 col-span-6 md:col-span-3 xl:col-span-2 row-span-2"></GridContainer>
        <GridContainer gridClass=" h-96 col-span-6 md:col-span-3 row-span-2"></GridContainer>
        <GridContainer gridClass=" h-96 col-span-6 md:col-span-3 row-span-2"></GridContainer>
        <GridContainer gridClass=" h-96 col-span-6"></GridContainer>
      </div>
    </section>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
// Home.auth = true;

export default Home;
