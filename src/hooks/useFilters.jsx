import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";

export const useFilters = () => {
  const { filter, setFilter } = useContext(FiltersContext);

  const productFilter = (videoCards) => {
    return videoCards.filter((product) => {
      return (
        product.price >= filter.minPrice &&
        (filter.category === "all" || product.category === filter.category)
      );
    });
  };

  return { filter, productFilter, setFilter };
};
