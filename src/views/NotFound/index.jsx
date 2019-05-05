import React from 'react';
import notFound from '../../assets/images/not_found.svg';
import './NotFound.scss';
import Nav from '../../components/Nav';

const NotFound = ({ history }) => (
  <div>
    <Nav back history={history} />
    <div className="not-found">
      <img src={notFound} alt="" />
      <div className="not-found__content">
        <h1>The page you are looking for was not found</h1>
        <p>Go back to safety</p>
        <a href="/">Home</a>
      </div>
    </div>
  </div>
);

export default NotFound;
