import { useState } from "react";
import "./product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img1");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  //desc
  const [showMore, setShowMore] = useState(false);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              {["img1", "img2", "img3", "img4"].map((imageKey, index) => {
                const imageUrl =
                  data?.attributes[imageKey]?.data?.attributes?.url;
                //data?.attributes checks if the data object has an attributes property
                if (imageUrl) {
                  return (
                    <img
                      key={index}
                      src={process.env.REACT_APP_UPLOAD_URL + imageUrl}
                      alt=""
                      onClick={(e) => setSelectedImg(imageKey)}
                    />
                  );
                }

                return null;
              })}
            </div>

            <div className="mainImg">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes[selectedImg]?.data?.attributes?.url
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h3>{data?.attributes?.brand}</h3>
            <h1>{data?.attributes?.title}</h1>
            <span className="prices">
              {data?.attributes.isPromo ? (
                <>
                  <h2 className="oldPrice">{data?.attributes.oldPrice} €</h2>
                  <h2 className="promoPrice">{data?.attributes.price} €</h2>
                </>
              ) : (
                <h2 className="regularPrice">{data?.attributes.price} €</h2>
              )}
            </span>
            {data?.attributes?.desc.length > 100 ? (
              <div>
                {showMore
                  ? data?.attributes?.desc
                  : `${data?.attributes?.desc.slice(0, 210)}...`}
                <span onClick={toggleDescription} className="showText">
                  {showMore ? "Voir moins" : "Voir plus"}
                </span>
              </div>
            ) : (
              <p>{data?.attributes?.desc}</p>
            )}

            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                {/* if the prev is 1 don't go to -1 */}-
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            {!data?.attributes.inStock ? (
              <button className="add" disabled>
                <AddShoppingCartIcon /> PRODUIT ÉPUISÉ
              </button>
            ) : (
              <button
                className="add"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.attributes.title,
                      desc: data.attributes.desc,
                      price: data.attributes.price,
                      img: data.attributes.img1.data.attributes.url,
                      quantity,
                    })
                  )
                }
              >
                <AddShoppingCartIcon /> AJOUTER AU PANIER
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
