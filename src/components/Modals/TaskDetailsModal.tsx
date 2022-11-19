import moment from 'moment';
import React from 'react';
import { taskPriority } from '../../utils/task-priority';
import { ModalContainer } from '../ModalContainer';

interface TaskDetailsModalProps {
  handleOpenTaskDetailsModal: (task?: any) => void;
  handleCompleteTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  task: any;
  titleModal: string;
  descriptionModal?: string;
  isLoading: boolean
}

const TaskDetailsModal = ({
  handleOpenTaskDetailsModal,
  handleCompleteTask,
  handleDeleteTask,
  task,
  titleModal,
  descriptionModal,
  isLoading
}: TaskDetailsModalProps) => {
  return (
    <ModalContainer
      handleOpenModal={() => handleOpenTaskDetailsModal()}
      title={titleModal}
      description={descriptionModal}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-black text-lg font-bold mb-1">Título:</h3>
          <p className="text-text text-md font-light">{task.title}</p>
        </div>
        <div>
          <h3 className="text-black text-lg font-bold mb-1">Descrição:</h3>
          <p className="text-text text-md font-light">
            {task.description ? task.description : 'Não tem'}
          </p>
        </div>
        <div>
          <h3 className="text-black text-lg font-bold mb-1">Criado por:</h3>
          <p className="text-text text-md font-light">{task.author.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full">
            <h3 className="text-black text-lg font-bold mb-1">Começa em:</h3>
            <p className="text-text text-md font-light">
              {moment(task.has_to_start_at).format('DD/MM/YYYY')}
            </p>
          </div>
          <div className="w-full">
            <h3 className="text-black text-lg font-bold mb-1">Encerra em:</h3>
            <p className="text-text text-md font-light">
              {moment(task.has_to_finish_at).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full">
            <h3 className="text-black text-lg font-bold mb-1">
              Nível de urgência:
            </h3>
            <p className="text-text text-md font-light">{taskPriority[task.priority]}</p>
          </div>
          <div className="w-full">
            <h3 className="text-black text-lg font-bold mb-1">Status:</h3>
            <p className="text-text text-md font-light">
              {task.completed ? 'Finalizado' : 'Em andamento'}
            </p>
          </div>
        </div>
        {task.completed ? (
          <>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <h3 className="text-black text-lg font-bold mb-1">
                  Completou no tempo:
                </h3>
                <p className="text-text text-md font-light">
                  {task.completed_in_time ? 'Sim' : 'Não'}
                </p>
              </div>
              <div className="w-full">
                <h3 className="text-black text-lg font-bold mb-1">
                  Encerrado em:
                </h3>
                <p className="text-text text-md font-light">
                  {moment(task.completed_at).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-black text-lg font-bold mb-1">
                Concluído por:
              </h3>
              <p className="text-text text-md font-light">
                {task.completed_by_user
                  ? task.completed_by_user.name
                  : 'A tarefa ainda não foi concluído'}
              </p>
            </div>
          </>
        ) : null}
        <div className="mt-5 flex items-center gap-3">
          <button
            disabled={task.completed ? true : isLoading ? true : false}
            onClick={() => handleCompleteTask(task.id)}
            className={`w-full py-2 rounded-md text-md text-[#fff] font-bold  ${
              task.completed
                ? 'bg-[#CCC]'
                : 'cursor-pointer bg-blue transition duration-300 hover:bg-darkBlue'
            }`}
          >
            {task.completed ? 'Concluído' : 'Concluir'}
          </button>

          <button
          disabled={isLoading}
            onClick={() => handleDeleteTask(task.id)}
            className={`w-full py-2 rounded-md text-md text-[#fff] font-bold cursor-pointer bg-red transition duration-300 hover:bg-darkRed ${isLoading ? 'bg-darkRed cursor-default' : ''}`}
          >
            Excluir
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default TaskDetailsModal;
