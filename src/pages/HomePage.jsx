import React from 'react'
import HomeMainSection from "../sections/HomeMainSection";
import ReviewSection from "../sections/ReviewSection";
import Footer from "../sections/Footer";
import HeaderSection from "../sections/HeaderSection";

const HomePage = () => {
  return (
    <div>
      <HeaderSection />
      <HomeMainSection />
      <ReviewSection />
      <Footer/>
    </div>
  )
}

export default HomePage