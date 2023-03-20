import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readStorage, removeKey } from '../utils/localStorage';

import '../styles/NavBar.css';

function NavBar() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = readStorage();

    if (!user.name) navigate('/login');

    setName(user.name)
  },[navigate]);

  const logoutBtn = () => {
    removeKey();
    navigate('/login');
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