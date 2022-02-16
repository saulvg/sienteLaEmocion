import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
/**
 * #################
 * ## Componentes ##
 * #################
 */
import App from './App';
import Header from './components/Header/Header'
import Footer from'./components/Footer/Footer'

ReactDOM.render(
  <React.StrictMode>
    {/* <TokenProvider> */}
    <Header/>
    <App/>
    <Footer/> 
    {/* </TokenProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();