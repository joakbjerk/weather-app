import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const pageHeader = document.querySelector('.header-wrapper');

class HeaderPortal extends Component {
  containerElement = document.createDocumentFragment();

  componentDidMount() {
    pageHeader.appendChild(this.containerElement);
  }

  componentWillUnmount() {
    this.containerElement.appendChild(this.props.children);
    this.containerElement = null;
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.containerElement);
  }
}

export default HeaderPortal;
