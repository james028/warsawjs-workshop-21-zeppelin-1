import { createAction } from 'redux-actions';

import * as actionTypes from './actionTypes';
import * as api from './api';
import { getUserName } from './selectors';

const startLogin = createAction(actionTypes.LOGIN_START);
const endLogin = createAction(actionTypes.LOGIN_END);

export function login({ username, password }) {
  return (dispatch, getState) => {
    dispatch(startLogin());
    return api
      .login({ username, password })
      .then((data) => {
        if (data.ok) {
          dispatch(endLogin({ username: data.username }));
        } else {
          dispatch(endLogin(new Error(data.errors.join('\n'))));
        }
      })
      .catch((error) => {
        dispatch(endLogin(new Error('Network error')));
      });
  };
}

export const logout = createAction(actionTypes.LOGOUT);

const startReadProjectList = createAction(actionTypes.READ_PROJECT_LIST_START);
const endReadProjectList = createAction(actionTypes.READ_PROJECT_LIST_END);

export function readProjectList() {
  return (dispatch, getState) => {
    dispatch(startReadProjectList());
    return api
      .readPostList()
      .then((response) => {
        dispatch(endReadProjectList(response.posts));
      })
      .catch((error) => {
        dispatch(endReadProjectList(new Error('Network error')));
      });
  };
}

const startReadProject = createAction(actionTypes.READ_PROJECT_START);
const endReadProject = createAction(actionTypes.READ_PROJECT_END);

export function readProject(projectId) {
  return (dispatch, getState) => {
    dispatch(startReadProject());
    return api
      .readPost(projectId)
      .then((response) => {
        dispatch(endReadProject({ ...response.post, id: projectId }));
      })
      .catch((error) => {
        dispatch(endReadProject(new Error('Network error')));
      })
  };
}

const startCreateProject = createAction(actionTypes.CREATE_PROJECT_START);
const endCreateProject = createAction(actionTypes.CREATE_PROJECT_END);

export function createProject({ title, image }) {
  return (dispatch, getState) => {
    dispatch(startCreateProject());
    const username = getUserName(getState());
    return api
      .createPost({ username, title, image })
      .then((response) => {
        dispatch(endCreateProject(response));
      })
      .catch((error) => {
        dispatch(endCreateProject(new Error('Network error')));
      });
  };
}
