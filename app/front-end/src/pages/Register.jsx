import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

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

    if (httpCodeHandler.conflict(status)) setInvalidUser(true);
    if (httpCodeHandler.created(status)) {
      setInvalidUser(false);
      setUserCreated(true);
    }
  };

  return (
    <section>
      <Form
        onSubmit={ (event) => registerDBUser(event, { name, email, password }) }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Nome Completo"
            name="name"
            id="name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="email@email.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
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
        <Button
          type="submit"
          variant="success"
          disabled={ !(verifyemail && verifyName && verifyPassword) }
        >
          Registrar
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={ () => navigate('/login') }
        >
          Voltar
        </Button>
        <br></br>
        {
          (invalidUser)
            ? (
              <Form.Text className="text-muted">
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
              <Form.Text className="text-muted">
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