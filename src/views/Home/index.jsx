import React, { Component } from 'react';
import './Home.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearchForm from '../../components/SearchForm';
import analysis from '../../assets/images/analysis.svg';
import SearchResults from '../../components/SearchResults';
import {searchSchools} from '../../redux/actions/actions';
import Nav from '../../components/Nav';

class Home extends Component{

  results = React.createRef();
  state = {
    search: ''
  };

  componentDidMount(){
    const { searchSchools, location: { search } } = this.props;
    const query = new URLSearchParams(search);
    this.setState({ search: query.get('search')});

    query.get('search') && searchSchools(query.get('search'));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { current } = this.results;
    const { y } = current.getBoundingClientRect();
    window.scrollTo({
      top: y,
      left: 0,
      behavior: 'smooth'
    });
  }

  render(){
    const { schools, searchDone, history } = this.props;
    const { search } = this.state;
    return (
      <div>
        <Nav />
        <div className="app-home">
          <img src={analysis} alt="" className="app-home__banner" />
          <h2 className="app-home__sub-title">Get the most accurate analysis of your school's performance</h2>
          <div className="app-home__search-form" ref={this.results}>
            <SearchForm history={history} search={search} />
            {
              (searchDone || schools.length) ? (
                <SearchResults
                  schools={schools}
                  history={history} />
              ): (<span />)
            }
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  schools: PropTypes.array,
  searchSchools: PropTypes.func.isRequired,
  searchDone: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
  location: PropTypes.shape.isRequired
};

Home.defaultProps = {
  schools: []
};

const mapStateToProps = ({searchSchools}) => searchSchools;

export default connect(mapStateToProps, {
  searchSchools
})(Home);
