
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { api } from '../../service/api/api';
import { Button } from '../Button';

interface TaskForm {
  tasks: any[]
}

const TaskForm = ({ tasks }: TaskForm) => {
  const { mutate } = useSWRConfig();
  const [taskInfo, setTaskInfo] = useState({
    title: '',
    description: '',
    priority: '',
    has_to_start_at: '',
    has_to_finish_at: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (
        !taskInfo.title ||
        !taskInfo.has_to_finish_at ||
        !taskInfo.has_to_start_at
      ) {
        return toast.error(
          'Preencha os campos obrigatórios para prosseguir com o cadastro da tarefa.'
        );
      }
      
      const {data} = await api.post('/api/tasks/create', {
        ...taskInfo,
        author_id: '9cfd74d8-b4bc-4c0d-83ed-53bb4cea9e62',
      });
      if(data.type === 'success') {
        toast.success(data.response)
        tasks.push({
          ...taskInfo,
          author: {
            name: 'Kauã',
          },
          completed: false,
          completed_by_user: null,
          completed_in_time: null,
        });
        mutate('/api/tasks/get', tasks, { revalidate: true });
      }else if(data.type === 'error') {
        toast.error(data.response)
      }
      setTaskInfo({
        title: '',
        description: '',
        priority: '',
        has_to_start_at: '',
        has_to_finish_at: '',
      });
      
    } catch (error) {
      return toast.error(
        'Ocorreu um erro ao cadastra a tarefa, tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateTask} className="flex flex-col gap-3">
      <div>
        <label htmlFor="" className="text-lg font-bold text-black">
          Título
        </label>
        <input
          value={taskInfo.title}
          onChange={(e) =>
            setTaskInfo((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          type="text"
          className="block w-full h-10 border border-text rounded-md"
        />
      </div>
      <div>
        <label htmlFor="" className="text-lg font-bold text-black">
          Descrição
        </label>
        <textarea
        value={taskInfo.description}
          onChange={(e) =>
            setTaskInfo((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          className="block w-full h-32 border border-text rounded-md"
        />
      </div>
      <div>
        <label htmlFor="" className="text-lg font-bold text-black">
          Nível de Urgência
        </label>
        <select
        value={taskInfo.priority}
          name=""
          id=""
          className="block w-full h-10 border border-text rounded-md"
          onChange={(e) =>
            setTaskInfo((prevState) => ({
              ...prevState,
              priority: e.target.value,
            }))
          }
        >
          <option value="" disabled selected>
            Selecione o nível de urgência da tarefa
          </option>
          <option value="sem-urgencia">Sem urgência</option>
          <option value="moderado">Moderado</option>
          <option value="muito-urgente">Muita urgência</option>
          <option value="atrasado">Atrasado</option>
        </select>
      </div>
      <div className="flex items-center sm:flex-row flex-col justify-between gap-3">
        <div className="w-full">
          <label htmlFor="" className="text-lg font-bold text-black">
            Data Início
          </label>
          <input
          value={taskInfo.has_to_start_at}
            onChange={(e) =>
              setTaskInfo((prevState) => ({
                ...prevState,
                has_to_start_at: e.target.value,
              }))
            }
            type="date"
            placeholder="mm-dd-yyyy"
            className="block w-full h-10 border border-text rounded-md"
          />
        </div>
        <div className="w-full">
          <label htmlFor="" className="text-lg font-bold text-black">
            Data Fim
          </label>
          <input
          value={taskInfo.has_to_finish_at}
            onChange={(e) =>
              setTaskInfo((prevState) => ({
                ...prevState,
                has_to_finish_at: e.target.value,
              }))
            }
            type="date"
            placeholder="mm-dd-yyyy"
            className="block w-full h-10 border border-text rounded-md"
          />
        </div>
      </div>
      <Button disabled={isLoading} type="submit" label="Criar tarefa" fullW />
    </form>
  );
};

export { TaskForm };
