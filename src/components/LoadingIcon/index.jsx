import React from 'react';
import PropTypes from 'prop-types';
import './LoadingIcon.scss';

const LoadingIcon = ({ isLoading }) => (
  <span className="loading-icon">
    {
      isLoading && <i className="fas fa-spinner" />
    }
  </span>
);

LoadingIcon.propTypes = {
  isLoading: PropTypes.bool
};

LoadingIcon.defaultProps = {
  isLoading: false
};

export default LoadingIcon;
