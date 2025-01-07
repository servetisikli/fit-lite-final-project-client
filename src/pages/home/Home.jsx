import React from "react";
import Header from "../../components/header/Header";
import Slider from "../../components/slider/Slider";
import Faq from "../../components/faq/Faq";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import CategoryList from "../../components/categoryList/CategoryList";

const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <CategoryList />
      <Faq />
      <TrustedBy />
    </div>
  );
};

export default Home;
