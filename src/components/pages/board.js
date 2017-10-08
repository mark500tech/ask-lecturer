import React from 'react';
import TextInput from "../common/textInput";
import Button from "../common/button";
import Card from '../common/card';
import cx from 'classnames';
import {sortBy, without, findIndex, find, isEqual} from 'lodash';

import {connect} from 'react-redux'

//actions
import {addQuestion, makeLike, getBoard, deleteQuestion} from "../../actions/board";
import {clearListeners, initListeners, signOut} from "../../actions/auth";
import UsersOnline from "../common/users-online";
//import {setDefaultRecentlyVisitedPage, setRecentlyVisitedPage} from "../../actions/recentlyVisitedPage";


class Board extends React.Component {
  constructor(props) {
    super();

    this.boardId = props.match.params.id;
    this.state = {
      currentQuestion: '',
      isGridView: false,
      content: '',
      positions: {}
    };

    this.heights = [];
  }

  componentWillMount() {
    this.props.getBoard(this.boardId);
  }

  componentDidMount() {
    this.checkAuth(this.props);
    this.props.initListeners(this.boardId);
    //this.props.setRecentlyVisitedPage(`/boards/${this.boardId}`);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  componentDidUpdate() {
    this.calcPositions();
  }

  calcPositions() {
    if (this.props.questions) {
      this.getPositions(this.props);
    }
  }

  componentWillUnmount() {
    this.props.clearListeners(this.boardId);
    //this.props.setDefaultRecentlyVisitedPage();
  }

  checkAuth(props) {
    if (!props.user.uid) {
      props.history.push('/login');
    }
  }

  handleAskClick = () => {
    if (this.state.content) {
      this.props.addQuestion(this.props.user.email, this.state.content, this.boardId);
      this.setState({
        content: ''
      });
    }
  };

  handleChangeTextInput = (value) => {
    this.setState({
      content: value
    });
  };

  handleViewChange = () => {
    this.setState({
      isGridView: !this.state.isGridView
    });
  };

  handleSignOutClick = () => {
    this.props.signOut();
    this.props.history.push('/login');
  };

  handleLikeClick = (question) => {
    let newUsersMadeLike = [];
    if (question.usersMadeLike) {
      newUsersMadeLike = question.usersMadeLike.splice(0);
    }

    if (question.userEmail !== this.props.user.email) {
      if (!newUsersMadeLike.includes(this.props.user.email)) {
        newUsersMadeLike.push(this.props.user.email);
        this.props.makeLike(question.id, question.likes + 1, newUsersMadeLike, question.boardId);
      } else {
        newUsersMadeLike = without(newUsersMadeLike, this.props.user.email);
        this.props.makeLike(question.id, question.likes - 1, newUsersMadeLike, question.boardId);
      }
    }
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.handleAskClick();
    }
  };

  handleBackClick = () => {
    this.props.history.push('/boards-manager');
  };

  setHeight = (height, id) => {
    this.heights.push({
      id,
      height
    });
  };

  getPositions(nextProps) {
    const {questions} = nextProps;
    const order = sortBy(questions, ['likes']).reverse().map((question) => question.id);

    let positions = {};

    order.forEach((o) => {
      const pos = findIndex(order, (li) => li === o);

      let position = 0;
      let i = 0;

      while (i < pos) {
        position += find(this.heights, (he) => he.id === order[i]).height + 20;
        i++;
      }

      positions[o] = position;
    });

    if (!isEqual(positions, this.state.positions)) {
      this.setState({positions});
    }
  }

  render() {
    const {isGridView} = this.state;
    const {questions} = this.props;
    const viewClass = cx('cards-grid', {
      grid: isGridView,
      list: !isGridView
    });

    const gridIconClass = cx('fa fa-th-large', {
      selected: isGridView
    });

    const listIconClass = cx('fa fa-th-list', {
      selected: !isGridView
    });

    const list = sortBy(questions, []);

    let style = {};

    return (
      <div className='cards'>
        <div className='header' style={{backgroundColor: this.props.color || '#444'}}>
          <h1>{this.props.title}</h1>
        </div>

        <p className='hello clickable-text'>
          Hello, {this.props.user.email}
          <span onClick={this.handleSignOutClick}>Sign Out</span>
        </p>

        <div className="search-bar">
          <TextInput placeholder="What do you want to ask..."
                     onChange={this.handleChangeTextInput}
                     value={this.state.content}
                     styles={
                       {
                         flex: 2,
                         marginRight: 20,
                         fontSize: 16
                       }
                     }
                     type='text'
                     onKeyUp={this.handleKeyUp}
          />

          <Button label="ask" styles={{flex: 1}} onClick={this.handleAskClick}/>

        </div>

        <div className="container">
          <div className="view-buttons">
            <i className={gridIconClass} onClick={this.handleViewChange}/>
            <i className={listIconClass} onClick={this.handleViewChange}/>
          </div>

          <div className={viewClass}>
            {
              list.map((question) => {
                  if (!isGridView) {
                    style = {
                      position: 'absolute',
                      top: 0,
                      transform: `translateY(${this.state.positions[question.id] || 0}px)`
                    };
                  }

                  return (
                    <Card key={question.id}
                          card={question}
                          styles={style}
                          setHeight={this.setHeight}
                          user={this.props.user}
                          makeLike={() => this.handleLikeClick(question)}
                          deleteCard={this.props.deleteQuestion}
                          isShowLikes={true}
                          cardHeader={question.userEmail}
                          cardContent={question.content}
                          type='question'
                    />
                  )
                }
              )
            }
          </div>

        </div>

        <UsersOnline/>
        <div className='back-button'>
          <i className="fa fa-chevron-left fa-5x" onClick={this.handleBackClick}></i>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.board.questions,
  title: state.board.title,
  color: state.board.color,
  user: state.user
});

export default connect(mapStateToProps, {
  addQuestion,
  makeLike,
  signOut,
  getBoard,
  deleteQuestion,
  initListeners,
  clearListeners,
  // setRecentlyVisitedPage,
  // setDefaultRecentlyVisitedPage
})(Board);

