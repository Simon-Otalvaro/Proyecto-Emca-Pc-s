import React from 'react'
import './Footer.css'
import logo_b from '../../assets/logo-blanco.png'
import whatsapp from '../../assets/whatsapp.png'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'

export const Footer = () => {
  return (
    <div className='Footer'>
        <div className='footer'>
        <img className='img-f' src={logo_b} alt="logo" />
      <div className='direction'>
        <p>Dirección: Carrera 24 No. 39-54, Calarcá, Quindío</p>
        <br />
        <p>Direccion: Carrera 16 No. 44-210 barrio los Tanques, Calarcá</p>
        <br />
        <p>Email: contactenos@emca-calarca-quindio.gov.co</p>
      </div>

      <div className='icons'>
        <img className='icon' src={whatsapp} alt="whatsapp" />
        <img className='icon' src={facebook} alt="facebook" />
        <img className='icon' src={instagram} alt="instagram" />
      </div>
          </div> 

    </div>
  )
}
