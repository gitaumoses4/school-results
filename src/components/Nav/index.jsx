import React from 'react';
import './Nav.scss';
import PropTypes from 'prop-types';
import backIcon from '../../assets/images/back.png';

const Nav = ({ back, title , history, goHome, amount}) => (
  <nav className="nav">
    {
      back ? (
        <div className="nav__back" role="presentation" onClick={() => {goHome ? history.push('/') : history.goBack();}}>
          <img src={backIcon} alt="" />
        </div>
      ): (<span />)
    }
    <h1 className="nav__title">{title}</h1>
    {
      amount && (
        <div className="cart">
          <i className="fas fa-shopping-cart" />
          <span>
            { amount }
          </span>
        </div>
      )
    }
  </nav>
);

Nav.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  history: PropTypes.func,
  goHome: PropTypes.bool
};

Nav.defaultProps = {
  back: false,
  title: 'School Analysis Results Directory',
  goHome: false,
  history: {
    push: () => {}
  }
};
export default Nav;
