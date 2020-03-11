import React, { useState } from 'react';
import FilterCheckBox from './FilterCheckBox';

const FilterGroup = ({ options, legend, onCheckHandler, category }) => {
  const [activeCheckBox, setActiveCheckBox] = useState('');

  const onCheck = event => {
    const checkedBox = event.target;

    onCheckHandler(category, checkedBox.value);
    setActiveCheckBox(activeCheckBox === checkedBox.id ? '' : checkedBox.id);
  };

  return (
    <fieldset className="filter-group">
      <legend className="filter-group-label">{legend}</legend>
      {options.map((option, index) => (
        <FilterCheckBox
          key={`${option.id}-${index}`}
          id={option.id}
          value={option.value}
          label={option.label}
          onCheckHandler={onCheck}
          checked={option.id === activeCheckBox}
        />
      ))}
    </fieldset>
  );
};

export default FilterGroup;
