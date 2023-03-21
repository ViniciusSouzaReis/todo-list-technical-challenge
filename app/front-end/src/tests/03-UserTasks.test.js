import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';

jest.mock('axios');

describe('Testando tela de tarefas', () => {
  const NAME_TEST_ID = 'todo_element-navbar-link-name';
  const EXIT_BUTTON_TEST_ID = 'todo_element-navbar-exit-button';
  const NEW_TEXT_TEST_ID = 'common_text__new-task-input-text';
  const ADD_TASK_BUTTON_TEST_ID = 'common_add__button-add';
  const EMAIL_TEST_ID = 'common_login__input-email';
  const PASSWORD_TEST_ID = 'common_login__input-password';
  const LOGIN_BUTTON_TEST_ID = 'common_login__button-login';

  test('Verifica se os elementos são renderizados na tela de tarefas', async () => {
    const mockAPI = {
      status: 200,
      data: {
        id: 1,
        name: 'Vinicius Souza',
        email: 'vini@email.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmluaWNpdXMgU291emEiLCJpYXQiOjE2NzkzMzk5MjEsImV4cCI6MTY3OTk0NDcyMX0.85OZS2G9sIk-hy--bnDaOaG1mer8IU0S8EBfGF-dCM8',
      },
    };

    const mockTasks = [{
      task: 'Fazer trabalho de casa',
      status: 'A fazer',
    }];

    axios.post.mockResolvedValue(mockAPI);
    axios.get.mockResolvedValue({ data: mockTasks });

    const route = '/Vinicius%20Souza/tasks'

    const { user } =renderWithRouter(<App />, { route });

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    await user.type(emailInput, 'vini@email.com');
    await user.type(passwordInput, '123456');
    await user.click(loginButton);

    const nameNavBar = screen.getByTestId(NAME_TEST_ID);
    const exitButton = screen.getByTestId(EXIT_BUTTON_TEST_ID);
    const newTaskInput = screen.getByTestId(NEW_TEXT_TEST_ID);
    const addTasksButtonInput = screen.getByTestId(ADD_TASK_BUTTON_TEST_ID);

    await waitFor(() => expect(nameNavBar).toBeInTheDocument());
    await waitFor(() => expect(exitButton).toBeInTheDocument());
    await waitFor(() => expect(newTaskInput).toBeInTheDocument());
    await waitFor(() => expect(addTasksButtonInput).toBeInTheDocument());
  });
});