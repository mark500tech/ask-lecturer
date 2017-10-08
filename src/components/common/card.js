import React from 'react';
import Likes from './likes';

export default class Card extends React.Component {
  componentDidMount() {
    // send the id and height
    this.props.setHeight(this.el.offsetHeight, this.props.card.id);
  }

  _delete = () => {
    const { card, user } = this.props;

    if (card.userEmail === user.email) {
      return (
        <span onClick={(event) => this.handleDeleteClick(event, card.id, card.boardId)}>
          Delete
        </span>
      );
    }
  };

  handleDeleteClick = (event, id, boardId) => {
    event.stopPropagation();

    this.props.deleteCard(id, boardId);
  };

  render() {
    const { styles, card, user, color, cardHeader, type } = this.props;

    const hasLikes = card.likes > 0;
    const madeLike = hasLikes && card.usersMadeLike.includes(user.email);

    return (
      <div ref={ (el) => this.el = el }
           className="card" style={ styles } onClick={ this.props.onClick }>
        <div className="clickable-text delete-btn">
          { this._delete() }
        </div>

        <div className="card-header">
          { cardHeader }

          {
            color && (
              <div className='color' style={{ backgroundColor: this.props.color }}/>
            )
          }
        </div>

        {
          type === 'board' && (
            <div className='created-by'>
              Created by { this.props.card.userEmail }
            </div>
          )
        }

        <div className="card-content">
          { this.props.cardContent }
        </div>

        {
          type === 'question' && (
            <Likes amount={ this.props.card.likes }
                   makeLike={ this.props.makeLike }
                   isFilled={ hasLikes && madeLike }
                   style={{
                     cursor: this.props.user.email === this.props.card.userEmail
                       ? 'auto'
                       : 'pointer'
                   }}/>
          )
        }
      </div>
    );
  };
};

