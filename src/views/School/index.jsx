import React, { Component } from 'react';
import './School.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import viewFiles from '../../assets/images/download_files.svg';
import File, { ManyFiles } from '../../components/File';
import {fetchSchool, requestFiles} from '../../redux/actions/actions';
import NotFound from '../NotFound';
import NavWrapper from '../../components/NavWrapper';
import PageLoader from '../../components/PageLoader';
import SideOverlay from '../../components/SideOverlay';
import FileDescription, {FileTypes} from './FileDescription';
import pdf from '../../assets/images/pdf.png';

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
    allSelected: false,
    email: '',
    totalPrice: 0,
    showingDescription: false,
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
    if ( id === 'all' ){
      const { selectedFiles, allSelected } = this.state;
      this.setState({
        selectedFiles: Object.keys(selectedFiles)
          .reduce((acc, file) => ({
            ...acc,
            [file]: !allSelected
          }), {})
      }, this.validate);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        selectedFiles: {
          ...prevState.selectedFiles,
          [id]: !prevState.selectedFiles[id]
        }
      }),this.validate);
    }
  };


  onChange = ({target: { name, value}}) => {
    this.setState({[name]: value}, this.validate);
  };

  componentWillReceiveProps = (nextProps) => {
    const { selectedFiles } = this.state;
    const { school: { other_files } } = nextProps;
    other_files && this.setState({ selectedFiles: {
      ...(other_files.reduce((acc, file) => (
        {...acc, [file.id]: selectedFiles[file.id]}
      ), {}))
    }});
  };

  validate = () => {
    const { school: { other_files }} = this.props;
    const { selectedFiles, errors, email, phoneNumber} = this.state;
    const hasErrors = Object.values(errors).filter(error => error).length;
    const hasSelectedFiles = Object.values(selectedFiles).filter(selected => selected).length ;
    const allSelected = Object.values(selectedFiles).filter(selected => !selected).length === 0;
    const totalPrice = other_files.reduce((acc, { id , cost }) => (acc + (selectedFiles[id] ? cost : 0)), 0);
    this.setState({
      totalPrice,
      allSelected,
      hasBlankFields: (hasErrors || !hasSelectedFiles) || !email || !phoneNumber
    });
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

  renderError = (history) => (
    <NotFound history={history} />
  );

  renderDescription = (open, files) => (
    <SideOverlay
      open={open}
      onClose={() => this.setState({ showingDescription: false})}
      side="right"
    >
      <div className="file-descriptions">
        {
          files.map(file => (
            <div key={file} className="file-descriptions__file">
              <h2>
                <img src={pdf} alt="" />
                {FileTypes[file]}
              </h2>
              <FileDescription type={file} />
            </div>
          ))
        }
      </div>
    </SideOverlay>
  );

  renderPage = () => {
    const { history, school: { name = '', code, sample, other_files }, isLoading , error} = this.props;
    const { selectedFiles, hasBlankFields, allSelected , totalPrice, showingDescription} = this.state;
    const discount = 0.967213115;

    return (
      error === 'Could not find school.' ? this.renderError(history) : (
        <NavWrapper title={name} history={history} back amount={`${ allSelected ? Math.round(totalPrice * discount) : totalPrice} Ksh`}>
          <div className="school-results">
            {this.renderDescription(showingDescription, Object.keys(FileTypes).filter(file => file !== 'raw'))}
            {this.renderLoader(isLoading)}
            {
              (!isLoading || name) && (
                <div className="school-results__content">
                  <div className="school-results__content__info">
                    <h4 className="school-results__content__title">
                      {'School Results - '+code}
                      <button
                        type="button"
                        className="school-results__content__title__info"
                        onClick={() => this.setState({showingDescription: true})}>
                      More Info
                        <i className="fas fa-chevron-right" />
                      </button>
                    </h4>
                    <p className="school-results__content__title__sub_title">The files below contain analysis based on the schools performance over the years.</p>
                    <div className="files">
                      <div className="files__premium">
                        <div className="files__premium__files">
                          <div className="files__premium__files__single">
                            {
                              <File name="Sample.pdf" link={sample} description="sample" />
                            }
                            {
                              other_files.map(file => (
                                <File
                                  name={file.name}
                                  key={file.id}
                                  onClick={() => this.onFileChoose(file.id)}
                                  locked
                                  description={file.file_type}
                                  price={file.cost}
                                  type={file.name.substr(file.name.lastIndexOf('.')+1)}
                                  selected={selectedFiles[file.id]}
                                />
                              ))
                            }
                          </div>
                          <div className="files__premium__files__all">
                            {
                              <ManyFiles
                                name=""
                                files={other_files}
                                price={2950}
                                onClick={() => this.onFileChoose('all')}
                                description="all"
                                selected={allSelected}
                                locked />
                            }
                            <div className="files__premium__complete">
                              <div className="files__premium__form">
                                <div>
                                  <h2>Request for the files</h2>
                                  <div className="school-results__content__banner">
                                    <div>
                                      <p>1. Choose the files you would like to download</p>
                                      <p>2. Enter your email and phone number</p>
                                      <p>3. You will receive an email with a download link to the files.</p>
                                      <p>4. Once you click on the link sent to your email, you will receive an MPESA payment prompt.</p>
                                      <p>5. If the payment is successful, you will receive an email with the files you selected.</p>
                                    </div>
                                  </div>
                                </div>
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
                                        <span className={allSelected ? 'strike': 'no-strike'}>{`${totalPrice} `}</span>
                                        <span className={allSelected ? 'strike': 'no-strike'}>{`${Math.round(totalPrice * discount)} `}</span>
                                      Ksh
                                      </h1>
                                    </div>
                                  </div>
                                </form>
                                <img src={viewFiles} alt="" className="illustration" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </NavWrapper>
      ));
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
