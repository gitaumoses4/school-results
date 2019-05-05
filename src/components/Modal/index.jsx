import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  state = {
    isShowing: false
  };

  componentDidMount(){
    const { isShowing } = this.props;
    this.setState({ isShowing });
  }
  componentWillReceiveProps(nextProps){
    this.setState({ isShowing: nextProps.isShowing});
  }

  render() {
    let { title, message, subTitle} = this.props;
    const { isShowing } = this.state;
    return (
      <div
        className={`modal ${isShowing ? 'visible' : ''}`}>
        <div
          className="overlay"
          role="presentation"
          onClick={() => this.setState({isShowing: false})} />
        <div className="modal__content">
          <div className="modal__content__title">
            <h2>
              {title}
            </h2>
          </div>
          <div className="modal__content__content">
            <h3>{subTitle}</h3>
            <p>{message}</p>
          </div>
          <div className="modal__content__footer">
            <button type="button" onClick={() => this.setState({ isShowing: false})}>Okay</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  isShowing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

Modal.defaultProps = {
  isShowing: false
};


export default Modal;
