import React, { useState } from 'react'
import Products from './products/Products'
import {videoCards as initProducts} from '../../../db.json'
import ShopHeader from './header/ShopHeader';

const useFilters = () => {

  const [filter, setFilter] = useState({
    category: "all",
    minPrice: 0,
  });

  const productFilter = (videoCards) => {
    return videoCards.filter((product) => {
      return (
        product.price >= filter.minPrice &&
        (filter.category === "all" || product.category === filter.category)
      );
    });
  };

  return {productFilter, setFilter}

}


const Shop = () => {

  const [videoCards] = useState(initProducts);
  
  const { productFilter, setFilter } = useFilters();

  const filteredProducts = productFilter(videoCards)

  return (
    <div>
      <ShopHeader changeFilters={setFilter} />
      <Products products={filteredProducts} />
    </div>
  );
}

export default Shop
