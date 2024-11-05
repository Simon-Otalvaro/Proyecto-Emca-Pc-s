import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer'
import previous from '../../assets/previ.png'
import axios from 'axios';
import './Main.css';
import { Nav } from '../Nav/Nav'

export const Main = () => {
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/from`);
        setForms(response.data);
      } catch (error) {
        console.error('Error al obtener los formularios:', error);
      }
    };

    fetchForms();
  }, []);

  // Filtra los formularios en base al término de búsqueda
  const filteredForms = forms.filter(form =>
    form.nombre_pc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
   <Nav></Nav>
   <div className='back-main'>

   <Link to='/home-152628282828'>
        <img className='previ' src={previous} alt="" />
      </Link> 
      <p className='back-v'><strong>Volver</strong></p>
   </div>

      <h1>Lista de Formularios</h1>
      
   <div className='filter'>
    <p className='fil'><strong> Filtro :</strong></p>
      <input 
        type="text"
        placeholder="Buscar por nombre de PC"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
   </div>

      <div className="card-container">
        {filteredForms.map(form => (
          <div key={form.id_formulario} className="card">
            <h3>{form.nombre_pc}</h3>
            <Link to={`/details/${form.id_formulario}`}>
              <button className="view-button">Ver más</button>
            </Link>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};
