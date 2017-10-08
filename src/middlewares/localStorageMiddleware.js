// import * as AT from "../constants/action-types";
//
// const LocalStorageMiddleware = store => next => action => {
//   switch (action.type) {
//     case AT.SET_RECENTLY_VISITED_PAGE:
//       window.localStorage.setItem('recentlyVisitedPage', action.payload.url);
//       break;
//
//     case AT.SET_DEFAULT_RECENTLY_VISITED_PAGE:
//       window.localStorage.setItem('recentlyVisitedPage', '/boards-manager');
//       break;
//
//     case AT.GET_RECENTLY_VISITED_PAGE:
//       window.localStorage.getItem('recentlyVisitedPage');
//       break;
//
//     default:
//       break;
//   }
//
//   return next(action);
// };
//
// export default LocalStorageMiddleware;