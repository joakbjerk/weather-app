import React, { Component } from 'react';

class FilterMenuButton extends Component {
  state = {
    isOpen: false
  };

  onClick = () => {
    const { clickHandler } = this.props;
    const isOpen = !this.state.isOpen;
    clickHandler(isOpen);
    this.setState({ isOpen: isOpen });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <button id="menu-button" className={isOpen ? 'open' : ''} aria-labelledby="menu-label" onClick={this.onClick}>
        <span id="menu-bar-1"></span>
        <span id="menu-bar-2"></span>
        <span id="menu-bar-3"></span>
        <p id="menu-label">Filter</p>
      </button>
    );
  }
}

export default FilterMenuButton;
