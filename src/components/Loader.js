import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';

function styles(theme) {
  return {
    self: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      margin: theme.spacing.margin * 2,
    },
  };
}

class Loader extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      self: PropTypes.string.isRequired,
      spinner: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.self}>
        <CircularProgress className={classes.spinner} />
        <Typography variant="title" color="inherit">Loading</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Loader);
