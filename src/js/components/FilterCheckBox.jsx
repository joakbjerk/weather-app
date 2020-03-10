import React, { PureComponent } from 'react';

class FilterCheckBox extends PureComponent {
  render() {
    const { id, label, value, onCheckHandler, checked } = this.props;
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
  }
}

export default FilterCheckBox;
