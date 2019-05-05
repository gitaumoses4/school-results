import React from 'react';
import PropTypes from 'prop-types';
import pdf from '../../assets/images/pdf.png';
import './File.scss';
import locked from '../../assets/images/lock.png';
import selected from '../../assets/images/check.png';

const icons = {
  pdf,
  locked,
  selected
};
const File = ({ type , name, locked, selected, onClick}) => (
  <div className="file" role="presentation" onClick={onClick}>
    <div className="file__icon">
      <img src={icons[locked ? selected ? 'selected': 'locked' : type]} alt="" />
    </div>
    <div className="file__name">
      <img src={icons[type]} alt="" className="file__name__icon" />
      <span className="file__name__title">{name}</span>
    </div>
  </div>
);

File.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

File.defaultProps = {
  type: 'pdf',
  locked: false,
  selected: false,
  onClick: () => {}
};

export default File;


