import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

const styles = {
  input: {
    display: 'none',
  },
  preview: {
    width: 500,
    height: 500,
  },
  previewContainer: {
    paddingTop: 44,
  },
};

class ImageUploadField extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      input: PropTypes.string.isRequired,
    }),
    onChange: PropTypes.func.isRequired,
  };

  state = {
    fileData: null,
  };

  inputRef = null;
  imageRef = null;

  handleChange = (event) => {
    const { onChange } = this.props;
    const selectedFile = this.inputRef.files[0];
    if (global.FileReader && selectedFile) {
      const reader = new global.FileReader();
      reader.onload = () => {
        this.imageRef.src = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    }
    onChange(selectedFile);
  };

  handleClick = () => {
    this.inputRef.click();
  };

  setImageRef = (ref) => {
    this.imageRef = ref;
  };

  setInputRef = (ref) => {
    this.inputRef = ref;
  };

  render() {
    const { classes, label, helperText, onChange, ...rest } = this.props;
    const { fileData } = this.state;
    return (
      <FormControl {...rest}>
        {label && (
          <InputLabel>{label}</InputLabel>
        )}
        <div className={classes.previewContainer}>
          <img
            src={fileData}
            className={classes.preview}
            ref={this.setImageRef}
          />
          <input
            type="file"
            className={classes.input}
            ref={this.setInputRef}
            onChange={this.handleChange}
          />
        </div>
        {helperText && (
          <FormHelperText>
            {helperText}
          </FormHelperText>
        )}
        <Button onClick={this.handleClick}>Choose File</Button>
      </FormControl>
    );
  }
}

export default withStyles(styles)(ImageUploadField);
