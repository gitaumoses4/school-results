import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SideOverlay.scss';

class SideOverlay extends Component {
  state = {
    open: false
  };

  componentWillMount() {
    const { open } = this.props;
    this.setState({open});
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { open } = this.state;
    if( nextProps.open !== open){
      this.setState({ open: nextProps.open});
    }
  }

  toggle = () => {
    const { onClose } = this.props;
    this.setState({ open: false});
    onClose && onClose();
  };

  render(){
    const { open } = this.state;
    const { side, children } = this.props;
    document.body.style.overflow = open ? 'hidden': 'auto';
    return (
      <div className={`side-overlay ${open ? 'open': ''} ${side}`}>
        <div
          className="side-overlay__overlay"
          role="presentation"
          onClick={this.toggle} />
        <div className="side-overlay__content">
          <i
            className="fas fa-times close"
            role="presentation"
            onClick={this.toggle} />
          {
            children
          }
        </div>
      </div>
    );
  }
}

SideOverlay.propTypes = {
  open: PropTypes.bool,
  side: PropTypes.string
};

SideOverlay.defaultProps = {
  open: false,
  side: 'left'
};
export default SideOverlay;
