import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import {Pagination, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import { changeActivePage, sortRepos } from '../actions/index';

class RepoList extends Component {

  constructor(props) {
    super(props);

    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.sortBy = this.sortBy.bind(this);    
  }

  handlePageSelect(eventKey) {
    const { dispatch } = this.props;

    dispatch(changeActivePage(eventKey));
  }

  sortBy(field) {
    const { dispatch } = this.props;

    dispatch(sortRepos(field));
  }

  render() {
    const { repos, activePage, sortBy } = this.props;
    const pageCount = Math.ceil(repos.length / 10);
    const start = (activePage - 1) * 10;
    const reposToShow = repos.slice(start, start + 10);

   const sortByOptions = [
      {key: 'name', text: 'Name'},
      {key: 'stars', text: 'Stars'},
      {key: 'forks', text: 'Forks'},
    ];

    return (
      <div style={{marginTop: 30}}>
        <div className="row">

          <div className="col-sm-1" style={{marginTop: 19}}>
            <ButtonToolbar>
              <DropdownButton bsSize="small" title={`Sort By: ${sortBy}`} id="sort-by-dropdown">
                {
                  sortByOptions.map(item => <MenuItem key={item.key} onClick={() => this.sortBy(item.key)}
                      active={sortBy === item.key}>{item.text}</MenuItem>)
                }
              </DropdownButton>
            </ButtonToolbar>
          </div>

          <div className="col-sm-offset-5 col-sm-6 text-right">
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
        <a href={`#/${repo.owner.login}/${repo.name}`}><h4 className="text-primary">{repo.name}</h4></a>
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