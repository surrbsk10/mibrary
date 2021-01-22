import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './screens/App.jsx';
import './styles/index.css';

const theme = createMuiTheme();

render(
  <MuiThemeProvider theme={theme}>
  <Router>
    <div>
      <Route exact path= '/' component={App}/>
    </div>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
