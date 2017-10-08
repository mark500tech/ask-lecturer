import React from 'react';

export default class Likes extends React.Component {

  handleClick = () => {
    this.props.makeLike();
  };

  _blank() {
    let {amount} = this.props;
    if (amount === 0) {
      amount = '';
    }
    return (
      <div className="empty-likes">
        <i className="fa fa-heart-o" onClick={this.handleClick} style={this.props.style}/>
        <div>{amount}</div>
      </div>
    );
  }

  _filled() {
    const {amount} = this.props;

    return (
      <div className="filled-likes">
        <i className="fa fa-heart" onClick={this.handleClick} style={this.props.style}/>
        <div>{amount}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="likes">
        {this.props.isFilled ? this._filled() : this._blank()}
      </div>
    );
  }
}

