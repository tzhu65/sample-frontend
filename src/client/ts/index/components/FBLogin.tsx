/**
 * FBLogin
 *
 * Component to represent the login with facebook button
 */

import * as React from "react";
import PropTypes from "prop-types";

interface IFBLoginProps {
  link: string;
}

class FBLogin extends React.Component<IFBLoginProps, any> {
  public render() {
    return (
      <a href={this.props.link}>
        <div className="btn btn-default">
        <i className="fa animated fa-facebook-official wiggle"></i>
        Log in with Facebook
      </div>
      </a>
    );
  }
}

export { FBLogin, IFBLoginProps };
