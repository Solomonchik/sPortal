import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class UserLocationFilter extends Component {
  render() {
    const { allUsers } = this.props.allUsers;
    const filteredLocations = allUsers.filter(user => {
      if (this.props.query === "") {
        return true;
      }
      return user.location.indexOf(this.props.query) !== -1;
    });

    let placeholderUrl = require("../../img/placeholderUser.png");

    return (
      <div className="UserCardsItems">
        {filteredLocations.map(oneUser => {
          if (oneUser.confirmed) {
            return (
              <div className="CardItem" key={oneUser._id}>
                {oneUser.userImage.length === 0 ? (
                  <div
                    className="profileImg"
                    style={{
                      backgroundImage: "url(" + placeholderUrl + ")"
                    }}
                  />
                ) : (
                  <div
                    className="profileImg"
                    style={{
                      backgroundImage:
                        "url(" +
                        `http://localhost:8080/uploads/${oneUser.userImage}` +
                        ")"
                    }}
                  />
                )}

                <div className="userName">
                  <p>{oneUser.firstName}</p>
                  <p> {oneUser.lastName}</p>
                </div>
                <div className="locationAndAvailability">
                  <div className="location">{oneUser.location}</div>
                  <div className="Availability">
                    <p>Availability</p>
                    <p style={{ color: "white" }}>Available for offers</p>
                  </div>
                </div>
                <div className="CardLinks">
                  <NavLink title="Linked In" to="#">
                    <img src={require("../../img/linkedin-icon.png")} alt="" />
                  </NavLink>
                  <NavLink title="GitHub" to="#">
                    <img src={require("../../img/github-icon.png")} alt="" />
                  </NavLink>
                  <NavLink title="Xing" to="#">
                    <img src={require("../../img/xing-icon.png")} alt="" />
                  </NavLink>
                  <NavLink title="Portfolio" to="#">
                    <img src={require("../../img/briefcase-icon.png")} alt="" />
                  </NavLink>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers
  };
}

export default connect(mapStateToProps)(UserLocationFilter);