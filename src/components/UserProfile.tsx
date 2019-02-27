import React from "react";

interface UserProfileProps {}

interface UserProfileState {
  user: any;
  langs: string[];
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
  constructor(props: UserProfileProps, state: UserProfileState) {
    super(props, state);

    this.state = {
      user: {
        name: "",
        department: "",
        post: "",
        fullname: "",
        notesname: ""
      },
      langs: []
    };
  }

  saveUserProfile() {}

  close() {}

  render() {
    const { user, langs } = this.state;

    return (
      <form className="form">
        <div className="content-actions">
          <button
            className="btn btn-default"
            onClick={this.close}
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={this.saveUserProfile}
            type="button"
          >
            Save & close
          </button>
        </div>
        <header className="content-header">
          <h1 className="header-title">
            <div className="title">Profile / {user.name}</div>
          </h1>
        </header>
        <div className="content-body">
          <div className="fieldset">
            <div className="legend">Свойства</div>
            <div className="form-group">
              <div className="control-label">department</div>
              <div className="controls">
                <span className="input-placeholder">{user.department}</span>
              </div>
            </div>
            <div className="form-group">
              <div className="control-label">post</div>
              <div className="controls">
                <span className="input-placeholder">{user.post}</span>
              </div>
            </div>
            <div className="form-group">
              <div className="control-label">fullname</div>
              <div className="controls">
                <span className="input-placeholder">{user.fullname}</span>
              </div>
            </div>
            <div className="form-group">
              <div className="control-label">Notes Name</div>
              <div className="controls">
                <span className="input-placeholder">{user.notesname}</span>
              </div>
            </div>
          </div>
          <div className="fieldset">
            <div className="legend">Интерфейс</div>
            <div className="form-group">
              <div className="control-label">countdocinview</div>
              <div className="controls">
                <select name="pagesize" className="span2">
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="control-label">lang</div>
              <div className="controls">
                <select name="lang" className="span2">
                  {langs.map(lang => {
                    return <option value={lang}>{lang}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default UserProfile;
