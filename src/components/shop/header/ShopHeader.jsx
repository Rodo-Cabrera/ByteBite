import React from 'react'
import Filters from '../Filters'

const ShopHeader = ({changeFilters}) => {
  return (
    <div>
      <Filters onChange={changeFilters} />
    </div>
  );
}

export default ShopHeader
