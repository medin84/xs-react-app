import React from "react";

import "./styles/Login.css";

interface LoginProps {
  title: string;
  logo: string;
  error: string;
  i18n: {
    user: string;
    password: string;
    remember: string;
    btnLogin: string;
  };
  onSubmit: (state: LoginFormState) => void;
}

export interface LoginFormState {
  login: string;
  pwd: string;
  saveAuth: boolean;
}

export class Login extends React.PureComponent<LoginProps, LoginFormState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      login: "",
      pwd: "",
      saveAuth: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  onInputChange(e: any) {
    this.setState({
      [e.target.name]: [e.target.value]
    } as Pick<LoginFormState, "login" | "pwd" | "saveAuth">);
  }

  render() {
    const { title, logo, error, i18n } = this.props;

    return (
      <div className="sign-in-page-container">
        <h2 className="sign-in-page-title">{title}</h2>
        <form className="sign-in-form" onSubmit={this.onSubmit}>
          <div className="sign-in-form-row">
            <div className="sign-in-form-row__label">{i18n.user}</div>
            <div className="sign-in-form-row__field">
              <input
                name="login"
                value={this.state.login}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="sign-in-form-row">
            <div className="sign-in-form-row__label">{i18n.password}</div>
            <div className="sign-in-form-row__field">
              <input
                type="password"
                name="pwd"
                value={this.state.pwd}
                onChange={this.onInputChange}
                required
              />
            </div>
          </div>
          {error && (
            <div className="sign-in-form-row">
              <div className="alert alert-danger">Login or pwd incorrect</div>
            </div>
          )}
          <div className="sign-in-form-action">
            <label>
              <input
                type="checkbox"
                name="saveAuth"
                value="1"
                onChange={this.onInputChange}
              />
              <span>{i18n.remember}</span>
            </label>
            <button type="submit" className="btn sign-in-btn-submit">
              {i18n.btnLogin}
            </button>
          </div>
          <div className="sign-in-client-logo-wrapper">
            <img className="sign-in-client-logo" src={logo} alt="logo" />
          </div>
        </form>
      </div>
    );
  }
}
