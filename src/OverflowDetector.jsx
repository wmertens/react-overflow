import React, { Component } from 'react';
import ResizeDetector from './ResizeDetector';

let PropTypes
try {
  PropTypes = require('prop-types');
  if (PropTypes.default) PropTypes = PropTypes.default;
} catch (err) {}

export default class OverflowDetector extends Component {
  static propTypes = PropTypes && {
    onOverflowChange: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.isOverflowed = false;
    this.domElement = null;
    this.setDOMElement = this.setDOMElement.bind(this);
    this.checkOverflow = this.checkOverflow.bind(this);
  }

  componentDidMount() {
    this.checkOverflow();
  }

  componentDidUpdate() {
    this.checkOverflow();
  }

  setDOMElement(domElement) {
    this.domElement = domElement;
  }

  checkOverflow() {
    const isOverflowed =
      this.domElement.scrollWidth > this.domElement.clientWidth ||
      this.domElement.scrollHeight > this.domElement.clientHeight;

    if (isOverflowed !== this.isOverflowed) {
      this.isOverflowed = isOverflowed;
      if (this.props.onOverflowChange) {
        this.props.onOverflowChange(isOverflowed);
      }
    }
  }

  render() {
    const { style, className, children } = this.props;
    return (
      <div
        ref={this.setDOMElement}
        style={{ ...style, position: 'relative' }}
        className={className}
      >
        {children}
        <ResizeDetector onResize={this.checkOverflow} />
      </div>
    );
  }
}
