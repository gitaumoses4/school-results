import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.scss';

const SearchResult = ({ name, code }) => (
  <div className="item">
    <span>{code}</span>
    <span>{name}</span>
  </div>
);

const SearchResults = ({ schools }) => (
  <div className="search-results">
    <div className="header">
      <span>Code</span>
      <span>School Name</span>
    </div>
    <div className="body">
      {
        schools.map(school => (
          <SearchResult {...school} key={school.code} />
        ))
      }
    </div>
  </div>
);

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
};

SearchResults.propTypes = {
  schools: PropTypes.array.isRequired
};

export default SearchResults;
