import React, { Component } from 'react';
import './School.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner/src';
import Nav from '../../components/Nav';
import viewFiles from '../../assets/images/download_files.svg';
import File from '../../components/File';
import {fetchSchool} from '../../redux/actions/actions';
import NotFound from '../NotFound';

class School extends Component {

  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static validatePhone(phone) {
    const re = /^(07|\+254|254)\d{8}/;
    return re.test(phone);
  }
  state = {
    selectedFiles: {

    },
    email: '',
    phoneNumber: '',
    hasBlankFields: true,
    errors: {}
  };

  componentDidMount() {
    const { match: { params: { id }}, fetchSchool} = this.props;
    fetchSchool(id);
  }


  onFileChoose = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedFiles: {
        ...prevState.selectedFiles,
        [id]: !prevState.selectedFiles[id]
      }
    }),this.validate);
  };


  onChange = ({target: { name, value}}) => {
    this.setState({[name]: value}, this.validate);
  };

  validate = () => {
    const { selectedFiles, errors} = this.state;
    const hasErrors = Object.values(errors).filter(error => error).length;
    const hasSelectedFiles = Object.values(selectedFiles).filter(selected => selected).length ;
    this.setState({hasBlankFields: hasErrors || !hasSelectedFiles});
  };

  renderInput = (name, type, placeholder, validator, validationMessage) => {
    const { state, state: { errors } } = this;

    const validate = (e) => {
      if(!validator(e.target.value) ){
        this.setState((prevState) => ({
          ...prevState,
          hasBlankFields: prevState.hasBlankFields || true,
          errors: {
            ...prevState.errors,
            [name]: validationMessage || 'Please enter a valid value'
          }
        }));
      }else {
        this.setState((prevState) => ({
          ...prevState,
          hasBlankFields: prevState.hasBlankFields || false,
          errors: {
            ...prevState.errors,
            [name]: undefined
          }
        }));
      }
      this.onChange(e);
    };
    return (
      <div className={`input-field ${errors[name] ? 'error': ''}`}>
        <input
          type={type}
          className="email"
          name={name}
          value={state[name]}
          onChange={validate}
          placeholder={placeholder} />
        {
          errors[name] && <span className="error">{errors[name]}</span>
        }
      </div>
    );
  };

    renderPage = () => {
      const { history, school: { name, code, files = [] }, error } = this.props;
      const { selectedFiles, hasBlankFields } = this.state;
      const [ sample ] = files;

      return (
        <div className="root__school">
          <Nav back="/" title="Kiwanja Bright Star Academy" history={history} />
          <div className="school-results">
            <div className="school-results__content">
              <div className="school-results__content__banner">
                <img src={viewFiles} alt="" />
              </div>
              <div className="school-results__content__info">
                <h4 className="school-results__content__title">School Results</h4>
                <p>The files below contain analysis based on the schools performance over the years.</p>
                <div className="files">
                  <div className="files__sample">
                    <h1 className="files__sample__header">Sample</h1>
                    <File name={sample.name} />
                  </div>
                  <div className="files__premium">
                    <h1 className="files__premium__header">More (Payment Required)</h1>
                    <p>1. Choose the files you would like to download</p>
                    <div className="files__premium__files">
                      {
                        files.slice(1).map(file => (
                          <File
                            name={file.name}
                            key={file.id}
                            onClick={() => this.onFileChoose(file.id)}
                            locked
                            selected={selectedFiles[file.id]}
                          />
                        ))
                      }
                    </div>
                    <p>2. Enter your email and phone number</p>
                    <div className="files__premium__form">
                      <form>
                        {this.renderInput(
                          'email',
                          'email',
                          'Email Address',
                          School.validateEmail,
                          'Please enter a valid email')
                        }
                        {this.renderInput(
                          'phoneNumber',
                          'phone',
                          'MPESA phone number',
                          School.validatePhone,
                          'Please enter a valid phone number')
                        }
                        <button type="submit" disabled={hasBlankFields}>
                        Get Files
                        </button>
                      </form>
                    </div>
                    <p>3. You will receive an email with a download link to the files.</p>
                    <p>4. Once you click on the link sent to your email, you will receive an MPESA payment prompt.</p>
                    <p>5. If the payment is successful, you will receive an email with the files you selected.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    render() {
      const { error, isLoading } = this.props;
      return (
        error ? <NotFound /> : isLoading ? (
          <Loader
            type="Triangle"
            height={100}
            width={100}
          />
        ): this.renderPage()
      );
    }
}

School.propTypes = {
  history: PropTypes.func.isRequired,
  fetchSchool: PropTypes.func.isRequired,
  school: PropTypes.shape.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ school }) => school;
export default connect(mapStateToProps, {
  fetchSchool
})(School);
