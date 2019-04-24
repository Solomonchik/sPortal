import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TopNavigation from "../navigation/TopNavigation";
import {getUserData, updateProfile, updateImage} from "../../actions/user";
import UpdateUserProfileForm from "../forms/UpdateUserProfileForm";

class UserDashboardPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.userImageRef = React.createRef();
  }

  componentDidMount() {
    const {email} = this.props.user;
    this.props.getUserData(email);
  }

  updateProfile = data => this.props.updateProfile(data);

  submitUploadImage = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("id", this.props.oneUser._id);
    formData.append("userImage", this.userImageRef.current.files[0]);
    this.props.updateImage(formData);
  };

  render() {
    const {
      firstName,
      lastName,
      // email,
      location,
      studentClass,
      userImage,
      githubLink,
      linkedInLink,
      portfolioLink,
      xingLink,
      availability
    } = this.props.oneUser;

    let placeholderUrl = require("../../img/empty-profile.png");

    let formattedAvailability = "";
    if (availability && typeof availability === "string") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let tmp = new Date(availability);
      formattedAvailability =
        monthNames[tmp.getMonth()] +
        " " +
        tmp.getDate() +
        ", " +
        tmp.getFullYear();
    }

    return (
        <div className="UserPage">
          <div className="navigationBarUserPage">
            <TopNavigation/>
          </div>
          <div className="UserPageCont">
            <div className="InfoCont">
              <div className="infoBoxCont">
                <h3>Info Box</h3>
                <div className="SubBoxCont">
                  <div className="userImageUploadCont">
                    {!userImage ? (
                        <form>
                          <label
                              htmlFor="imgupload"
                              style={{
                                cursor: "pointer"
                              }}
                          >
                            <div
                                className="userProfileImage"
                                style={{
                                  backgroundImage: "url(" + placeholderUrl + ")"
                                }}
                            >
                              <div className="addHoverImg">
                                <img
                                    src={require('../../img/add-img.png')}
                                    alt=""/>
                              </div>
                            </div>
                          </label>
                          <input
                              id="imgupload"
                              ref={this.userImageRef}
                              type="file"
                              name="userImageRef"
                              onChange={this.submitUploadImage}
                              style={{display: "none"}}
                          />
                        </form>
                    ) : (
                        <form>
                          <label
                              htmlFor="imgupload"
                              style={{
                                cursor: "pointer",
                                display: "block"
                              }}
                          >
                            <div
                                className="userProfileImage"
                                style={{
                                  backgroundImage:
                                      "url(" +
                                      `http://localhost:8080/uploads/${userImage}` +
                                      ")"
                                }}
                            >
                              <div className="addHoverImg">
                                <img
                                    src={require('../../img/add-img.png')}
                                    alt=""/>
                              </div>
                            </div>

                          </label>
                          <input
                              id="imgupload"
                              ref={this.userImageRef}
                              type="file"
                              name="userImageRef"
                              onChange={this.submitUploadImage}
                              style={{display: "none"}}
                          />
                        </form>
                    )}
                  </div>
                  <div className="profileInfoCont">
                    <div className="profileInfoItem">
                      <h2>First Name</h2>
                      <p>{firstName}</p>
                    </div>
                    <div className="profileInfoItem">
                      <h2>Last Name</h2>
                      <p>{lastName}</p>
                    </div>
                    <div className="profileInfoItem">
                      <h2>Location</h2>
                      <p>{location}</p>
                    </div>
                    <div className="profileInfoItem">
                      <h2>Class</h2>
                      <p>{studentClass}</p>
                    </div>
                    <div className="profileInfoItem">
                      <h2>Available from</h2>
                      <p>{formattedAvailability}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="linksBoxCont">
                <h1>Links</h1>
                <div className="linksBoxItems">
                  {!linkedInLink ? (
                      <div className="linksBoxItem">
                        <img src={require("../../img/linkedin-icon.png")} alt=""/>
                        <p style={{color: "#da9446"}}>
                          Please add your LinkedIn ....
                        </p>
                        <a
                            style={{display: "none"}}
                            href={linkedInLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                      </div>
                  ) : (
                      <div className="linksBoxItem">
                        <img src={require("../../img/linkedin-icon.png")} alt=""/>
                        <a
                            href={linkedInLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <p>{linkedInLink}</p>
                        </a>
                      </div>
                  )}
                  {!xingLink ? (
                      <div className="linksBoxItem">
                        <img src={require("../../img/xing-icon.png")} alt=""/>
                        <p style={{color: "#da9446"}}>Please add your Xing....</p>
                        <a
                            href={xingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                      </div>
                  ) : (
                      <div className="linksBoxItem">
                        <img src={require("../../img/xing-icon.png")} alt=""/>
                        <a
                            href={xingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <p>{xingLink}</p>
                        </a>
                      </div>
                  )}
                  {!githubLink ? (
                      <div className="linksBoxItem">
                        <img src={require("../../img/github-icon.png")} alt=""/>
                        <p style={{color: "#da9446"}}>
                          Please add your Github....
                        </p>
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                      </div>
                  ) : (
                      <div className="linksBoxItem">
                        <img src={require("../../img/github-icon.png")} alt=""/>
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <p>{githubLink}</p>
                        </a>
                      </div>
                  )}
                  {!portfolioLink ? (
                      <div className="linksBoxItem">
                        <img src={require("../../img/briefcase-icon.png")} alt=""/>
                        <p style={{color: "#da9446"}}>
                          Please add your Portfolio....
                        </p>
                        <a
                            href={portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                      </div>
                  ) : (
                      <div className="linksBoxItem">
                        <img src={require("../../img/briefcase-icon.png")} alt=""/>
                        <a
                            href={portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <p>{portfolioLink}</p>
                        </a>
                      </div>
                  )}
                </div>
              </div>
            </div>
            <button
                className="updateButton"
                style={{position: "absolute", right: "0", bottom: "0"}}
            >
              <UpdateUserProfileForm updateProfile={this.updateProfile}/>
            </button>
            <hr/>
          </div>
          <button
            className="updateButton"
            style={{ position: "absolute", right: "0", bottom: "0" }}
          >
            {this.props.oneUser._id ? (
              <UpdateUserProfileForm
                user={this.props.oneUser}
                updateProfile={this.updateProfile}
              />
            ) : null}
          </button>
          <hr />
        </div>
    );
  }
}

UserDashboardPage.propTypes = {
  getUserData: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  oneUser: PropTypes.object.isRequired,
  updateImage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    oneUser: state.oneUser
  };
}

export default connect(
    mapStateToProps,
    {getUserData, updateProfile, updateImage}
)(UserDashboardPage);
