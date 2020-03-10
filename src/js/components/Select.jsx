import React, { PureComponent } from 'react';

class Select extends PureComponent {
  render() {
    const { name, onChangeHandler, options } = this.props;

    return (
      <label className="sort-label">
        Sorter etter
        <select className="sort-dropdown" name={name} onChange={onChangeHandler}>
          {options.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default Select;
