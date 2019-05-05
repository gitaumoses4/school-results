import React from 'react';
import './Nav.scss';
import PropTypes from 'prop-types';
import backIcon from '../../assets/images/back.png';

const Nav = ({ back, title , history}) => (
  <nav className="nav">
    {
      back ? (
        <div className="nav__back" role="presentation" onClick={() => history.goBack()}>
          <img src={backIcon} alt="" />
        </div>
      ): (<span />)
    }
    <h1 className="nav__title">{title}</h1>
  </nav>
);

Nav.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  history: PropTypes.func
};

Nav.defaultProps = {
  back: false,
  title: 'School Analysis Results Directory',
  history: {
    push: () => {}
  }
};
export default Nav;
