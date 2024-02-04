import styles from "./contact.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.heading}>SERVICE CLIENT</div>
          <div className={styles.subheading}>
            Chers clients,
            <br /> Notre service client est à votre disposition pour répondre à
            vos questions <br /> par téléphone ou via le formulaire de contact
            ci-dessous.
            <br /> Nous vous remercions de votre confiance et de votre fidélité.
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.info}>
              <div className={styles.icon}>
                <PhoneIcon />
              </div>
              <div className={styles.text}>+33 6 11 22 33 44</div>
            </div>
            <div className={styles.info}>
              <div className={styles.icon}>
                <EmailIcon />
              </div>
              <div className={styles.text}>moninstant@gmail.com</div>
            </div>
            <div className={styles.info}>
              <div className={styles.icon}>
                <LocationOnIcon />
              </div>
              <div className={styles.text}>23 Rue de la Boulangerie, 75001 Paris, France </div>
            </div>
          </div>
          <div className={styles.right}>
            <form>
              <div className={styles.form}>
                <label htmlFor="">Votre Nom </label>
                <input type="text" />
              </div>
              <div className={styles.form}>
                <label htmlFor="">Votre Email </label>
                <input type="email" />
              </div>
              <div className={styles.form}>
                <label htmlFor="">Votre Message </label>
                <textarea type="text" />
              </div>
              <button>Envoyer</button>
            </form>
          </div>
        </div>
        <div className={styles.map}>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.heading}>Voici Notre Emplacement</div>
              <p>23 Rue de la Boulangerie, 75001 Paris, France</p>
              <a
                href="https://www.google.com/maps/place/Paris,+France/data=!4m2!3m1!1s0x47e66e1f06e2b70f:0x40b82c3688c9460?sa=X&ved=2ahUKEwj-ivKy7e2BAxUfUKQEHXBKAJcQ8gF6BAgKEAA&ved=2ahUKEwj-ivKy7e2BAxUfUKQEHXBKAJcQ8gF6BAgLEAI"
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir dans Google Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
