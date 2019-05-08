import React from 'react';
import PropTypes from 'prop-types';
import pdf from '../../assets/images/pdf.png';
import './File.scss';
import locked from '../../assets/images/lock.png';
import xls from '../../assets/images/xls.png';
import selected from '../../assets/images/check.png';
import money from '../../assets/images/money.png';
import FileDescription, { FileTypes } from '../../views/School/FileDescription';

const icons = {
  pdf,
  locked,
  selected,
  xls,
  xlsx: xls
};
const File = ({ type ,link, name, locked, selected, onClick, price, description}) => (
  <div>
    <h2>{FileTypes[description]}</h2>
    <a href={link} className="file" onClick={onClick}>
      {
        locked ? (
          <div className="file__payment">
            <img src={money} alt="" />
            <span className="file__payment__amount">
              {price}
              {' '}
              Ksh
            </span>
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
  </div>
);

const ManyFiles = ({count, description, files, selected, onClick}) => {
  return (
    <div className="multiple-files">
      <h2>
        {FileTypes[description]}
        {' at '}
        20% Discount
      </h2>
      Buy all the files at 8000 Ksh
      {
        files.map((file) => (
          <File
            type={file.type}
            locked
            description=""
            onClick={onClick}
            selected={selected}
            price={file.cost}
            name={file.name}
            key={file.name} />
        ))
      }
    </div>
  );
};

File.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.string,
  description: PropTypes.string.isRequired,
  price: PropTypes.string
};

File.defaultProps = {
  type: 'pdf',
  price: 0,
  locked: false,
  link: undefined,
  selected: false,
  onClick: () => {}
};

ManyFiles.propTypes = {
  count: PropTypes.number
};

ManyFiles.defaultProps = {
  count: 8
};

export {
  ManyFiles
};
export default File;


