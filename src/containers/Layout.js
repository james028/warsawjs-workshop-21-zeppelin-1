import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import * as urls from '../urls';
import * as actions from '../actions';
import * as selectors from '../selectors';
import Header from '../components/Header';
import ProjectCreatePage from './ProjectCreatePage';
import ProjectEditPage from './ProjectEditPage';
import ProjectListPage from './ProjectListPage';
import CreditsPage from './CreditsPage';

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 20,
  },
};

class Layout extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  render() {
    const { isLoggedIn, logout, classes } = this.props;
    if (!isLoggedIn) {
      return (
        <Redirect to={urls.LOGIN} />
      );
    }
    return (
      <Fragment>
        <Header logout={logout} />
        <div className={classes.content}>
          <Switch>
            <Route path={urls.PROJECT_CREATE} component={ProjectCreatePage} />
            <Route path={urls.PROJECT_EDIT} component={ProjectEditPage} />
            <Route path={urls.PROJECT_LIST} component={ProjectListPage} />
            <Route path={urls.CREDITS} component={CreditsPage} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: selectors.isLoggedIn(state),
  };
}

const mapDispatchToProps = {
  logout: actions.logout,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Layout));
