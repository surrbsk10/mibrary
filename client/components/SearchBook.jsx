import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Request from 'superagent';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#DBDCDE'
  }),
});

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      closeIcon : false
    };
    
  }

  componentWillMount() {
    this.setState({
      searchText: this.props.searchText
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchText: nextProps.searchText
    });
  }

  getSearchedBooks() {
    let searchOpen = !this.state.closeIcon;
    if(searchOpen) {
      Request
      .get('/api/books?search=' + this.state.searchText)
      .end((err, res) => {
        if(err) {
          console.log(err);
        } else {
          this.props.updateSearchedBooks(res.body.books);
          this.setState({ closeIcon: true });
        }
      });
    } else {
      this.props.changeSearchText('');
      this.props.updateSearchedBooks([]);
      this.setState({ closeIcon: false });
    }
  }

  render() {
    const { classes } = this.props;
    let { searchText , closeIcon } = this.state;

    return (
      <Paper className={classes.root} elevation={4}>
        <FormControl>
            <Input
              id="adornment-password"
              value={searchText}
              onChange={(e) => this.props.changeSearchText(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Search Book"
                    onClick={this.getSearchedBooks.bind(this)}
                  >
                  { closeIcon ? <Close /> :  <Search /> }
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBook);
