import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import BookDialog from '../components/BookDialog.jsx'

const styles = theme => ({
  card: {
    maxWidth: 400,
    minHeight: 150,
    backgroundColor: '#F6F6F6',
    textAlign: 'left',
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
    marginTop: '5px !important'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
   display: 'flex',
   marginTop: '-60px',
   float: 'right'
 },
});

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      dialog: false,
      reader: ''
    }
  };

  render() {
    const { book, classes } = this.props;
    let { expanded, dialog, reader } = this.state;
    return (
      <Card className = {classes.card}>
      <CardContent >
        <Typography variant = "headline" component = "h2" >
          { book.name }
        </Typography>
        <Typography className = {classes.subtitle} color = "textSecondary" >
        { book.author }
        </Typography>
        <Typography color = "textSecondary" >
        ISBN: { book.isbn } <br />
        Publisher: { book.publisher }
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classNames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => this.setState({ expanded: !expanded })}
            aria-expanded={expanded}
            aria-label="Show more"
          >
          <ExpandMoreIcon />
          </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <FormControl className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-password">Reader</InputLabel>
            <Input
              id="adornment-password"
              value={reader}
              onChange={(e) => this.setState({ reader: e.target.value })}
              endAdornment={
                <InputAdornment
                  position="end" onClick={() => {
                    if(reader.length > 0) this.setState({ dialog: true });
                  }}>
                  NEXT
                </InputAdornment>
              }
            />
            <BookDialog
              bid={book.id} name={book.name}
              reader={reader} open={dialog}
              closeDialog={() => this.setState({ dialog: false })}
              openSnackbar={this.props.openSnackbar.bind(this)}
               />
          </FormControl>

        </CardContent>

      </Collapse>
      </Card>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);
