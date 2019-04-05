import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ReactComponent as YourSvg } from "../media/spinner.svg";
import { confirm } from "../../actions/auth";

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div className="ConfirmationPageCont">
        {loading && (
          <div className="ValidatingCont">
            <p>Validating your email</p>
            <YourSvg loading={loading.toString()} />
          </div>
        )}
        {!loading && success && (
          <div className="verifiedCont">
            Your account is verified
            <Link to="/dashboard"> Go to your dashboard</Link>
          </div>
        )}

        {!loading && !success && <div className="invalidToken"><h1>Oops. Invalid Token</h1></div>}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(
  null,
  { confirm }
)(ConfirmationPage);
