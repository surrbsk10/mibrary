import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Request from 'superagent';
import SnackBar from '../components/SnackBar.jsx'

export default class BookDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    this.setState({
      open: this.props.open
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  takeOut(action) {
    let { bid, reader, name } = this.props;
    let book = { id: bid, reader, name };
    Request
    .put(`/api/books/${action}`)
    .send(book)
    .end((err, res) => {
      if(err) {
        console.log(err.message);
      } else {
        this.props.closeDialog();
        this.props.openSnackbar('time for a snack..');
      }
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose an action...</DialogTitle>
          <DialogActions>
            <Button onClick={() => this.takeOut('gift')}> Gift </Button>
            <Button onClick={() => this.takeOut('lend')}> Lend </Button>
            <Button onClick={() => this.props.closeDialog()}> Close </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
