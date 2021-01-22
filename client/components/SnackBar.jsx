import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  default: {
    height: '40px !important'
  }
});

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    this.setState({ open: this.props.open })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.open}
        onClose={this.props.onClose}
        autoHideDuration={1000}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    );
  }
}

export default SnackBar;
