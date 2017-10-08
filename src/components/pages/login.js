import React from 'react';
import Inputs from './login/inputs';
import Footer from './login/footer';
import {connect} from 'react-redux';
import {signIn, signUp} from '../../actions/auth';
//import {getRecentlyVisitedPage, setDefaultRecentlyVisitedPage} from "../../actions/recentlyVisitedPage";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      modeLogIn: true,
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('next', nextProps.recentlyVisitedPage);
    // console.log('this', this.props.recentlyVisitedPage);
    // debugger;
    //if (nextProps.recentlyVisitedPage !== this.props.recentlyVisitedPage) {
      this.checkAuth(nextProps);
    //}
  }

  checkAuth(props) {
    if (props.user.uid) {
      // console.log(this.props.recentlyVisitedPage);
      // debugger;
      //props.history.push(this.props.recentlyVisitedPage);
      props.history.push('/boards-manager');
    }
  }

  toggleMode = () => {
    this.setState({
      modeLogIn: !this.state.modeLogIn,
      errorMessage: ''
    });
  };

  validate() {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegEx = /^.{6,15}$/;

    if (!emailRegEx.test(this.state.email)) {
      this.setState({
        errorMessage: 'The email is not correct!'
      });

      return false;
    }

    if (!this.state.password || !passwordRegEx.test(this.state.password)) {
      this.setState({
        errorMessage: 'The password must contain at least 6 and not more than 15 characters!'
      });

      return false;
    }

    if (!this.state.modeLogIn && this.state.password !== this.state.passwordAgain) {
      this.setState({
        errorMessage: 'The passwords do not match!'
      });

      return false;
    }

    return true;
  }

  handleSubmit = () => {
    const {
      modeLogIn,
      email,
      password
    } = this.state;

    // validation
    const valid = this.validate();

    if (valid) {
      if (modeLogIn) {
        this.props.signIn(email, password);
      } else {
        // sign up
        this.props.signUp(email, password);
      }
    }
  };

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div className="login">
        <div className="box">
          <h1>
            Ask the lecturer
          </h1>

          <Inputs modeLogIn={this.state.modeLogIn}
                  onChange={this.handleChange}
                  onKeyUp={this.handleKeyUp}/>

          <Footer modeLogIn={this.state.modeLogIn}
                  onClick={this.handleSubmit}
                  toggleMode={this.toggleMode}
                  errorMessage={this.state.errorMessage}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  //recentlyVisitedPage: state.recentlyVisitedPage
});

export default connect(mapStateToProps, {
  signUp,
  signIn
})(Login);

