import "./faq.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Faq = () => {
  const data = [
    {
      question: "Mes moyens de paiements",
      answer:
        "Paiement assuré par Stripe, s'appuyant sur les dernières normes de sécurité. Vos données bancaires circuleront sous formes cryptées afin de les rendre illisibles. Elles seront directement enregistrées sur le serveur de paiement sécurisé de notre banque et ne seront jamais en possession de Mon Instant. Cela exclu les possibilités de fraude et de piratage de notre site marchand moninstant.com. ",
    },
    {
      question: "Retourner ou échanger un produit",
      answer: `Vous avez changé d'avis.

    Notre équipe se réserve le droit de refuser le retour dans les cas suivants:
    
    > Le produit a été volontairement endommagé ou il a été utilisé dans une pratique inadaptée
    
    > Le produit est sale ou personnalisé et ne peut être revendu dans l'état.
    
    RETOUR EN MAGASIN :
    
    Nous vous confirmons que vous pouvez pour tous les produits achetés* sur notre site vous rendre pour un ECHANGE ou un AVOIR dans notre magasin.
    
    *Les accessoires cheveux, peignes, brosses, ciseaux, maquillage et vernis ne seront ni repris, ni échangés.
    
    Pour connaitre la localisation de notre magasin rendez vous :  https://www.moninstant.com/magasin
    
    Etape 1 : Je me rends en magasin avec le produit et la facture
    
    Etape 2 : J'échange mon article ou je me fais un AVOIR valable en magasin.`,
    },
    {
      question: "Trouver notre magasin",
      answer: "www.moninstant.com/localisation",
    },
    {
      question: "Politique de retour et d'échange",
      answer:
        "Pour les achats en magasin vous disposez d’un délai de quinze (15) jours à compter de la date d’achat et sur présentation du ticket de caisse pour demander un échange ou un avoir. Le fait pour l’acheteur d’acheter au sein du magasin implique son acceptation sans réserve et son adhésion pleine et entière aux conditions générales de vente qui sont disponibles au point accueil du magasin ou auprès du personnel de vente du magasin, sur demande de l’acheteur.",
    },
  ];
  return (
    <div className="faq">
      <div className="faq-header">
        <h1>Questions Fréquemment Posées </h1>
        <h4>Répondons à quelques-unes de vos questions</h4>
      </div>
      {data.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
