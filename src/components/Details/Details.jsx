import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logos from '../../assets/logo-blanco.png';
import previous from '../../assets/previ.png';
import './Details.css';

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFormDetails, setEditedFormDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`);
        const { file, id_formulario, ...rest } = response.data;
        setFormDetails(rest);

        const parsedFiles = Array.isArray(file) ? file : JSON.parse(file || '[]');
        console.log("Archivos obtenidos:", parsedFiles);
        setUploadedFiles(parsedFiles);
      } catch (error) {
        console.error('Error al obtener los datos del formulario:', error);
        alert('Error al obtener los datos del formulario: ' + error.message);
      }
    };
  
    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleEditClick = () => {
    if (window.confirm('¿Estás seguro de que deseas editar?')) {
      setIsEditing(true);
      setEditedFormDetails(formDetails);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (window.confirm('¿Estás seguro de que deseas guardar los cambios?')) {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`, editedFormDetails);
        if (response.status === 200) {
          setFormDetails(editedFormDetails);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Error al guardar los cambios: ' + error.message);
      }
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert('Por favor, selecciona al menos un archivo.');
      return;
    }

    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      formData.append('id_formulario', id);

      try {
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/from/${id}/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          uploaded.push(response.data.file);
        }
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir el archivo: ' + error.message);
      }
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...uploaded]);
    setFiles([]);
  };

  const handleDeleteForm = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar la hoja de vida?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`);
        navigate('/main');
      } catch (error) {
        console.error('Error al eliminar el formulario:', error);
        alert('Error al eliminar el formulario: ' + error.message);
      }
    }
  };

  if (!formDetails) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="details-container">
            <h1 className='h1-sesion'>Inventory.Soft</h1>
      <div className='bnts-from'>
        <Link to='/main'>
          <img className='previ' src={previous} alt="" />
        </Link>
        <p className='vol-from'>Volver</p>
      </div>
      <div className='back'>
        <img className='img-details' src={logos} alt="" />
        <hr />
      </div>
      <div className="details-content">
        {Object.entries(formDetails).map(([key, value]) => (
          <div key={key} className="field">
            <strong>{key.replace('_', ' ')}:</strong>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={editedFormDetails[key] || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{value}</span>
            )}
          </div>
        ))}

        <h2 className='p-details'>Archivos subidos:</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index} className="file-item">
              <a href={`${process.env.REACT_APP_BACKEND_URL.replace('/api/v1', '')}/uploads/${file.path}`} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>

        <form onSubmit={handleFileUpload}>
          <div>
            <label htmlFor="file">Seleccione los archivos: </label>
            <input
              className='file-deta'
              type="file"
              id="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
          </div>
          <div className='button-details'>
            <button className='archi' type="submit">Subir Archivos</button>
            <p>o</p>
            <div>
              {isEditing ? (
                <button className='archi' type="button" onClick={handleSaveChanges}>Guardar</button>
              ) : (
                <button className='archi' type="button" onClick={handleEditClick}>Editar</button>
              )}
              <button className="delete-form" type="button" onClick={handleDeleteForm}><strong>Eliminar Hoja de Vida</strong></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
