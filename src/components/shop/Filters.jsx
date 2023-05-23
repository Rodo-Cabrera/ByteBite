import React, { useId } from 'react';
import './styles/filters.css';
import { useFilters } from '../../hooks/useFilters';



const Filters = () => {

  const { filter, setFilter } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangePrice = (e) => {
    setFilter((prev) => ({
      ...prev,
      minPrice: e.target.value
    }));
  };

  const handleChangeCategory = (e) => {
    setFilter((prev) => ({
      ...prev,
      category: e.target.value,
    }));
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
          value={filter.minPrice}
        />
        <span>$ {filter.minPrice}</span>
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
