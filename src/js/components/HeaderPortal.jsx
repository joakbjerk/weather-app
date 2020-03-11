import React, { Component, Children } from 'react';
import { createPortal } from 'react-dom';
const pageHeader = document.querySelector('.header-wrapper');

class HeaderPortal extends Component {
  containerElement = document.createDocumentFragment();

  componentDidMount() {
    pageHeader.appendChild(this.containerElement);
  }

  componentWillUnmount() {
    Children.toArray(this.props.children).forEach(child => {
      const childNode = child._owner.firstEffect.stateNode;
      pageHeader.removeChild(childNode);
    });
    containerElement = null;
  }

  render() {
    return createPortal(this.props.children, this.containerElement);
  }
}

export default HeaderPortal;
