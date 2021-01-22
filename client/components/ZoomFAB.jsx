import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

class ZoomFAB extends Component {

  onClick() {
    this.props.onClick();
  }

  render() {
    const { classes, theme } = this.props;
    // const transitionDuration = {
    //   enter: theme.transitions.duration.enteringScreen,
    //   exit: theme.transitions.duration.leavingScreen,
    // };

    const fab = {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
    };

    return (
      <div>
        {/*
        <Zoom
          key={fab.color} in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay: this.state.value === index ? transitionDuration.exit : 0,
          }}
          unmountOnExit
        >
        */}
          <Button variant="fab" className={fab.className} color={fab.color}
            onClick={this.onClick.bind(this)}
          >
            {fab.icon}
          </Button>
        {/*
        </Zoom>
        */}
      </div>
    );
  }
}

ZoomFAB.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ZoomFAB);
