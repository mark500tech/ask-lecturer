import React from 'react';
import Button from '../../common/button';

const Footer = props => (
  <div>
    <div className="clickable-text">
      <p>
        {props.modeLogIn ? 'Not a member?' : 'Already a member?'}
        <span onClick={props.toggleMode}>
              {props.modeLogIn ? 'Sign up' : 'Sign in'}
        </span>
      </p>
    </div>
    <div className='error-message'>
      {props.errorMessage}
    </div>
      <Button styles={{marginTop: 40}}
              onClick={props.onClick}
              label={props.modeLogIn ? 'sign in' : 'sign up'} />
  </div>
);

export default Footer;