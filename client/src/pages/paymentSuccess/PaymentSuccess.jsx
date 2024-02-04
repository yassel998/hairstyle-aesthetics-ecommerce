import React, { useEffect } from "react";
import "./paymentSuccess.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartReducer";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Reset the cart once the payment is successful and this component is mounted
    dispatch(resetCart());
  }, [dispatch]);

  return (
    <div className="paymentSuccess">
      <h1>Paiement Réussi</h1>
      <p className="message">
        Merci pour votre achat ! Votre paiement a été traité avec succès.
      </p>

      <p className="inquiry">
        En cas de questions ou si vous avez besoin d'assistance, n'hésitez pas à
        contacter notre support à l'adresse &nbsp;
        <a href="mailto:support@gmail.com">support@gmail.com</a>.
      </p>

      <div className="next">
        <h3>Que faire ensuite ?</h3>
        <ul>
          <li>
            Vous recevrez bientôt un email de confirmation avec les détails de
            votre commande.
          </li>
        </ul>
      </div>

      <p className="encouragement">
        Nous espérons que vous êtes satisfait de votre achat. N'oubliez pas de
        consulter nos dernières collections et offres spéciales !
      </p>

      <Link to="/" className="continue">
        Continuer vos achats
      </Link>
    </div>
  );
};

export default PaymentSuccess;
