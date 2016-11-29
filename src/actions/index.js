import * as types from '../constants/ActionTypes';
import toastr from 'toastr';

function changeReposSortBy(field) {
  return {
    type: types.CHANGE_REPOS_SORT_BY,
    sortBy: field,
  };
}

export function changeUserName(name) {
  return {
  	type: types.CHANGE_USER_NAME,
    name,
  };
}

export function changeActivePage(page) {
  return {
    type: types.CHANGE_ACTIVE_PAGE,
    activePage: page,
  };
}

export function changePath(path) {
  return {
    type: types.CHANGE_PATH,
    path,
  };
}

export function fetchIssues(repo) {
  return dispatch => 
    fetch(`https://api.github.com/repos/${repo}/issues?state=open`)
      .then(response => {

        if (!response.ok)
          throw new Error(response.statusText);

        return response.json(); 
      })
      .then(json => {
        // Remove "pull_requests" from issues
        const issues = json.filter(issue => !issue.pull_request);
        dispatch(receiveIssues(issues));
      })
      .catch(err => { toastr.error(err); });
}

export function sortRepos(field) {
  return (dispatch, getState) => {
    const { repositories } = getState();
    const { repos } = repositories;

    dispatch(changeReposSortBy(field));
    const sortedRepos = repos.slice();

    if (field === "name") {
      sortedRepos.sort((x, y) => x.name.localeCompare(y.name));
    }

    if (field === "stars") {
      sortedRepos.sort((x, y) => y.stargazers_count - x.stargazers_count);
    }

    if (field === "forks") {
      sortedRepos.sort((x, y) => y.forks_count - x.forks_count);
    }    

    dispatch(receiveUserRepos(sortedRepos, false));    
  }
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
        // until we get an empty array or the page number exceeds 40.

        if (Array.isArray(json) && json.length > 0) {

          // Reset active pagination page to 1 if we successfully loaded new user repos
          if (page === 1) {
            dispatch(changeActivePage(1));
            dispatch(changeReposSortBy("name"));
          }

          dispatch(receiveUserRepos(json, (page > 1)));

          if (page < 40) {
            dispatch(fetchUserReposPage(userName, page + 1));
          }
        }
        else {
          // Array is empty. This means no more data. So sort repos list by popularity.
          dispatch(sortRepos("stars"));
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

export function receiveIssues(issues) {
  return {
    type: types.RECEIVE_ISSUES,
    issues,
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
