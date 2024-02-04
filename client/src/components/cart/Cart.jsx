import "./cart.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2); //only two numbers after .
  };

  const stripePromise = loadStripe(
    "pk_test_51Nx5JoHqXxf4cUZOcTqOFb3zgLGC14MyjO6wqb691JcTS5GGtXrJmia1DmYuKAfFKmGct2e9UUwdl2TaLajBeIIG00AZJCcwok"
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cart">
      <h1>PRODUITS DANS VOTRE PANIER</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.brand}</h1>
            <p>{item.title.substring(0, 50)}</p>
            <div className="price">
              {item.quantity} x {item.price} €
            </div>
          </div>
          <DeleteOutlineIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))} //sent item.id payload
          />
        </div>
      ))}
      <div className="total">
        <span>TOTAL</span>
        <span>{totalPrice()} €</span>
      </div>
      <button onClick={handlePayment}>PASSER MA COMMANDE</button>
      <div className="reset" onClick={() => dispatch(resetCart())}>
        Réinitialiser
      </div>
    </div>
  );
};

export default Cart;
