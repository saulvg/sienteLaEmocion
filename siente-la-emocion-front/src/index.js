// ## Style ##
import './index.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import React from 'react';
import ReactDOM from 'react-dom';

//Para el calnedario; envolvemos toda la app
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

/**
 * #########
 * ## App ##
 * #########
 */
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
