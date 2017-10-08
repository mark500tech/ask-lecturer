import Firebase from 'firebase';

import { setUser } from "../actions/user";
import { setLoadingStatus } from "../actions/status";
import { showNotification } from "../actions/notification";

import * as AT from '../constants/action-types';

export default class FB {
  constructor(config) {
    this.dispatch = config.dispatch;

    this.init();
  }

  init() {
    const config = {
      apiKey: "AIzaSyCql26V9YxPR1hX0f9hIkfu-a7yxTMuLaM",
      authDomain: "ask-lecturer.firebaseapp.com",
      databaseURL: "https://ask-lecturer.firebaseio.com",
      projectId: "ask-lecturer",
      storageBucket: "",
      messagingSenderId: "814049577867"
    };

    Firebase.initializeApp(config);

    this.listeners = [];
    this.database = Firebase.database();
    this.userListRef = this.database.ref().child('users');

    this.onAuthChange();
  }

  initListeners(boardId) {
    this.addListener(boardId);
    this.deleteListener(boardId);
    this.editListener(boardId);
    this.userListener()
  }

  clearListeners(boardId) {
    if (boardId) {
      this.database.ref(`boards/${boardId}/questions`).off();
    } else {
      this.database.ref('boards').off();
    }
  }

  onAuthChange = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //User is signed in
        // console.warn(user, 'user is signed in');

        //Adding user to the database
        this.userRef = this.userListRef.push({email: user.email});
        this.userRef.onDisconnect().remove();

        this.dispatch(setUser(user));
      } else {
        // User is signed out.
        // console.warn('user is signed out');
      }

      // Don't remove loader before it makes a full circle
      setTimeout(() => {
        this.dispatch(setLoadingStatus(false));
      }, 1000);
    });
  };

  signup({email, password}) {
    //this.dispatch(setLoadingStatus(true));

    Firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      this.dispatchFailureAction(AT.SIGN_UP);
      this.dispatch(setLoadingStatus(false));
      this.dispatch(showNotification('warning', error.message));
    });
  }

  signin({email, password}) {
    //this.dispatch(setLoadingStatus(true));

    Firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      this.dispatchFailureAction(AT.SIGN_IN);
      this.dispatch(setLoadingStatus(false));
      this.dispatch(showNotification('warning', error.message));
    });
  }

  add(path, payload) {
    //adding question
    this.database.ref(path).set(payload).then(() => {
      this.dispatch(showNotification('success', 'The card was added successfully!'))
    });
  }

  get(path, nextAction) {
    Firebase.database().ref(path).once('value').then((snapshot) => {
      this.dispatchSuccessAction(nextAction, snapshot.val());
    });
  }

  delete(path) {
    //deleting question
    this.database.ref(path).remove().then(() => {
      this.dispatch(showNotification('success', 'The card was deleted successfully!'))
    });
  }

  edit({ id, likes, boardId, usersMadeLike }) {
    const ref = this.database.ref(`boards/${boardId}/questions/${id}`);

    ref.update({likes, usersMadeLike});
  }

  addListener(boardId) {
    if (boardId) {
      this.database.ref(`boards/${boardId}/questions`).on('child_added', (snapshot) => {
        this.dispatchSuccessAction(AT.ADD_QUESTION, snapshot.val());
      });
    } else {
      this.database.ref('boards').on('child_added', (snapshot) => {
        this.dispatchSuccessAction(AT.ADD_BOARD, snapshot.val());
      });
    }
  }

  deleteListener(boardId) {
    if (boardId) {
      this.database.ref(`boards/${boardId}/questions`).on('child_removed', (snapshot) => {
        this.dispatchSuccessAction(AT.DELETE_QUESTION, snapshot.val().id);
      });
    } else {
      this.database.ref('boards').on('child_removed', (snapshot) => {
        this.dispatchSuccessAction(AT.DELETE_BOARD, snapshot.val().id);
      });
    }
  }

  editListener(boardId) {
    this.database.ref(`boards/${boardId}/questions/`).on('child_changed', (snapshot) => {
      this.dispatchSuccessAction(AT.MAKE_LIKE, {
        id: snapshot.val().id,
        likes: snapshot.val().likes,
        usersMadeLike: snapshot.val().usersMadeLike
      });
    });
  }

  userListener() {
    this.userListRef.on('value', (snapshot) => {
      this.dispatchSuccessAction(AT.GET_ONLINE_USERS, snapshot.val());
    })
  }

  signout = () => {
    this.userRef.remove();

    Firebase.auth().signOut().then(() => {
      this.dispatchSuccessAction(AT.SIGN_OUT);
    }).catch((error) => {
      // An error happened.
    });
  };

  dispatchSuccessAction(action, payload) {
    this.dispatch({
      type: action.SUCCESS,
      payload
    })
  };

  dispatchFailureAction(action, payload) {
    this.dispatch({
      type: action.FAILURE,
      payload
    })
  };
};