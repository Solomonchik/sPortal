import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, filterLocation } from "../../actions/user";
import TopNavigation from "../navigation/TopNavigation";
import UsersCards from "../forms/UsersCards";
import Footer from "../navigation/Footer";
import Search from "../forms/Search";

class UserCardParent extends Component {
  constructor() {
    super();

    this.state = {
      query: ""
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  searchChanged = query => {
    console.log("location query", query);
    this.setState({ query: query });
  };

  render() {
    let { isAuthenticated } = this.props;
    const { allUsers } = this.props.allUsers;


    return (
      <div className="UserCardsCont">
        <div className="navigationBarUserCardPage">
          {isAuthenticated && <TopNavigation />}
          {!isAuthenticated && (
            <div className="navigationBar">
              <Link to="/" className="label">
                <span>DCI</span>
              </Link>
              <ul>
                <li>
                  <Link to="/login">
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="UserCardsListCont">
          <h1>OUR STUDENTS</h1>
          <h3>GRADUATED</h3>
          <Search allUsers={allUsers} searchChanged={this.searchChanged} />
          <UsersCards query={this.state.query} />
        </div>
        <div className="UserCardFooter">
          <Footer/>
        </div>
      </div>
    );
  }
}

UserCardParent.propTypes = {
  allUsers: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers,
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStateToProps,
  { getAllUsers, filterLocation }
)(UserCardParent);
