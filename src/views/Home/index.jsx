import React, { Component } from 'react';
import './Home.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearchForm from '../../components/SearchForm';
import background from '../../assets/images/background.jpg';
import SearchResults from '../../components/SearchResults';
import {searchSchools} from '../../redux/actions/searchActions';

class Home extends Component{
  componentDidMount(){
    const { searchSchools } = this.props;
    searchSchools();
  }
  render(){
    const { schools } = this.props;
    return (
      <div className="app-home" style={{backgroundImage: `url('${background}')`}}>
        <h1 className="app-home__title">School Analysis Results Directory</h1>
        <div className="divider divider__light" />
        <h2 className="app-home__sub-title">Get the most accurate analysis of your school's performance</h2>
        <div className="app-home__search-form">
          <SearchForm />
          <SearchResults schools={schools} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  schools: PropTypes.array,
  searchSchools: PropTypes.func.isRequired
};

Home.defaultProps = {
  schools: []
};

const mapStateToProps = ({searchSchools}) => searchSchools;

export default connect(mapStateToProps, {
  searchSchools
})(Home);
