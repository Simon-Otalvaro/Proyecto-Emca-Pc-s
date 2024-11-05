import React from 'react'
import { Nav } from '../Nav/Nav'
import { Footer } from '../Footer/Footer'

import './Home.css'
import { View } from '../View/View'

export const Home = () => {
  return (
    <div className='home'>
      <div className='home-1'>

      <Nav></Nav>
      <View></View>
      <Footer></Footer>
      </div>
    </div>
  )
}
