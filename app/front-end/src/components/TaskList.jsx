import React, { useState, useEffect } from 'react';
import { readStorage } from '../utils/localStorage';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

import '../styles/TaskList.css';

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
    };

    const { status } = await httpRequestAxios('post', `http://localhost:3001/register/${user.id}`, body, { headers: { Authorization: user.token } });
    if (httpCodeHandler.conflict(status)) setTaskExist(true);
    if (httpCodeHandler.created(status)) setTaskExist(false);
    setDispatch(!dispatch);
    setNewTask('');
  };

  useEffect(() => {
    async function getTasks(id) {
      const { status, data } = await httpRequestAxios('get', `http://localhost:3001/tasks/${id}`, { headers: { Authorization: user.token } });
      if (httpCodeHandler.success(status)) {
        setList(data);
        setCheckList(true);
        if (list.some((task) => task.status === 'A fazer' || task.status === 'Em progresso')) {
          setCheckList(false);
        }
      }
      if (httpCodeHandler.notFound(status)) setCheckList(true);
    }
    getTasks(user.id);
  },[user, dispatch, list]);


  const editBtn = async (target, status) => {
    const getValue = target.previousElementSibling.previousElementSibling.innerHTML;

    const body = {
      data: {
        value: getValue,
        status,
      }
    };

    if(status !== 'Finalizada') {
      await httpRequestAxios('patch', `http://localhost:3001/update/${user.id}`, body, { headers: { Authorization: user.token } });
      setDispatch(!dispatch);
    }
  };

  const deleteBtn = async (target) => {
    const getValue = target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

    await httpRequestAxios('delete', `http://localhost:3001/delete/${user.id}/${getValue}`, { headers: { Authorization: user.token } });
    setDispatch(!dispatch);
  };
  
  return (
    <section className='main-container-tasks'>
      <Form 
        onSubmit={ (event) => registerTask(event, { newTask })}
      >
        <Form.Group className="mb-3 form-add-task">
          <h3>NOVA TAREFA</h3>
          <Form.Control
            type="text"
            data-testid="common_text__new-task-input-text"
            value={ newTask }
            onChange={ ({ target: { value } }) => setNewTask(value) }
            placeholder="Digite uma nova tarefa" />
        </Form.Group>
        <div className='buttom-container'>
          {
            (tasksExist) ? (
              <Form.Text className="text-muted">A tarefa ja existe!</Form.Text>
            ) : null
          }
          <Button
            type="submit"
            disabled={ !(newTask.length > 0) }
            data-testid="common_add__button-add"
            className="add-task-btn"
          >
            Adicionar Tarefa
          </Button>
        </div>
      </Form>
      <h3>LISTA DE TAREFAS: </h3>
        {
          (checkList) ? (
            <Form.Text className="text-muted">Adicione novas tarefas</Form.Text>
          ) : (
            <ListGroup>
              {list?.map((tasks, index) => (
                <div key={ index }>
                  {
                    (tasks.status !== "Finalizada") ? (
                      <ListGroup.Item>
                        <p>
                          { tasks.task }
                        </p>
                        <p style={{color: 'purple' }}>{`Status: ${tasks.status}`}</p>
                        <Button
                          type="button"
                          variant="info"
                          onClick={ ({ target }) => editBtn(target, tasks.status) }
                        >
                          Atualizar Status
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={ ({ target }) => deleteBtn(target) }
                        >
                          Deletar
                        </Button>
                      </ListGroup.Item>
                    ) : null
                  }
                </div>
              ))}
            </ListGroup>
          )
        }
      <br></br>
      <br></br>
      <h3>LISTA DE TAREFAS FINALIZADAS: </h3>
        {
          <ListGroup variant="flush">
          {list?.map((tasks, index) => (
            <div key={ index }>
              {
                (tasks.status === "Finalizada") ? (
                  <ListGroup.Item disabled>
                    { tasks.task }
                  </ListGroup.Item>
                ) : null
              }
            </div>
          ))}
          </ListGroup>
        }
    </section>
  );
};

export default TaskList;