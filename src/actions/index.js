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
    dispatch(fetchUserReposPage(name, 1));
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

function fetchUserReposPage(userName, page) {
  return dispatch =>
    fetch(`https://api.github.com/users/${userName}/repos?page=${page}`)
      .then(response => {

        if (!response.ok)
          throw new Error(response.statusText);

        return response.json();
      })
      .then(json => {
        
        // In order to get all user's repos, we iterate through pages 
        // until we get an empty array or the page number exceeds 10.

        if (Array.isArray(json) && json.length > 0) {

          dispatch(receiveUserRepos(json, (page > 1)));

          if (page < 10) {
            dispatch(fetchUserReposPage(userName, page + 1));
          }
        }
      })
      .catch(err => { toastr.error(err); });
}

export function receiveUserProfile(profile) {
  return {
  	type: types.RECEIVE_USER_PROFILE,
  	profile,
  };
}

export function receiveUserRepos(repos, addFlag)
{
  return {
  	type: types.RECEIVE_USER_REPOS,
  	repos,
    addFlag,
  };
}
