import SearchIcon from "@mui/icons-material/Search";
import styles from "./searchBoxMobile.module.scss";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBoxMobile = () => {
  const { data } = useFetch(`/products?populate=*`);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [noResults, setNoResults] = useState(false);

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

    setShowResults(true);
    setNoResults(newFilter.length === 0 && searchWord !== "");
  };

  const handleSearchClick = () => {
    setShowResults(!showResults);
  };

  const handleResultClick = () => {
    setShowResults(false);
  };

  return (
    <div className={styles.searchBoxMobile}>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={wordEntered}
                onChange={handleFilter}
                onFocus={handleSearchClick}
              />
              {showResults && (
                <div>
                  {filteredData.length > 0 ? (
                    <ul className={styles.searchResults}>
                      {filteredData.slice(0, 8).map((item) => (
                        <li key={item?.id} onClick={handleResultClick}>
                          <Link
                            className={styles.link}
                            to={`/product/${item.id}`}
                          >
                            {item?.attributes?.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    noResults && (
                      <p className={styles.searchResults}>Aucun résultat</p>
                    )
                  )}
                </div>
              )}
            </td>
            <td>
              <SearchIcon onClick={handleSearchClick} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchBoxMobile;
