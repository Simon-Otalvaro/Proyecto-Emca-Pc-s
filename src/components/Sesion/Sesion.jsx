// src/components/Sesion.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Sesion.css';
import log from '../../assets/logo-blanco.png'
import axios from 'axios';
// import { useUser } from '../../context/UserContext';

export const Sesion = () => {
  // const { setUser } = useUser();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Instancia de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!correo || !contraseña) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (!correo.includes('@gmail.com')) {
      setMessage('Por favor, ingrese un correo válido que contenga "@gmail.com"');
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        correo,
        contraseña,
      });
      
      if (response.status === 201) {
        setMessage('Inicio de sesión exitoso');
        console.log('Redirigiendo a /home');
        // setUser(response.data.user);  
        console.log(response); // Verifica que obtienes una respuesta exitosa
        navigate('/home-152628282828'); // Redirige inmediatamente al home
      } else {
        setMessage(response.data.message); // Mensaje de error del backend
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al iniciar sesión.');
      }
    }
  };
  

  return (
    <div className='session'>
      <form onSubmit={handleSubmit}>
        <h1 className='h1-sesion'>Inventory.Soft</h1>
        <div className='logo-sesion'>

        <img className='log' src={log} alt="" />
        </div>
        <div className='cp'>
          <div className='return'>
            {/* Enlace para regresar, descomentarlo si es necesario */}
          </div>
          <div className='email'>
            <p className='ep'>Correo</p>
            <input 
              className='input'
              type="text"
              placeholder='example@gmail.com'
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className='password'>
            <p className='ep'>Contraseña</p>
            <input
              className='input'
              type="password" // Cambiado a tipo "password" para ocultar la entrada
              placeholder='*********'
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <div className='class'>
            <Link to='/register'>
              <button className='ci' type="button">Crear Cuenta</button>
            </Link>
            <div className='space'></div>
            <button className='ci' type="submit">Iniciar Sesión</button>
          </div>
          <div className='sp'></div>
        </div>
        {message && <p className="message">{message}</p>} {/* Mostrar mensajes al usuario */}
      </form>
    </div>
  );
};
