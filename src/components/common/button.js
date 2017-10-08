import React from 'react';

const Button = ({ label, styles, onClick }) => (
  <div className="button" style={ styles } onClick={ onClick }>
    { label }
  </div>
);

export default Button;