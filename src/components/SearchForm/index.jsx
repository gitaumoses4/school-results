import React, { Component } from 'react';
import './SearchForm.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LoadingIcon from '../LoadingIcon';
import {searchSchools} from '../../redux/actions/actions';

class SearchForm extends Component {

  state = {
    search: ''
  };

  componentDidMount() {
    const { search } = this.props;
    this.setState({ search });
  }

  componentWillReceiveProps(nextProps){
    const { search } = this.state;
    if( !search ){
      const { search: propsSearch } = nextProps;
      this.setState({ search: propsSearch });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { history, searchSchools } = this.props;
    const { search } = this.state;
    history.push(`/?search=${search}`);
    searchSchools(search);
  };

  render (){
    const { search } = this.state;
    const { isLoading } = this.props;
    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Enter school name or code..."
          name="search"
          value={search}
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
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
  searchSchools: PropTypes.func.isRequired,
  search: PropTypes.string
};

SearchForm.defaultProps = {
  search: ''
};

export default connect(mapStateToProps, {
  searchSchools
})(SearchForm);
