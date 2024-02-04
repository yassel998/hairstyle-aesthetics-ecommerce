import { Link } from "react-router-dom";
import Card from "../card/Card";
import "./featuredProducts.scss";
import useFetch from "../../hooks/useFetch";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type}</h1>
        {type === "NOUVEAUTÉS" && (
          <Link to="/newItems" style={{ color: "#717480" }}>
            Toutes les nouveautés
          </Link>
        )}
        {type === "PROMOTIONS" && (
          <Link to="/products/5" style={{ color: "#717480" }}>
            Toutes les promotions
          </Link>
        )}
      </div>
      <div className="bottom">
        {error ? (
          "Something is wrong"
        ) : loading ? (
          "Loading"
        ) : data && data.length > 0 ? (
          <Carousel
            responsive={responsive}
            containerClass="carousel-container"
          >
            {data.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </Carousel>
        ) : (
          "No data available"
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
