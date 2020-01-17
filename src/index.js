import React from 'react';
import ReactDOM from 'react-dom';
import { HoiPoiProvider } from 'hoi-poi-ui';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import materialTheme from './configs/materialTheme';
import App from './App';
import './index.scss';
ReactDOM.render(
  <HoiPoiProvider>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={materialTheme}>
        <App />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </HoiPoiProvider>,
  document.getElementById('root'),
);
