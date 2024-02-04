import { Link } from "react-router-dom";
import "./card.scss";

const Card = ({ item }) => {
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className={`card ${item?.attributes.inStock ? "" : "out-of-stock"}`}>
        <div className="image">
          {item?.attributes.isNew && item?.attributes.inStock ? (
            <span>Nouveau</span>
          ) : item?.attributes.isPromo && item?.attributes.inStock ? (
            <span style={{ color: "red" }}>Promotion</span>
          ) : !item?.attributes.inStock ? (
            <span style={{ color: "blue" }}>Bientôt</span>
          ) : null}

          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes?.img1?.data?.attributes.url
            }
            alt=""
            className="img"
          />
        </div>
        <div className="stock">{item.inStock}</div>
        <h2>{item?.attributes.brand}</h2>
        <h3>{item?.attributes.title}</h3>
        <div className="pricesCard">
          {item?.attributes.isPromo ? (
            <>
              <h2 className="oldPrice">{item?.attributes.oldPrice} €</h2>
              <h2 className="promoPrice">{item?.attributes.price} €</h2>
            </>
          ) : (
            <h2 className="regularPrice">{item?.attributes.price} €</h2>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
