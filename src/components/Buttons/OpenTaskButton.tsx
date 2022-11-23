import React, { useState } from 'react'
import { taskPriority } from '../../utils/task-priority';

interface OpenTaskButtonProps {
  task: any; 
  handleOpenTaskDetailsModal: (task: any) => void
}

const OpenTaskButton = ({ task, handleOpenTaskDetailsModal }: OpenTaskButtonProps) => {
  let priorityColor = ''
  let priorityColorBg = ''

  if(task.priority === 'sem-urgencia') {
      priorityColor = 'bg-[#7BC86C]'
      priorityColorBg = 'bg-[#D6ECD2]'
  } else if(task.priority === 'moderado') {
    priorityColor = 'bg-[#F5DD29]'
    priorityColorBg = 'bg-[#FAF3C0]'
  }else if(task.priority === 'muito-urgente') {
    priorityColor = 'bg-[#FFAF3F]'
      priorityColorBg = 'bg-[#FCE6C6]'
  }else if(task.priority === 'atrasado') {
    priorityColor = 'bg-[#EF7564]'
    priorityColorBg = 'bg-[#F5D3CE]'
  }
  return (
    <button       
      onClick={() => handleOpenTaskDetailsModal(task)}
      className="border-b-[3px] border-b-[#ccc] bg-[#faf5f5] rounded-md transition duration-300 hover:border-b-blue "
    >
      <div className="text-left  px-5 py-3">
        <div className="mb-2 inline-block ">
          <div className={`${priorityColorBg} rounded-md py-1 px-2 text-center text-sm font-medium text-black flex items-center gap-1`}>
            <div className={`w-3 h-3 rounded-full ${priorityColor}`} />
            {taskPriority[task.priority]}
          </div>
        </div>
        <h3
          className={` text-black font-medium ${
            task.completed ? 'line-through' : ''
          }`}
        >
          {task.title}
        </h3>  
      </div>
      
    </button>
  )
}

export { OpenTaskButton }