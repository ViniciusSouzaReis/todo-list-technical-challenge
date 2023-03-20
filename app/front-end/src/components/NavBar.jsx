import React, { useState, useEffect } from 'react';
import { readStorage, removeKey } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../styles/NavBar.css';

function NavBar() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = readStorage();

    setName(user.name)
  }, []);

  const logoutBtn = () => {
    removeKey();
    navigate('/login')
  }

  return (
    <Navbar className="main-container-header">
      <Container>
        <Navbar.Brand>{name}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button 
              variant="warning"
              type="button"
              onClick={ () => logoutBtn() }
            >
              Sair
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;