import React from 'react';
import PropTypes from 'prop-types';
import pdf from '../../assets/images/pdf.png';
import './File.scss';
import locked from '../../assets/images/lock.png';
import xls from '../../assets/images/xls.png';
import selected from '../../assets/images/check.png';
import money from '../../assets/images/money.png';

const icons = {
  pdf,
  locked,
  selected,
  xls,
  xlsx: xls
};
const File = ({ type ,link, name, locked, selected, onClick}) => (
  <a href={link} className="file" onClick={onClick}>
    {
      locked ? (
        <div className="file__payment">
          <img src={money} alt="" />
          <span className="file__payment__amount">1000 Ksh</span>
        </div>
      ): <span />
    }
    <div className="file__icon">
      <img src={icons[locked ? selected ? 'selected': 'locked' : type]} alt="" />
    </div>
    <div className="file__name">
      <img src={icons[type]} alt="" className="file__name__icon" />
      <span className="file__name__title">{name}</span>
    </div>
  </a>
);

File.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.string
};

File.defaultProps = {
  type: 'pdf',
  locked: false,
  link: undefined,
  selected: false,
  onClick: () => {}
};

export default File;


