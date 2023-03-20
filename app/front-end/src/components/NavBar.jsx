import React, { useState, useEffect } from 'react';
import { readStorage, removeKey } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

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
    <header>
      <h2>{name}</h2>
      <button 
        type="button"
        onClick={ () => logoutBtn() }
      >
        Sair
      </button>
    </header>
    
  );
};

export default NavBar;