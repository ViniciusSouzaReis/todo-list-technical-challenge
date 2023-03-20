import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import Register from '../pages/Register';
import renderWithRouter from './helpers/RenderWithRouter';

jest.mock('axios');

describe('Testando tela de registro', () => {
  const EMAIL_TEST_ID = 'common_register__input-email';
  const NAME_TEST_ID = 'common_register__input-name';
  const PASSWORD_TEST_ID = 'common_register__input-password';
  const REGISTER_BUTTON_TEST_ID = 'common_register__button-register';
  const BACK_BUTTON_TEST_ID = 'common_register__button-back';
  const USER_CREATED_TEST_ID = 'common_register__created-success';
  const USER_NOT_CREATED_TEST_ID = 'common_register__created-conflic';

  beforeEach(() => {
    global.localStorage.removeItem('user');
    jest.clearAllMocks();
  });

  test('Verifica se os elementos da tela de registro são renderizados', async() => {
    const { user } =renderWithRouter(<Register />);

    const emailPlaceholder = screen.getByTestId(EMAIL_TEST_ID);
    const passwordPlaceholder = screen.getByTestId(PASSWORD_TEST_ID);
    const loginButtonPlaceholder = screen.getByTestId(NAME_TEST_ID);
    const registerButtonPlaceholder = screen.getByTestId(REGISTER_BUTTON_TEST_ID);
    const registerButtonBack= screen.getByTestId(BACK_BUTTON_TEST_ID);

    expect(emailPlaceholder).toBeInTheDocument();
    expect(passwordPlaceholder).toBeInTheDocument();
    expect(loginButtonPlaceholder).toBeInTheDocument();
    expect(registerButtonPlaceholder).toBeInTheDocument();
    expect(registerButtonBack).toBeInTheDocument();

    const mockAPI = {
      status: 201,
      data: 'User created!',
    };

    axios.post.mockResolvedValue(mockAPI);

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

    await user.type(emailInput, 'vini@email.com');
    await user.type(passwordInput, '123456');
    await user.click(registerButton);

    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  test('Verifica registro com sucesso como cliente', async () => {
    const mockAPI = {
      status: 201,
      data: 'User created!',
    };

    axios.post.mockResolvedValue(mockAPI);

    const route = '/register'

    const {
      user,
    } = renderWithRouter(<Register />, { route });
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

    await user.type(nameInput, 'xablauzinho junior pires');    
    await user.type(emailInput, 'xublinks@email.com');
    await user.type(passwordInput, '123456');
    await user.click(registerButton);

    const userCreatedInput = screen.getByTestId(USER_CREATED_TEST_ID);

    await waitFor(() => expect(window.location.pathname).toBe('/register'));
    await waitFor(() => expect(userCreatedInput).toBeInTheDocument());
  });

  test('Verifica registro errado do cliente', async () => {
    const mockAPI = {
      status: 409,
      data: 'User already exists',
    };

    axios.post.mockResolvedValue(mockAPI);

    const route = '/register'

    const {
      user,
    } = renderWithRouter(<Register />, { route });
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

    await user.type(nameInput, 'Vinicius Souza');    
    await user.type(emailInput, 'vini@email.com');
    await user.type(passwordInput, '123456');
    await user.click(registerButton);

    const userNotCreated = screen.getByTestId(USER_NOT_CREATED_TEST_ID);

    await waitFor(() => expect(window.location.pathname).toBe('/register'));
    await waitFor(() => expect(userNotCreated).toBeInTheDocument());
  });

  test('Verifica se o bottao Voltar funciona', async() => {
    const { user } =renderWithRouter(<Register />);

    const registerButtonBack= screen.getByTestId(BACK_BUTTON_TEST_ID);

    expect(registerButtonBack).toBeInTheDocument();

    await user.click(registerButtonBack);

    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });
});