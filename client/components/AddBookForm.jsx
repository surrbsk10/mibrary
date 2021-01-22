import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Request from 'superagent';

const BOOK = {
  id: '',
  name: '',
  author: '',
  publisher: '',
  arrival: '',
  isbn: ''
};

export default class AddBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      book: BOOK
    };
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
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

  onChange(field, value) {
    let { book } = this.state;
    book[field] = value;
    this.setState({ book });
  }


  onSubmit() {
    let { book } = this.state;
    console.log('book: ', this.state.book);
    Request
    .post('/api/books')
    .send(book)
    .end((err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
        this.onClose();
        this.props.openSnackbar('time for a snack..');
      }
    });
  }

  onClose() {
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Book</DialogTitle>
          <DialogContent>
            {/*<DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>*/}
            <TextField autoFocus margin="dense"
              label="Book ID" fullWidth
              onChange={(e) => this.onChange('id', e.target.value)}
            />
            <TextField margin="dense"
              label="Name" fullWidth
              onChange={(e) => this.onChange('name', e.target.value)}
            />
            <TextField margin="dense"
              label="Author" fullWidth
              onChange={(e) => this.onChange('author', e.target.value)}
            />
            <TextField margin="dense"
              label="Publisher" fullWidth
              onChange={(e) => this.onChange('publisher', e.target.value)}
            />
            <TextField margin="dense"
              label="ISBN" fullWidth
              onChange={(e) => this.onChange('isbn', e.target.value)}
            />
            <TextField margin="dense"
              label="Arrival Date" fullWidth
              onChange={(e) => this.onChange('arrival', e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit.bind(this)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
