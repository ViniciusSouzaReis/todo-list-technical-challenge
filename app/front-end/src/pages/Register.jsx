import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

import '../styles/Register.css';

const NAME_MINIMAL_LENGTH = 10;
const PASSWORD_MINIMAL_LENGTH = 6;

function Register() {
  const [invalidUser, setInvalidUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function nameHandler(inputName) {
    return inputName.length >= NAME_MINIMAL_LENGTH;
  }

  function emailHandler(inputemail) {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(inputemail);
  }

  function passwordHandler(inputPassowrd) {
    return inputPassowrd.length >= PASSWORD_MINIMAL_LENGTH;
  }

  const verifyName = nameHandler(name);
  const verifyemail = emailHandler(email);
  const verifyPassword = passwordHandler(password);

  const registerDBUser = async (event, userData) => {
    event.preventDefault();

    const { status } = await httpRequestAxios('post', 'http://localhost:3001/register', userData);

    if (httpCodeHandler.conflict(status)) {
      setInvalidUser(true)
      setUserCreated(false)
    }
    if (httpCodeHandler.created(status)) {
      setInvalidUser(false);
      setUserCreated(true);
    }
  };

  return (
    <section className='main-container-register'>
      <Form
        onSubmit={ (event) => registerDBUser(event, { name, email, password }) }
      >
        <h1>CADASTRAR</h1>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Nome Completo"
            name="name"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="email@email.com"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Minimo 6 caracteres"
          />
        </Form.Group>
        <div className='buttons-container-register'>
          <Button
            type="submit"
            variant="success"
            data-testid="common_register__button-register"
            disabled={ !(verifyemail && verifyName && verifyPassword) }
          >
            Registrar
          </Button>
          <Button
            type="button"
            variant="secondary"
            data-testid="common_register__button-back"
            onClick={ () => navigate('/login') }
          >
            Voltar
          </Button>
        </div>
        <br></br>
        {
          (invalidUser)
            ? (
              <Form.Text
                className="text-muted"
                data-testid="common_register__created-conflic"
              >
                {
                  `Usuario ja cadatrado. Tente um novo e-mail.`
                }
              </Form.Text>
            )
            : null
          }
          {
          (userCreated)
            ? (
              <Form.Text 
                className="text-muted"
                data-testid="common_register__created-success"
              >
                {
                  `Usuario registrado!`
                }
              </Form.Text>
            )
            : null
          }
      </Form>
    </section>
  );
};

export default Register;