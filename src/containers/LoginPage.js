import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as urls from '../urls';
import * as actions from '../actions';

const styles = {
  self: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
  },
};

class LoginPage extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      self: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    submitting: false,
    username: '',
    password: '',
  };

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    this.setState({ submitting: true });
    login({ username, password })
      .then(() => {
        const { history } = this.props;
        history.replace(urls.PROJECT_LIST);
      })
      .catch((error) => {
        this.setState({ username: '', password: '', submitting: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;
    return (
      <form>
        <div className={classes.self}>
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={this.handleChangeUsername}
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <Button variant="raised" onClick={this.handleSubmit}>Login</Button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  login: actions.login,
};

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(LoginPage)));
