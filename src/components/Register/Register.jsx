// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate, Link } from 'react-router-dom';
import { useFromContext } from '../../context/FromContext';

export const Register = () => {
  const navigate = useNavigate();
  const { addUsers } = useFromContext();
  const [nombre, setName] = useState('');
  const [apellido, setSurname] = useState('');
  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');
  const [codigo, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !correo || !contraseña || !codigo) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!correo.includes('@gmail.com')) {
      setMessage('Por favor, ingrese un correo válido que contenga "@gmail.com"');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        nombre,
        apellido,
        correo,
        contraseña,
        codigo,
      }, { withCredentials: true });

      if (response.status === 201) {
        addUsers({ nombre, apellido });
        navigate('/');
      }

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrar el usuario.');
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1 className="h1-sesion">Crear Cuenta</h1>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" value={nombre} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input id="apellido" type="text" value={apellido} onChange={(e) => setSurname(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input id="correo" type="email" value={correo} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input id="contraseña" type="password" value={contraseña} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="codigo">Código</label>
          <input id="codigo" type="text" value={codigo} onChange={(e) => setCode(e.target.value)} />
        </div>

        <div className="btn-group">
          <button className="btns-creation" type="submit">Crear Cuenta</button>
          <Link to="/">
            <button className="btns-creation" type="button">Volver</button>
          </Link>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};
