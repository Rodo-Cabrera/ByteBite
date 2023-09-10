import React, {useState} from 'react'
import Products from './products/Products'
import {videoCards as initProducts} from '../../../db.json'
import ShopHeader from './header/ShopHeader';
import { useFilters } from '../../hooks/useFilters';



const Shop = () => {

  const [videoCards] = useState(initProducts);
  
  const { productFilter } = useFilters();

  const filteredProducts = productFilter(videoCards);

 


  return (
    <div>
      <ShopHeader />
      <Products products={filteredProducts} />
    </div>
  );
}

export default Shop
