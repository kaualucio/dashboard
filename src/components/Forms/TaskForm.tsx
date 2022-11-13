import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Button } from '../Button';

const TaskForm = () => {
  const { mutate } = useSWRConfig();
  const [taskInfo, setTaskInfo] = useState({
    title: '',
    description: '',
    priority: '',
    has_to_start_at: '',
    has_to_finish_at: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    try {
      setIsDisabled(true);
      if (
        !taskInfo.title ||
        !taskInfo.has_to_finish_at ||
        !taskInfo.has_to_start_at
      ) {
        return toast.error(
          'Preencha os campos obrigatórios para prosseguir com o cadastro da tarefa.'
        );
      }

      const result = await axios.post('/api/tasks/create', {
        ...taskInfo,
        author_id: '9cfd74d8-b4bc-4c0d-83ed-53bb4cea9e62',
      });
      setTaskInfo({
        title: '',
        description: '',
        priority: '',
        has_to_start_at: '',
        has_to_finish_at: '',
      });
      mutate('/api/tasks/get', { revalidate: true });
      if (result.data.type === 'success') {
        toast.success(result.data.message);
      } else if (result.data.type === 'error') {
        toast.error(result.data.message);
      }
    } catch (error) {
      return toast.error(
        'Ocorreu um erro ao cadastra a tarefa, tente novamente.'
      );
    } finally {
      setIsDisabled(false);
    }
  }

  // console.log(taskInfo);
  return (
    <form onSubmit={handleCreateTask} className="flex flex-col gap-3">
      <div>
        <label htmlFor="" className="text-lg font-bold text-black">
          Título
        </label>
        <input
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
      <Button disabled={isDisabled} type="submit" label="Criar tarefa" fullW />
    </form>
  );
};

export { TaskForm };
