import React, { useEffect, useState } from 'react';
import NavbarVolunteer from '../components/NavbarVolunteer';
import HomeMainSection from "../sections/HomeMainSection";
import ReviewSection from "../sections/ReviewSection";
import Footer from "../sections/Footer";
import SuccessPopup from "../components/LoginSuccessPopup";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const success = localStorage.getItem("loginSuccess");

    if (success === "true") {
      setShowPopup(true);
      localStorage.removeItem("loginSuccess"); // supaya popup tidak muncul lagi
    }
  }, []);

  return (
    <div>
      <NavbarVolunteer />
      <HomeMainSection />
      <ReviewSection />
      <Footer />

      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default HomePage;
