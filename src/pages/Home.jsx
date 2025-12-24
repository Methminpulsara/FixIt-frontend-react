// src/pages/Home.jsx
import Hero from '../components/common/Hero';
import Process from '../components/common/Process';
import Services from '../components/common/Services';
import Reviews from '../components/common/Reviews';
import Footer from '../components/common/Footer';
import DynamicPath from '../components/common/DynamicPath';

const Home = () => {
  return (
    <>
      <DynamicPath /> 
      <div className="relative z-10 bg-transparent">
        <Hero />
        <Process />
        <Services />
        <Reviews />
        <Footer />
      </div>
    </>
  );
};

export default Home;