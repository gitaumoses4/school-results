import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import NavWrapper from '../../components/NavWrapper';
import './EmailSent.scss';
import emailSent from '../../assets/images/email_sent.svg';
import gmail from '../../assets/images/gmail.png';
import yahoo from '../../assets/images/yahoo.png';

const supportedMails = {
  'gmail.com': {
    link: 'https://mail.google.com',
    icon: gmail,
    name: 'Gmail'
  },
  'yahoo.com': {
    link: 'https://mail.yahoo.com',
    icon: yahoo,
    name: 'Yahoo'
  }
};

const isSupported = (email='') => Object.keys(supportedMails).find(mail => new RegExp(mail.toLowerCase()+'$').test(email.toLowerCase()));

const renderMail = (email) => {
  const { link, icon, name} = supportedMails[isSupported(email)];
  return (
    <a className="email-sent__emails--email" href={link} target="_blank" rel="noreferrer noopener">
      <img src={icon} alt="" />
      {name}
    </a>
  );
};
const EmailSent = ({ history, requester: { email } }) => {
  if( !email ){
    history.goBack();
  }
  return (
    <NavWrapper back history={history}>
      <div className="email-sent">
        <img src={emailSent} alt="" className="email-sent__banner" />
        <h1 className="email-sent__title">Request received</h1>
        <p className="email-sent__instructions">
        To verify your email and proceed with the transaction.
          <br />
        Please follow the instructions sent to your email at
          <b>
            {' '}
            {email}
          </b>
        </p>

        {
          isSupported(email) && (
            <div className="email-sent__emails">
              <h2>Go to your Inbox</h2>
              {renderMail(email)}
            </div>
          )
        }
      </div>
    </NavWrapper>
  );
};

EmailSent.propTypes = {
  history: PropTypes.object.isRequired,
  requester: PropTypes.object.isRequired
};

const mapStateToProps = ({school}) => school;

export default connect(mapStateToProps, null)(EmailSent);
