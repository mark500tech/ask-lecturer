import React from 'react';
import TextInput from "../../common/textInput";

const Inputs = props => props.modeLogIn
  ? (
    <div className="inputs">
      <TextInput placeholder="Email"
                 onChange={(email) => props.onChange('email', email)}
                 type='text'
                 onKeyUp={props.onKeyUp}/>
      <TextInput placeholder="Password"
                 onChange={(password) => props.onChange('password', password)}
                 type='password'
                 onKeyUp={props.onKeyUp}/>
    </div>
  )
  : (
    <div className="inputs">
      <TextInput placeholder="Email"
                 onChange={(email) => props.onChange('email', email)}
                 type='text'
                 onKeyUp={props.onKeyUp}/>
      <TextInput placeholder="Password"
                 onChange={(password) => props.onChange('password', password)}
                 type='password'
                 onKeyUp={props.onKeyUp}/>
      <TextInput placeholder="Password confirmation"
                 onChange={(passwordAgain) => props.onChange('passwordAgain', passwordAgain)}
                 type='password'
                 onKeyUp={props.onKeyUp}/>
    </div>
  );

export default Inputs;