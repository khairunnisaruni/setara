import React from 'react'
import NavbarVolunteer from '../../components/NavbarVolunteer'
import HeaderKuis from '../../sections/edukasi_interaktif/HeaderKuisSection'
import MainKuisSection from '../../sections/edukasi_interaktif/MainKuisSection'

const Kuis = () => {
  return (
    <div className='#FAF8F4'>
        <NavbarVolunteer/>
        <HeaderKuis/>
        <MainKuisSection/>
    </div>
  )
}

export default Kuis