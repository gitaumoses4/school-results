import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import './NavWrapper.scss';

const NavWrapper = ({ children , ...other}) => (
  <div className="nav-wrapper">
    <Nav {...other} />
    <div className="content">
      {
        children
      }
    </div>
  </div>
);

NavWrapper.propTypes = {
  children: PropTypes.oneOf(
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired
};
export default NavWrapper;
