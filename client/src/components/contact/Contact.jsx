import React from 'react';
import styles from './contact.module.scss'; 
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.wrapper}>
        <span>Soyez en contact avec nous:</span>
        <div className={styles.mail}>
          <input type="text" placeholder="Saisissez votre adresse e-mail" />
          <button>REJOIGNEZ-NOUS</button>
        </div>
        <div className={styles.icons}>
          <FacebookIcon className={styles.fb} fontSize="large" />
          <InstagramIcon className={styles.ig} fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
