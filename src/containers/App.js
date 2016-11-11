import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/App.css';

import SearchContainer from '../containers/SearchContainer';
import ProfileContainer from '../containers/ProfileContainer';
import RepoListContainer from '../containers/RepoListContainer';

import { fetchUserData } from '../actions/index';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserData());
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <SearchContainer />
            <ProfileContainer />
            <RepoListContainer />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
