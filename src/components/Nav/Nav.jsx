import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo-blanco.png'
import './Nav.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { useUser } from '../../context/UserContext';

export const Nav = () => {
  // const { user } = useUser();
//   const {id}= useParams();
//   const [userNav, setUserNav] = useState(null)
  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try{
//       const responses = await axios.get()`http://localhost:3000/api/v1/user/${id}`;
//       setUserNav(responses.data)
//     } catch (error) {
//       console.error('Error al obtener los datos del usuario:', error);
//       alert('Error al obtener los datos del usuario: ' + error.message);
//     }
// };
//   fetchUserData();
// }, [id])

  return (
    <div className='nav'>
      <div className='navber'>

      <div>
        <img className='logo' src={logo} alt="" />
      </div>
      <div className='name'>
{/* <p><strong>{userNav.nombre}</strong></p>
<p><strong>{userNav.apellido}</strong></p> */}
      </div>
    </div>
      </div>
  )
}
