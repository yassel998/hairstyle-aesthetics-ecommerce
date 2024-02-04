import { useParams } from "react-router-dom";
import List from "../../components/list/List";
import "./products.scss";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Products = () => {
  const isMobile = window.innerWidth >= 680; // Define mobile breakpoint

  //fetching data according to category id in url
  const catId = parseInt(useParams().id);

  const [sort, setSort] = useState(null); //at the begenning we're not gonna sorting anything
  //there is a problem here 'null' in strapi sort asc and desc not null
  //better asc par default

  const { data } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  //fetch the wallpaper
  const { data: categoryInfo } = useFetch(`/categories/${catId}?populate=*`);

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    //because when we check an item we are going to add this subCat'id inside a list and when uncheck we should delete this from our list
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  //slider range
  const [value, setValue] = useState([0, 350]);

  // Create a state variable to store the debounced slider value
  const [debouncedSliderValue, setDebouncedSliderValue] = useState([0, 350]);

  // Adjust the debounce delay as needed
  const debounceDelay = 500;
  const handleChangeSlider = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSliderValue(value);
    }, debounceDelay);

    return () => clearTimeout(debounceTimer); // Clear the debounce timer on unmount or value change
  }, [value]);

  //Navigation drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="products">
      {isMobile && (
        <div className="left">
          <div className="filterItem">
            <h2>CATÉGORIES</h2>
            {data?.map((item) => (
              <div className="inputItem" key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))}
          </div>
          <div className="filterItem">
            <h2>PRIX</h2>
            <div className="inputItem">
              <Box sx={{ width: 150 }}>
                <Typography variant="body2" gutterBottom>
                  Min: {value[0]}
                </Typography>
                <Slider
                  value={value}
                  onChange={handleChangeSlider}
                  valueLabelDisplay="auto"
                  min={0}
                  max={350}
                />
                <Typography variant="body2" gutterBottom>
                  Max: {value[1]}
                </Typography>
              </Box>
            </div>
          </div>
          <div className="filterItem">
            <h2>Trier par</h2>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">Le moins cher</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">Le plus cher</label>
            </div>
          </div>
        </div>
      )}
      <div className="right">
        <img
          src={
            process.env.REACT_APP_UPLOAD_URL +
            categoryInfo?.attributes?.img?.data?.attributes?.url
          }
          className="catImg"
          alt=""
        />
        {!isMobile && (
          <div className="row">
            <div className="cat" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
              <CategoryIcon />
            </div>
            <div className={`category-drawer ${isDrawerOpen ? "open" : ""}`}>
              <div className="topDrawer">
                <div className="leftDrawer">FILTRER PAR</div>
                <div className="rightDrawer">
                  <div className="resetDrawer">
                    <DeleteOutlineIcon
                      onClick={() => window.location.reload()}
                    />
                  </div>
                  <div
                    className="ok"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    ok
                  </div>
                </div>
              </div>
              <div className="bottomDrawer">
                <div className="filterItemDr">
                  <h3>CATÉGORIES</h3>
                  {data?.map((item) => (
                    <div className="inputItemDr" key={item.id}>
                      <input
                        type="checkbox"
                        id={item.id}
                        value={item.id}
                        onChange={handleChange}
                      />
                      <label htmlFor={item.id}>{item.attributes.title}</label>
                    </div>
                  ))}
                </div>

                <div className="filterItemDr">
                  <h3>PRIX</h3>
                  <div className="inputItemDr">
                    <Box sx={{ width: 300 }}>
                      <Typography variant="body2" gutterBottom>
                        Min: {value[0]}
                      </Typography>
                      <Slider
                        value={value}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="auto"
                        min={0}
                        max={350}
                      />
                      <Typography variant="body2" gutterBottom>
                        Max: {value[1]}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
            <div className="sort">
              <select
                name=""
                id=""
                value={sort || ""}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Par pertinence</option>
                <option value="asc">Le moins cher</option>
                <option value="desc">Le plus cher</option>
              </select>
            </div>
          </div>
        )}
        <List
          catId={catId}
          value={debouncedSliderValue}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
