import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * #################
 * ## Componentes ##
 * #################
 */
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* <TokenProvider> */}
    <App />
    {/* </TokenProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
