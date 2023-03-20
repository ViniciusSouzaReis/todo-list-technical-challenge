import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';

jest.mock('axios');

describe('Testando tela de login', () => {
  const EMAIL_TEST_ID = 'common_login__input-email';
  const PASSWORD_TEST_ID = 'common_login__input-password';
  const LOGIN_BUTTON_TEST_ID = 'common_login__button-login';
  const REGISTER_BUTTON_TEST_ID = 'common_login__button-register';

  beforeEach(() => {
    global.localStorage.removeItem('user');
    jest.clearAllMocks();
  });

  test('Verifica se os elementos da tela de login são renderizados', () => {
    renderWithRouter(<App />);

    const emailPlaceholder = screen.getByTestId(EMAIL_TEST_ID);
    const passwordPlaceholder = screen.getByTestId(PASSWORD_TEST_ID);
    const loginButtonPlaceholder = screen.getByTestId(LOGIN_BUTTON_TEST_ID);
    const registerButtonPlaceholder = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

    expect(emailPlaceholder).toBeInTheDocument();
    expect(passwordPlaceholder).toBeInTheDocument();
    expect(loginButtonPlaceholder).toBeInTheDocument();
    expect(registerButtonPlaceholder).toBeInTheDocument();
  });

  test('Verifica login com sucesso como cliente', async () => {
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
      user_id: 1,
      task: 'Fazer trabalho de casa',
      status: 'A fazer',
    }];

    axios.post.mockResolvedValue(mockAPI);
    axios.get.mockResolvedValue({ data: mockTasks });

    const {
      user,
    } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    await user.type(emailInput, 'vini@email.com');
    await user.type(passwordInput, '123456');
    await user.click(loginButton);

    await waitFor(() => expect(window.location.pathname).toBe('/Vinicius%20Souza/tasks'));
  });
});