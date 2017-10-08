import React from 'react';
import TextInput from "../common/textInput";
import Button from "../common/button";
import Card from '../common/card';
import {sortBy, isEqual, findIndex, find, has} from 'lodash';
import UsersOnline from "../common/users-online";
import cx from 'classnames';

import {connect} from 'react-redux'
import {addBoard, deleteBoard, getBoards} from "../../actions/boards";
import {clearListeners, initListeners, signOut} from "../../actions/auth";
import {getBoardInitState} from "../../actions/board";
import {showNotification} from "../../actions/notification";

class BoardsManager extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      tag: '',
      selectedColor: '#ff1744',
      positions: {},
      errorMessage: ''
    };

    this.heights = [];
  }

  componentWillMount() {
    this.props.getBoards();
  }

  componentDidMount() {
    this.checkAuth(this.props);
    this.props.initListeners();
    this.props.getBoardInitState();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  calcPositions() {
    if (this.props.boards) {
      this.getPositions(this.props);
    }
  }

  getPositions(nextProps) {
    const {boards} = nextProps;
    const order = sortBy(boards, []).reverse().map((board) => board.id);

    let positions = {};

    order.forEach((o) => {
      const pos = findIndex(order, (li) => li === o);

      let position = 0;
      let i = 0;

      while(i < pos) {
        position += find(this.heights, (he) => he.id === order[i]).height + 20;
        i++;
      }

      positions[o] = position;
    });

    if (!isEqual(positions, this.state.positions)) {
      this.setState({positions});
    }
  }


  componentWillUnmount() {
    this.props.clearListeners();
  }

  componentDidUpdate() {
    this.calcPositions();
  }

  checkAuth(props) {
    //debugger;
    if (!props.user.uid) {
      props.history.push('/login');
    }
  }

  handleCreateClick = () => {
    if (this.state.title && this.state.tag && this.validateTag()) {
      if (has(this.props.boards, this.state.tag)) {
        this.props.showNotification('warning', `The board with tag '${this.state.tag}' already exists!`);
        return;
      }

      this.props.addBoard(this.props.user.email, this.state.title, this.state.tag, this.state.selectedColor);
      this.setState({
        title: '',
        tag: ''
      });
    }
  };


  validateTag = (value) => {
    const tagRegEx = /^[a-zA-Z0-9_.-]*$/;

    if (!tagRegEx.test(value)) {
      return false;
    }

    return true;
  };

  handleCardClick = (id) => {
    this.props.history.push(`/boards/${id}`)
  };

  handleChangeTextInput = (value, type) => {
    if (type === 'tag' && !this.validateTag(value)) {
      return;
    }

    this.setState({
      [type]: value
    });
  };

  handleSignOutClick = () => {
    this.props.signOut();
    this.props.history.push('/login');
  };

  handleChangeColor(color) {
    this.setState({
      selectedColor: color
    });
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.handleCreateClick();
    }
  };

  setHeight = (height, id) => {
    this.heights.push({
      id,
      height
    });
  };

  render() {
    const list = sortBy(this.props.boards, []);
    const colors = [
      '#ff1744',
      '#4a148c',
      '#8e24aa',
      '#651fff',
      '#2962ff',
      '#00b7d7',
      '#00d368',
      '#d01723',
      '#ff6536',
      '#ff8820'
    ];

    let style = {};

    return (
      <div className='cards boards'>
        <div className='header' style={{backgroundColor: this.state.selectedColor}}>
          <h1>Boards Manager</h1>
        </div>
        <p className='hello clickable-text'>
          Hello, {this.props.user.email}
          <span onClick={this.handleSignOutClick}>Sign Out</span>
        </p>
        <div className="search-bar">
          <div className="row">
            <TextInput placeholder="Title"
                       onChange={(value) => this.handleChangeTextInput(value, 'title')}
                       value={this.state.title}
                       styles={
                         {
                           flex: 1,
                           marginRight: 20,
                           fontSize: 16
                         }
                       }
                       type='text'
                       onKeyUp={this.handleKeyUp}
            />
            <TextInput placeholder="Tag"
                       onChange={(value) => this.handleChangeTextInput(value, 'tag')}
                       value={this.state.tag}
                       styles={
                         {
                           flex: 1,
                           marginRight: 20,
                           fontSize: 16
                         }
                       }
                       type='text'
                       onKeyUp={this.handleKeyUp}
            />
            <Button label="create" styles={{flex: 1}} onClick={this.handleCreateClick}/>
          </div>
          <div className="colors">
            {
              colors.map((color, index) => {
                const colorClass = cx('color', {
                  selected: color === this.state.selectedColor
                });

                return (
                  <div className={colorClass}
                       onClick={() => this.handleChangeColor(color)}
                       style={{background: color}}
                       key={index}/>
                );
              })
            }
          </div>
        </div>
        <div className="container">
          <div className='cards-grid list'>
            {
              list.map((board) => {
                  style = {
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    transform: `translateY(${this.state.positions[board.id] || 0}px)`
                  };


                  return (
                    <Card key={board.id}
                          card={board}
                          setHeight={this.setHeight}
                          styles={style}
                          user={this.props.user}
                          deleteCard={this.props.deleteBoard}
                          onClick={() => this.handleCardClick(board.id)}
                          cardHeader={board.title}
                          cardContent={`/${board.id}`}
                          color={board.color}
                          type='board'
                    />
                  )
                }
              )
            }
          </div>
        </div>
        <UsersOnline/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  user: state.user
});

export default connect(mapStateToProps, {
  addBoard,
  signOut,
  getBoards,
  deleteBoard,
  initListeners,
  clearListeners,
  getBoardInitState,
  showNotification
})(BoardsManager);

