import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/App.css';

import SearchContainer from '../containers/SearchContainer';
import ProfileContainer from '../containers/ProfileContainer';
import RepoListContainer from '../containers/RepoListContainer';
import IssueListContainer from '../containers/IssueListContainer';

import { fetchUserData, changePath } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.onHashChange = this.onHashChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserData());

    window.addEventListener("hashchange", this.onHashChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.onHashChange, false);
  }

  onHashChange() {
    const { dispatch } = this.props;
    dispatch(changePath(window.location.hash));
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
          {
            this.props.path.substr(0, 2) === "#/" ?
              <IssueListContainer repo={this.props.path.slice(2)} />
              //<div>Repo info: {this.props.path.slice(2)}</div>
              :
              <div>
                <SearchContainer />
                <ProfileContainer />
                <RepoListContainer />
              </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { router } = state;
  const { path } = router;
  
  return { 
    path,
  };
}

export default connect(mapStateToProps)(App);
