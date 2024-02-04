import { Link } from "react-router-dom";
import "./footer.scss";
import ScrollToTop from "react-scroll-to-top";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
const Footer = () => {
  const isMobile = window.innerWidth <= 680;

  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>
            <Link className="link" to="./products/1">
              MATÉRIEL ÉLECTRIQUE
            </Link>
          </span>
          <span>
            <Link className="link" to="./products/2">
              PRODUIT CHEVEUX
            </Link>
          </span>
          <span>
            <Link className="link" to="./products/3">
              HOMMES
            </Link>
          </span>
          <span>
            <Link className="link" to="./products/4">
              MARQUES
            </Link>
          </span>
          <span>
            <Link className="link" to="./products/5">
              PROMOS
            </Link>
          </span>
        </div>
        <div className="item">
          <h1>BESOIN D'AIDE</h1>
          <span>
            <Link className="link" to="./faq">
              FAQ
            </Link>
          </span>
          <span>
            {isMobile ? (
              "Contact"
            ) : (
              <Link className="link" to="./contact">
                Contact
              </Link>
            )}
            <div className="contactInfo">
              <div className="itemContact">
                <FmdGoodIcon style={{ marginRight: "10px" }} />{" "}
                <a href="test">MonInstant 43, Paris</a>
              </div>
              <div className="itemContact">
                <LocalPhoneIcon style={{ marginRight: "10px" }} /> +33 61 23 45
                67 89
              </div>
              <div className="itemContact">
                <EmailIcon style={{ marginRight: "10px" }} />{" "}
                MonInstant@gmail.com{" "}
              </div>
            </div>
          </span>
        </div>
        <div className="item">
          <h1>
            <Link className="link" to="./">
              À PROPOS
            </Link>
          </h1>
          <span>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Mon Instant</span>
          <span className="copyright">© Tous droits réservés</span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
      <ScrollToTop smooth />
    </div>
  );
};

export default Footer;
