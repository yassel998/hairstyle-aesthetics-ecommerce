import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./searchbox.module.scss";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";

const SearchBox = ({ open, onClose }) => {
  const { data } = useFetch(`/products?populate=*`);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.attributes?.title
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.search} overflow="scroll">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <input
            type="text"
            placeholder="Rechercher un produit"
            className=""
            value={wordEntered}
            onChange={handleFilter}
          />
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          component={"span"}
        >
          <table>
            <tbody>
              <tr>
                <th>Produit</th>
                <th>Marque</th>
                <th>Image</th>
              </tr>

              {filteredData.slice(0, 8).map((item) => (
                <tr key={item?.id}>
                  <td>
                    <Link
                      className={styles.link}
                      to={`/product/${item.id}`}
                      onClick={onClose}
                    >
                      {item?.attributes?.title}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className={styles.link}
                      to={`/product/${item.id}`}
                      onClick={onClose}
                    >
                      {item?.attributes?.brand}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className={styles.link}
                      to={`/product/${item.id}`}
                      onClick={onClose}
                    >
                      <img
                        src={
                          process.env.REACT_APP_UPLOAD_URL +
                          item?.attributes?.img1?.data?.attributes?.url
                        }
                        alt={item?.attributes?.title}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SearchBox;
