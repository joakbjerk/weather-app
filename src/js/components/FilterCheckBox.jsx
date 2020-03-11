import React from 'react';

const FilterCheckBox = ({ id, label, value, onCheckHandler, checked }) => {
  return (
    <label htmlFor={id} className="filter-label">
      <input
        className="filter-checkbox"
        id={id}
        type="checkbox"
        value={value}
        onChange={onCheckHandler}
        checked={checked}
      />
      <strong>{label}</strong>
    </label>
  );
};

export default FilterCheckBox;
