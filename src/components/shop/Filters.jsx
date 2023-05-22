import React, {useState, useId} from 'react'
import './styles/filters.css'



const Filters = ({onChange}) => {

  const [minPrice, setMinPrice] = useState(0);
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangePrice = (e) => {
    setMinPrice(e.target.value)
    onChange(prev => ({
      ...prev,
      minPrice: e.target.value
    }))
  };

  const handleChangeCategory = (e) => {
    onChange(prev => ({
      ...prev,
      category: e.target.value
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio desde :</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="2000"
          onChange={handleChangePrice}
        />
        <span>$ {minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Categorías</label>
        <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="rams">Memorias Ram</option>
        </select>
      </div>
    </section>
  );
}

export default Filters
