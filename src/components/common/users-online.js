import React from 'react';
import {connect} from 'react-redux';
import {find} from 'lodash/fp'

class UsersOnline extends React.Component {
  constructor() {
    super();

    this.state = {
      isPannelShown: false
    };
  }

  getPanelClass = () => this.state.isPannelShown ? ('users-panel on') : ('users-panel');

  togglePanel = () => {
    this.setState({
      isPannelShown: !this.state.isPannelShown
    })
  };

  _userEmails = () => {
    const userEmails = [];

    for (const key in this.props.usersOnline) {
      if (!find({email: this.props.usersOnline[key].email}, userEmails)) {
        userEmails.push({
          key,
          email: this.props.usersOnline[key].email
        });
      }
    }

    return (
      <div className='user-emails'>
        <ul>
          {
            userEmails.map((email) => (
                <li key={email.key}>
                  {email.email}
                </li>
              )
            )
          }
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div className='users-online-container'>
        <div className={this.getPanelClass()}>
          <div className='users-list'>
            <div className='users-button' onClick={this.togglePanel}>
              <i className="fa fa-users"/>
            </div>
            <div className="title">online users</div>
            {this._userEmails()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersOnline: state.usersOnline
});

export default connect(mapStateToProps, undefined)(UsersOnline);
