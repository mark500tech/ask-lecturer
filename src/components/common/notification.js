import React from 'react';
import {connect} from 'react-redux';
import {hideNotification} from "../../actions/notification";


class Notification extends React.Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isShown && nextProps.isShown) {
      setTimeout(() =>
        this.props.hideNotification(), 2000);
    }
  }

  render() {
    return this.props.isShown ?
      (
        <div className={`notification ${this.props.type}`}>
          <div>
            {this.props.text}
          </div>
        </div>
      )
      :
      (null);
  }
};

const mapStateToProps = (state) => ({
  isShown: state.notification.isShown,
  type: state.notification.type,
  text: state.notification.text
});

export default connect(mapStateToProps, {
  hideNotification
})(Notification);

