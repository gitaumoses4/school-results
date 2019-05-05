import {ScaleLoader} from 'react-spinners';
import PropTypes from 'prop-types';
import React from 'react';
import './PageLoader.scss';

const PageLoader = ({ isLoading }) => (
  <div className={`page-loader ${isLoading ? 'loading': ''}`}>
    <ScaleLoader
      sizeUnit="px"
      size={150}
      color="#fff"
    />
  </div>
);

PageLoader.propTypes = {
  isLoading: PropTypes.bool
};

PageLoader.defaultProps = {
  isLoading: false
};

export default PageLoader;
