import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';

import { projectShape } from '../propTypes';
import { formatDate } from '../utils';

const styles = {
  self: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    maxWidth: 500,
  },
  image: {
    height: 300,
  },
};

export class ProjectListItem extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    project: projectShape.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { project: { id }, onEdit } = this.props;
    onEdit(id);
  };

  handleImageClick = (event) => {
    event.preventDefault();
  };

  render() {
    const { classes, project: { owner, title, image, date, commentsCount } } = this.props;
    return (
      <Card classes={{ root: classes.self }}>
        <CardMedia
          image={image}
          className={classes.image}
          onClick={this.handleImageClick}
        />
        <CardContent>
          <Typography variant="headline" gutterBottom component="h2">{title}</Typography>
          <Typography component="p">by {owner}</Typography>
          <Typography component="p">{formatDate(date)}</Typography>
          <Typography component="p">{commentsCount} comments</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClick}>Edit</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ProjectListItem);
