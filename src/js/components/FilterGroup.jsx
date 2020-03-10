import React, { Component } from 'react';
import FilterCheckBox from './FilterCheckBox';

class FilterGroup extends Component {
  state = {
    activeCheckBox: ''
  };

  onCheckHandler = event => {
    const { activeCheckBox } = this.state;
    const { onCheckHandler, category } = this.props;
    const checkedBox = event.target;

    onCheckHandler(category, checkedBox.value);
    this.setState({ activeCheckBox: activeCheckBox === checkedBox.id ? '' : checkedBox.id });
  };

  render() {
    const { activeCheckBox } = this.state;
    const { options, legend } = this.props;

    return (
      <fieldset className="filter-group">
        <legend className="filter-group-label">{legend}</legend>
        {options.map((option, index) => (
          <FilterCheckBox
            key={`${option.id}-${index}`}
            id={option.id}
            value={option.value}
            label={option.label}
            onCheckHandler={this.onCheckHandler}
            checked={option.id === activeCheckBox}
          />
        ))}
      </fieldset>
    );
  }
}

export default FilterGroup;
