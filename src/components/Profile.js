import React, { Component } from 'react';

class Profile extends Component {
  /*
  constructor(props) {
    super(props);
  }*/

  render() {
    const { name, location, avatar, repos, followers, following } = this.props;

    return (
      <div className="row">
       <div className="card center-block">
         <img src={avatar} style={{width: 200, marginTop: 20}} className="img-circle img-responsive center-block" alt={name}/>
         <h3 className="text-center">{name}</h3>
         <h4 className="text-center text-muted">{location}</h4>
         <div className="bg-primary" style={{height: 100, display: "flex"}}>
           <div className="profile-status">
             <h4>{followers}</h4>
             <h4>Followers</h4>
           </div>
           <div className="profile-status">
             <h4>{repos}</h4>
             <h4>Repositories</h4>
           </div>
           <div className="profile-status">
             <h4>{following}</h4>
             <h4>Following</h4>
           </div>
         </div>
       </div>
      </div>
    );
  }
}

export default Profile;