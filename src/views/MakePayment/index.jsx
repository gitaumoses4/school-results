import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import payment from '../../assets/images/payment.svg';
import NavWrapper from '../../components/NavWrapper';
import './MakePayment.scss';
import {initiatePayment, makePayment} from '../../redux/actions/actions';
import PageLoader from '../../components/PageLoader';
import File from '../../components/File';
import {validatePhone} from '../School';
import Modal from '../../components/Modal';

class MakePayment extends Component {

  state = {
    phoneNumber: '',
    error: false,
    modal: {
      isShowing: false,
      title: 'Successfully Requested Payment',
      message: 'Once you have paid successfully, please check your email for the files you requested.',
      subTitle: 'Ensure your phone is unlocked, you will receive an MPESA prompt'
    }
  };

  componentDidMount(){
    const { match: { params: { token }}, history, initiatePayment} = this.props;

    if ( token ){
      initiatePayment(token, history);
    }
  }

  componentWillReceiveProps(nextProps){
    const { phoneNumber } = this.state;
    const { requestInfo } = nextProps;
    if( requestInfo && phoneNumber !== requestInfo.phone_number){
      this.setState({ phoneNumber: requestInfo.phone_number});
    }
    this.setState(prevState => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        isShowing: nextProps.paymentSuccess
      }
    }));
  }

  makePayment = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, modal: { ...prevState.modal, isShowing: true}}));

    const { makePayment, token } = this.props;
    const { phoneNumber } = this.state;

    makePayment(token, phoneNumber );
  };


  onPhoneChanged = (e) => {
    const { target: { value }} = e;
    this.setState({ phoneNumber: value, error: !validatePhone(value)});
  };

  render(){
    const { history, isLoading, requestInfo: { files = [] }, paymentError, paymentSuccess} = this.props;
    const { phoneNumber, error , modal: { isShowing, message, title, subTitle}} = this.state;
    return (
      <NavWrapper history={history} goHome back>
        <Modal
          message={message}
          title={title}
          isShowing={isShowing}
          subTitle={subTitle}
        />
        <PageLoader isLoading={isLoading} />
        {
          (!isLoading || files.length) ? (
            <div className="make-payment">
              <div className="make-payment__banner">
                <img src={payment} alt="" />
              </div>
              <div className="make-payment__info">
                <h2>Complete Payment</h2>
                { paymentError && (
                  <div className="payment__error">
                    There was an error making your payment. Please try again!
                  </div>
                )}
                <p>Please confirm your phone number before proceeding with the payment</p>
                <h3>Requested Files</h3>
                <div className="make-payment__info__files">
                  {
                    files.map(file => (
                      <File
                        name={file.name}
                        key={file.id}
                        type={file.name.substr(file.name.lastIndexOf('.')+1)}
                      />
                    ))
                  }
                </div>
                <div className="make-payment__payment">
                  <h2>MPESA Phone Number</h2>
                  <div className="make-payment__info__form">
                    <form onSubmit={this.makePayment}>
                      <div className={`input-field ${error ? 'error': ''}`}>
                        <input type="text" name="phoneNumber" value={phoneNumber} onChange={this.onPhoneChanged} />
                        {error && <span className="error">Please enter a valid phone number</span>}
                      </div>
                      <p>Ensure your phone is unlocked before proceeding with the payment</p>
                      <button type="submit" disabled={error || paymentSuccess}>
                        Make Payment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ): (<span />)
        }
      </NavWrapper>
    );
  }
}

MakePayment.propTypes = {
  history: PropTypes.object.isRequired,
  initiatePayment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestInfo: PropTypes.object.isRequired,
  makePayment: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  paymentSuccess: PropTypes.bool.isRequired,
  paymentError: PropTypes.bool.isRequired
};

const mapStateToProps = ({ payment }) => payment;

export default connect(mapStateToProps, {
  initiatePayment,
  makePayment
})(MakePayment);
