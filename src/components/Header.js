import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import * as urls from '../urls';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
  sidebar: {
    width: 200,
  },
};

class Header extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      menuButton: PropTypes.string.isRequired,
      flex: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    isDrawerOpen: false,
  };

  handleOpenDrawer = () => {
    this.setState({ isDrawerOpen: true });
  };

  handleCloseDrawer = () => {
    this.setState({ isDrawerOpen: false });
  };

  handleClickLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={this.handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Zeppelin - Warsaw JS Workshop #21
          </Typography>
          <div>
            <Button color="inherit" onClick={this.handleClickLogout}>Logout</Button>
          </div>
        </Toolbar>
        <Drawer open={isDrawerOpen} onClose={this.handleCloseDrawer}>
          <div
            className={classes.sidebar}
            onClick={this.handleCloseDrawer}
            onKeyDown={this.handleCloseDrawer}
          >
            <List>
              <ListItem button>
                <ListItemText>
                  <Link to={urls.PROJECT_LIST}>Projects</Link>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  <Link to={urls.PROJECT_CREATE}>New Project</Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText>
                  <Link to={urls.CREDITS}>Credits</Link>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
