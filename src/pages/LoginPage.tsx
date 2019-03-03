import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { IApplicationState } from "../interfaces";
import { login } from "../actions/user.actions";
import Login, { LoginFormState } from "../components/Login";

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

  render() {
    const {
      ui: { title, logo },
      onSubmitLoginForm
    } = this.props;

    return (
      <Login
        title={title}
        logo={logo}
        i18n={this.i18n}
        onSubmit={(credentials: LoginFormState) => {
          onSubmitLoginForm(credentials);
        }}
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
