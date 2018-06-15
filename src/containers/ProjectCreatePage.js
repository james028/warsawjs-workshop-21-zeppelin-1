import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, TextField, Button } from '@material-ui/core';

import * as urls from '../urls';
import * as actions from '../actions';
import ImageUploadField from '../components/ImageUploadField';

const styles = {
  self: {
    maxWidth: 500,
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

class ProjectCreatePage extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  state = {
    loading: false,
    title: '',
    image: null,
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleChangeImage = (selectedFile) => {
    this.setState({ image: selectedFile });
  };

  handleSubmit = () => {
    const { createProject, history } = this.props;
    const { image, title } = this.state;
    this.setState({ loading: true });
    createProject({ image, title })
      .then(() => {
        history.push(urls.PROJECT_LIST);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { title, image } = this.state;
    return (
      <div className={classes.self}>
        <form>
          <div className={classes.fields}>
            <ImageUploadField label="Image" value={image} onChange={this.handleChangeImage} />
            <TextField label="Title" value={title} onChange={this.handleChangeTitle} />
            <Button onClick={this.handleSubmit}>Create</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createProject: actions.createProject,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(ProjectCreatePage));
