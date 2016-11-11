import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'

class RepoList extends Component {
  /*
  constructor(props) {
    super(props);
  }*/

  render() {
    const { repos } = this.props;

    return (
      <div className="row"  style={{marginTop: 30}}>
        { repos.map(repo => this.renderRepo(repo)) }
      </div>
    );
  }  

  renderRepo(repo) {
    return (
      <div className="repo-row" key={repo.id}>
        <h4 className="text-primary">{repo.name}</h4>
        <p>{repo.description}</p>
        <p>
          <span className="label label-success">{repo.language}</span>

          <FontAwesome name="star" style={{marginLeft: 20, marginRight: 3}} />
          <span>{repo.stargazers_count}</span>

          <FontAwesome name="code-fork" style={{marginLeft: 20, marginRight: 4}} />
          <span>{repo.forks_count}</span>
        </p>
      </div>
    );
  }
}

export default RepoList;