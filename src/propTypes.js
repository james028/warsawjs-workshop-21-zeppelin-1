import PropTypes from 'prop-types';

export const projectShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
});

export const arrayOfProjects = PropTypes.arrayOf(projectShape);
