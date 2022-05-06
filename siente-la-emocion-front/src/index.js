import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'


/**
 * #################
 * ## Componentes ##
 * #################
 */
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* <TokenProvider> */}
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <App />
    </MuiPickersUtilsProvider>
    {/* </TokenProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
