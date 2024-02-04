import Contact from "../../components/contact/Contact";
import FeaturedProducts from "../../components/featuredProducts/FeaturedProducts";
import Slider from "../../components/slider/Slider";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts type="NOUVEAUTÉS" />
      <FeaturedProducts type="PROMOTIONS" />
      <Contact />
    </div>
  );
};

export default Home;
