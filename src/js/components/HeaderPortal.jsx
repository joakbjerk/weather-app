import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const pageHeader = document.querySelector('.header-wrapper');

class HeaderPortal extends Component {
  containerElement = document.createDocumentFragment();

  componentDidMount() {
    pageHeader.appendChild(this.containerElement);
  }

  componentWillUnmount() {
    const filterMenuButton = document.querySelector('#menu-button');
    pageHeader.removeChild(filterMenuButton);
    this.containerElement = null;
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.containerElement);
  }
}

export default HeaderPortal;
