import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router-dom";

import { login } from "../actions/user.actions";
import { IApplicationState } from "../interfaces";
import Login, { LoginState } from "../components/Login";

interface LoginPageProps extends RouteComponentProps {
  title: string;
  logo: string;
  onSubmitLoginForm: (history: any, credentials: LoginState) => void;
}

class LoginPage extends React.Component<LoginPageProps> {
  render() {
    const { title, logo, history, onSubmitLoginForm } = this.props;

    return (
      <Login
        title={title}
        logo={logo}
        onSubmit={(credentials: LoginState) => {
          onSubmitLoginForm(history, credentials);
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
