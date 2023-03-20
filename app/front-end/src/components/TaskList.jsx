import React, { useState, useEffect } from 'react';
import { readStorage } from '../utils/localStorage';

import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

function TaskList() {
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [checkList, setCheckList] = useState(true);

  const user = readStorage();

  const registerTask = async (event, newData) => {
    event.preventDefault();

    const body = {
      user_id: user.id,
      data: newData.newTask,
    }

    await httpRequestAxios('post', `http://localhost:3001/register/${user.id}`, body);
  };

  useEffect(() => {
    async function getTasks(id) {
      const { status, data } = await httpRequestAxios('get', `http://localhost:3001/tasks/${id}`, {}, { headers: { Authorization: user.token } });
      if (httpCodeHandler.success(status)) {
        setList(data);
        setCheckList(false);
      }
    }
    getTasks(user.id);
  });

  
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
        >
          Adicionar Tarefa
        </button>
      </form>
      <h3>LISTA DE TAREFAS: </h3>
        {
          (checkList) ? (
            <p>Adicione novas tarefas</p>
          ) : (
            <ol>
            {list.map((tasks, index) => (
              <div key={ index }>
                <li>
                  { tasks.task }
                </li>
                <button
                  type="button"
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