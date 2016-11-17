import * as types from '../constants/ActionTypes';
import toastr from 'toastr';

export function changeUserName(name) {
  return {
  	type: types.CHANGE_USER_NAME,
    name,
  };
}

export function fetchUserData() {
  return (dispatch, getState) => {

    const { user } = getState();
    const { name } = user;

    dispatch(fetchUserProfile(name));
    dispatch(fetchUserRepositories(name));
  };
}

function fetchUserProfile(userName) {
  return dispatch =>
    fetch(`https://api.github.com/users/${userName}`)
      .then(response => {

        if (!response.ok)
          throw new Error(response.statusText);

        return response.json(); 
      })
      .then(json => {

        const profile = {
          name: json.name,
          location: json.location,
          avatar: json.avatar_url,
          repos: json.public_repos,
          followers: json.followers,
          following: json.following,
        }
        
        dispatch(receiveUserProfile(profile));
      })
      .catch(err => { toastr.error(err); });
}

function fetchUserRepositories(userName) {
  return dispatch =>
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then(response => {

        if (!response.ok)
          throw new Error(response.statusText);

        return response.json();
      })
      .then(json => {
      	dispatch(receiveUserRepos(json));
      })
      .catch(err => { toastr.error(err); });
}

export function receiveUserProfile(profile) {
  return {
  	type: types.RECEIVE_USER_PROFILE,
  	profile,
  };
}

export function receiveUserRepos(repos)
{
  return {
  	type: types.RECEIVE_USER_REPOS,
  	repos,
  };
}