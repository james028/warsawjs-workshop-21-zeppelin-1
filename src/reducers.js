import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

/*
Auth state shape:

{
  auth: {
    isPending: Boolean,
    username: String? ,
  },
}
*/

const DEFAULT_AUTH_STATE = {
  isPending: false,
  username: null,
};

function auth(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return { ...state, username: null, isPending: true };
    case actionTypes.LOGIN_END:
      return action.error
        ? { ...state, username: null, isPending: false }
        : { ...state, username: action.payload.username, isPending: false };
    case actionTypes.LOGOUT:
      return DEFAULT_AUTH_STATE;
    default:
      return state || DEFAULT_AUTH_STATE;
  }
}

/*
Posts state shape:

{
  posts: {
    isPending: Boolean,
    items: Array?,
  }
}
*/

const DEFAULT_PROJECTS_STATE = {
  isPending: false,
  projects: null,
};

function mergeItem(items, newItem) {
  if (!items) {
    return [newItem];
  } else {
    let oldItem = items.find(it => it.id === newItem.id);
    if (oldItem) {
      Object.assign(oldItem, newItem);
    } else {
      items.push(newItem);
    }
    return items;
  }
}

function projects(state, action) {
  switch (action.type) {
    case actionTypes.READ_PROJECT_LIST_START:
      return { ...state, isPending: true };
    case actionTypes.READ_PROJECT_LIST_END:
      return action.error
        ? { ...state, items: null, isPending: false }
        : { ...state, items: action.payload, isPending: false };
    case actionTypes.READ_PROJECT_START:
      return { ...state, isPending: true };
    case actionTypes.READ_PROJECT_END:
      return action.error
        ? { ...state, isPending: false }
        : { ...state, items: mergeItem(state.items, action.payload), isPending: false };
    case actionTypes.LOGOUT:
      return DEFAULT_PROJECTS_STATE;
    default:
      return state || DEFAULT_PROJECTS_STATE;
  }
}

export default combineReducers({
  auth,
  projects,
});
