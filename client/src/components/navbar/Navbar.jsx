import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "../search/SearchBox";

const Navbar = () => {
  //open the cart
  const [open, setOpen] = useState(false);

  //open the extended navbar
  const [extendeNavbar, setExtendeNavbar] = useState(false);

  const products = useSelector((state) => state.cart.products);

  //search
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  // close the extended navbar when a user clicks on a link
  const handleLinkClick = () => {
    if (window.innerWidth <= 680) {
      setExtendeNavbar(false);
    }
  };
  return (
    <div className={`navbar ${extendeNavbar ? "extendedNav" : ""}`}>
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className="link" to="./products/1">
              MATÉRIEL ÉLECTRIQUE
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="./products/2">
              PRODUIT CHEVEUX
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="./products/3">
              HOMMES
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="./products/4">
              MARQUES
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="./products/5">
              PROMOS
            </Link>
          </div>
        </div>

        <div className="openLinksButton">
          {extendeNavbar ? (
            <CloseIcon
              fontSize="large"
              onClick={() => setExtendeNavbar(!extendeNavbar)}
            />
          ) : (
            <MenuIcon
              fontSize="large"
              onClick={() => setExtendeNavbar(!extendeNavbar)}
            />
          )}
        </div>

        <div className="center">
          <Link className="link" to={"./"}>
            MON INSTANT
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to={"./"}>
              Page d'accueil
            </Link>
          </div>
          <div className="item">
            <Link className="link" to={"./contact"}>
              Contactez-nous
            </Link>
          </div>
          <div className="item">
            <Link className="link" to={"./faq"}>
              FAQ
            </Link>
          </div>
          <div className="item">
            <Link className="link">À propos</Link>
          </div>

          <div className="icons">
            <SearchIcon className="search" onClick={handleSearchOpen} />
            <SearchBox open={searchOpen} onClose={handleSearchClose} />

            <div className="cartIcon">
              {/* if it's true, it's gonna be false - if it's false it's gonna be true */}
              <ShoppingCartOutlinedIcon
                className="
              shoppingCartOutlinedIcon"
                onClick={() => setOpen(!open)}
              />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>

      {extendeNavbar && (
        <div className="extendedNav">
          <div>
            <Link className="link" to="./products/1" onClick={handleLinkClick}>
              MATÉRIEL ÉLECTRIQUE
            </Link>
          </div>
          <div>
            <Link className="link" to="./products/2" onClick={handleLinkClick}>
              PRODUIT CHEVEUX
            </Link>
          </div>
          <div>
            <Link className="link" to="./products/3" onClick={handleLinkClick}>
              HOMMES
            </Link>
          </div>
          <div>
            <Link className="link" to="./products/4" onClick={handleLinkClick}>
              MARQUES
            </Link>
          </div>
          <div>
            <Link className="link" to="./products/5" onClick={handleLinkClick}>
              PROMOS
            </Link>
          </div>
        </div>
      )}
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
