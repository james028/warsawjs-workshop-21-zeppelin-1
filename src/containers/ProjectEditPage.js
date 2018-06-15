import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardMedia, CardActions } from '@material-ui/core';

import { projectShape } from '../propTypes';
import * as urls from '../urls';
import * as actions from '../actions';
import * as selectors from '../selectors';
import Loader from '../components/Loader';

class ProjectEditPage extends PureComponent {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: projectShape,
    readProject: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { projectId, readProject } = this.props;
    this.setState({ loading: true });
    readProject(projectId)
      .then(() => {
        this.setState({ loading: false });
      }).catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { project } = this.props;
    const { loading } = this.state;
    if (loading) {
      return (
        <Loader />
      );
    }
    if (!project) {
      return (
        <Redirect to={urls.PROJECT_LIST} />
      );
    }

    const { title, owner, image, comments } = project;
    return (
      <Card>
        <CardMedia image={image} />
        {(comments || []).map((comment, index) => (
          <div key={index}>
            <div>{comment.body}</div>
          </div>
        ))}
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  const { match: { params: { id: projectId } = {} } = {} } = props;
  return {
    projectId,
    project: selectors.getProject(state, projectId),
  };
}

const mapDispatchToProps = {
  readProject: actions.readProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditPage);
