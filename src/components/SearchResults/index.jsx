import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.scss';

const SearchResult = ({ name, code, history }) => (
  <div className="item" role="presentation" onClick={() => history.push(`/school/${code}`)}>
    <span>{code}</span>
    <span>{name}</span>
  </div>
);

const SearchResults = ({ schools, history }) => (
  schools.length ? (
    <div className="search-results">
      <div className="header">
        <span>Code</span>
        <span>School Name</span>
      </div>
      <div className="body">
        {
          schools.map(school => (
            <SearchResult {...school} key={school.code} history={history} />
          ))
        }
      </div>
    </div>
  ): (
    <div className="search-results__empty">
      Your search did not match any results
    </div>
  )
);

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  history: PropTypes.shape.isRequired
};

SearchResults.propTypes = {
  schools: PropTypes.array.isRequired,
  history: PropTypes.shape.isRequired
};

export default SearchResults;
