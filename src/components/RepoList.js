import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import {Pagination} from 'react-bootstrap';
import { setActivePage } from '../actions/index';

class RepoList extends Component {

  constructor(props) {
    super(props);

    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  handlePageSelect(eventKey) {
    const { dispatch } = this.props;

    dispatch(setActivePage(eventKey));
  }

  render() {
    const { repos, activePage } = this.props;
    const pageCount = Math.ceil(repos.length / 10);
    const start = (activePage - 1) * 10;
    const reposToShow = repos.slice(start, start + 10);

    return (
      <div style={{marginTop: 30}}>
        <div className="row">
          <div className="col-sm-offset-6 col-sm-6 text-right">
            {
              <Pagination
                style={repos.length > 10 ? {} : {display: "none"}}
                bsSize="medium"
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                items={pageCount}
                activePage={activePage}
                onSelect={this.handlePageSelect}
              /> 
            }
          </div>
        </div>

        <div className="row">
          { reposToShow.map(repo => this.renderRepo(repo)) }
        </div>
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