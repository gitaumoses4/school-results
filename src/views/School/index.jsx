import React, { Component } from 'react';
import './School.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import viewFiles from '../../assets/images/download_files.svg';
import File from '../../components/File';
import {fetchSchool, requestFiles} from '../../redux/actions/actions';
import NotFound from '../NotFound';
import NavWrapper from '../../components/NavWrapper';
import PageLoader from '../../components/PageLoader';

export const validateEmail = (email) =>  {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^(07|\+2547|2547)\d{8}$/;
  return re.test(phone);
};

class School extends Component {
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
    this.setState({school_code: id});
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
    const { selectedFiles, errors, email, phoneNumber} = this.state;
    const hasErrors = Object.values(errors).filter(error => error).length;
    const hasSelectedFiles = Object.values(selectedFiles).filter(selected => selected).length ;
    this.setState({hasBlankFields: (hasErrors || !hasSelectedFiles) || !email || !phoneNumber});
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

  requestFiles = (e) => {
    e.preventDefault();
    const { requestFiles, history } = this.props;
    const { email, phoneNumber: phone_number, selectedFiles, school_code } = this.state;
    const data = {
      email,
      phone_number,
      school_code,
      data_files:
      Object.keys(selectedFiles).filter(file => selectedFiles[file])
    };
    requestFiles(data, history);
  };

  renderLoader = (isLoading) => (
    <PageLoader isLoading={isLoading} />
  );

  renderPage = () => {
    const { history, school: { name = '', code, sample, other_files }, isLoading } = this.props;
    const { selectedFiles, hasBlankFields } = this.state;

    return (
      <NavWrapper title={name} history={history} back>
        <div className="school-results">
          {this.renderLoader(isLoading)}
          {
            (!isLoading || name) && (
              <div className="school-results__content">
                <div className="school-results__content__banner">
                  <img src={viewFiles} alt="" />
                  <div>
                    <p>1. Choose the files you would like to download</p>
                    <p>2. Enter your email and phone number</p>
                    <p>3. You will receive an email with a download link to the files.</p>
                    <p>4. Once you click on the link sent to your email, you will receive an MPESA payment prompt.</p>
                    <p>5. If the payment is successful, you will receive an email with the files you selected.</p>
                  </div>
                </div>
                <div className="school-results__content__info">
                  <h4 className="school-results__content__title">
                    School Results -
                    {' '}
                    {code}
                  </h4>
                  <p>The files below contain analysis based on the schools performance over the years.</p>
                  <div className="files">
                    <div className="files__sample">
                      <h1 className="files__sample__header">Sample</h1>
                      <File name="Sample.pdf" link={sample} />
                    </div>
                    <div className="files__premium">
                      <h1 className="files__premium__header">More (Payment Required)</h1>
                      <p>Choose the files you would like to download</p>
                      <div className="files__premium__files">
                        {
                          other_files.map(file => (
                            <File
                              name={file.name}
                              key={file.id}
                              onClick={() => this.onFileChoose(file.id)}
                              locked
                              type={file.name.substr(file.name.lastIndexOf('.')+1)}
                              selected={selectedFiles[file.id]}
                            />
                          ))
                        }
                      </div>
                      <p>Enter your email and phone number</p>
                      <div className="files__premium__form">
                        <form onSubmit={this.requestFiles}>
                          {this.renderInput(
                            'email',
                            'email',
                            'Email Address',
                            validateEmail,
                            'Please enter a valid email')
                          }
                          {this.renderInput(
                            'phoneNumber',
                            'phone',
                            'MPESA phone number',
                            validatePhone,
                            'Please enter a valid phone number')
                          }
                          <div>
                            <button type="submit" disabled={hasBlankFields}>
                              Get Files
                            </button>
                            <div className="total">
                              {'Total '}
                              <h1>
                                {`${Object.values(selectedFiles).filter(file => file).length * 1000} Ksh`}
                              </h1>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </NavWrapper>
    );
  };

  render() {
    const { error } = this.props;
    return (
      <div className="root__school">
        {
          error ? <NotFound /> : this.renderPage()
        }
      </div>
    );
  }
}

School.propTypes = {
  history: PropTypes.func.isRequired,
  fetchSchool: PropTypes.func.isRequired,
  school: PropTypes.shape.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  requestFiles: PropTypes.func.isRequired
};

const mapStateToProps = ({ school }) => school;
export default connect(mapStateToProps, {
  fetchSchool,
  requestFiles
})(School);
