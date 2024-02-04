import "./list.scss";
import Card from "../card/Card";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const List = ({ subCats, value, sort, catId }) => {
  const sortQueryParam = sort ? `&sort=price:${sort}` : "";

  //fetching all product according to this catId
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$gte]=${value[0]}&[filters][price][$lte]=${
      value[1]
    }${sortQueryParam}`
  );

  const [displayedItems, setDisplayedItems] = useState(6); // 6 Initial number of displayed items
  const [additionalItems, setAdditionalItems] = useState(6); // Number of additional items to load

  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + additionalItems);
  };

  return (
    <div className="list">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            data
              .slice(0, displayedItems)
              .map((item) => <Card item={item} key={item.id} />)}
          {data && displayedItems < data.length && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </>
      )}
    </div>
  );
};

export default List;
