import React, { Component } from 'react';
import './SearchForm.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {searchSchools} from '../../redux/actions/searchActions';
import LoadingIcon from '../LoadingIcon';

class SearchForm extends Component {

  state = {
    search: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { searchSchools } = this.props;
    const { search } = this.state;
    searchSchools(search);
  };

  render (){
    const { search } = this.state;
    const { isLoading } = this.props;
    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <input
          type="text" placeholder="Enter school name or code..." name="search" value={search}
          onChange={(e) => { this.setState({ search: e.target.value});}} />
        <button type="submit">
          Search
          <LoadingIcon isLoading={isLoading} />
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ searchSchools }) => searchSchools;

SearchForm.propTypes = {
  searchSchools: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {
  searchSchools
})(SearchForm);
