import React from 'react';

const TextInput = ({placeholder, styles, onChange, value, type, onKeyUp}) => (
  <input type={type}
         style={styles}
         className='text-input'
         placeholder={placeholder}
         onChange={(e) => onChange(e.target.value)}
         value={value}
         onKeyUp={onKeyUp}/>
);

export default TextInput;