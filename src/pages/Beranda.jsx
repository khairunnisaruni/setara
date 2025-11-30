import React from 'react'
import NavbarVolunteer from '../components/NavbarVolunteer';
import HomeMainSection from "../sections/HomeMainSection";
import ReviewSection from "../sections/ReviewSection";
import Footer from "../sections/Footer";

const HomePage = () => {
  return (
    <div>
      <NavbarVolunteer/>
      <HomeMainSection />
      <ReviewSection />
      <Footer/>
    </div>
  )
}

export default HomePage