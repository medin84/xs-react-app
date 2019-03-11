import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { IApplicationState } from "../interfaces";
import { login } from "../actions/user.actions";
import { Login, LoginFormState } from "../components/Login";

interface LoginPageProps extends IApplicationState {
  onSubmitLoginForm: (credentials: LoginFormState) => void;
}

class LoginPage extends React.PureComponent<LoginPageProps> {
  i18n = {
    user: "User",
    password: "Password",
    remember: "Remember",
    btnLogin: "Login"
  };

  constructor(props: LoginPageProps) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(credentials: LoginFormState) {
    this.props.onSubmitLoginForm(credentials);
  }

  render() {
    return (
      <Login
        title={this.props.ui.title}
        logo={this.props.ui.logo}
        error={this.props.user.error}
        i18n={this.i18n}
        onSubmit={this.handleLogin}
      />
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmitLoginForm: bindActionCreators(login, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
