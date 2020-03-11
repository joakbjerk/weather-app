import React, { useState } from 'react';

const FilterMenuButton = ({ clickHandler }) => {
  const [isOpen, openMenu] = useState(false);

  const onClick = () => {
    const isCurrentlyOpen = !isOpen;
    clickHandler(isCurrentlyOpen);
    openMenu(isCurrentlyOpen);
  };

  return (
    <button id="menu-button" className={isOpen ? 'open' : ''} aria-labelledby="menu-label" onClick={onClick}>
      <span id="menu-bar-1"></span>
      <span id="menu-bar-2"></span>
      <span id="menu-bar-3"></span>
      <p id="menu-label">Filter</p>
    </button>
  );
};

export default FilterMenuButton;
