import React, { useState, useEffect } from 'react';
import { readStorage } from '../utils/localStorage';

import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

function TaskList() {
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [checkList, setCheckList] = useState(true);
  const [tasksExist, setTaskExist] = useState(false);
  const [dispatch, setDispatch] = useState(false);

  const user = readStorage();

  const registerTask = async (event, newData) => {
    event.preventDefault();

    const body = {
      data: newData.newTask,
    }

    const { status } = await httpRequestAxios('post', `http://localhost:3001/register/${user.id}`, body);
    if (httpCodeHandler.conflict(status)) setTaskExist(true);
    if (httpCodeHandler.created(status)) setTaskExist(false);
    setDispatch(!dispatch);
  };

  useEffect(() => {
    async function getTasks(id) {
      const { status, data } = await httpRequestAxios('get', `http://localhost:3001/tasks/${id}`);
      if (httpCodeHandler.success(status)) {
        setList(data);
        setCheckList(false);
      }
      if (httpCodeHandler.notFound(status)) setCheckList(true);
    }
    getTasks(user.id);
  },[user, dispatch]);


  const editBtn = async (target, status) => {
    const getValue = target.previousElementSibling.previousElementSibling.innerHTML;

    const body = {
      data: {
        value: getValue,
        status,
      }
    };

    if(status !== 'Finalizada') {
      await httpRequestAxios('patch', `http://localhost:3001/update/${user.id}`, body);
      setDispatch(!dispatch);
    }
  };

  const deleteBtn = async (target) => {
    const getValue = target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

    await httpRequestAxios('delete', `http://localhost:3001/delete/${user.id}/${getValue}`, {});
    setDispatch(!dispatch);
    setNewTask('');
  };
  
  return (
    <section>
      <form 
        onSubmit={ (event) => registerTask(event, { newTask })}
      >
        <input
          type="text"
          onChange={ ({ target: { value } }) => setNewTask(value) }
          placeholder="Nova tarefa"
        />
        <button
          type="submit"
          disabled={ !(newTask.length > 0) }
        >
          Adicionar Tarefa
        </button>
        {
          (tasksExist) ? (
            <p>A tarefa ja existe!</p>
          ) : null
        }
      </form>
      <h3>LISTA DE TAREFAS: </h3>
        {
          (checkList) ? (
            <p>Adicione novas tarefas</p>
          ) : (
            <ol>
            {list?.map((tasks, index) => (
              <div key={ index }>
                <li>
                  { tasks.task }
                </li>
                <p>{`Status: ${tasks.status}`}</p>
                <button
                  type="button"
                  onClick={ ({ target }) => editBtn(target, tasks.status) }
                >
                  Atualizar Status
                </button>
                <button
                  type="button"
                  onClick={ ({ target }) => deleteBtn(target) }
                >
                  Deletar
                </button>
              </div>
            ))}
            </ol>
          )
        }
    </section>
  );
};

export default TaskList;