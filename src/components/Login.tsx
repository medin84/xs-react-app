import React from "react";

import "./styles/Login.css";

interface LoginProps {
  title: string;
  logo: string;
  onSubmit: (state: LoginState) => void;
}

export interface LoginState {
  login: string;
  pwd: string;
  saveAuth: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    login: "",
    pwd: "",
    saveAuth: false
  };

  constructor(props: LoginProps) {
    super(props);

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
    } as Pick<LoginState, "login" | "pwd" | "saveAuth">);
  }

  render() {
    const { title, logo } = this.props;

    return (
      <div className="sign-in-page-container">
        <h2 className="sign-in-page-title">{title}</h2>
        <form className="sign-in-form" onSubmit={this.onSubmit}>
          <div className="sign-in-form-row">
            <div className="sign-in-form-row__label">Пользователь</div>
            <div className="sign-in-form-row__field">
              <input
                name="login"
                value={this.state.login}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="sign-in-form-row">
            <div className="sign-in-form-row__label">Пароль</div>
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
          <div className="sign-in-form-action">
            <label>
              <input
                type="checkbox"
                name="saveauth"
                value="1"
                onChange={this.onInputChange}
              />
              <span>запомнить</span>
            </label>
            <button type="submit" className="btn sign-in-btn-submit">
              Войти
            </button>
          </div>
          <div className="sign-in-client-logo-wrapper">
            <img className="sign-in-client-logo" src={logo} alt="logo" />
          </div>
        </form>
        <div className="copy hidden">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            LOF
          </a>
        </div>
        <div className="xsmart-logo">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    );
  }
}

export default Login;
