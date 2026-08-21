import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.css'; // Benjibyte: can't find the module for importing the css style
// I decided to comment out the above line because we don't need it. the styles can be 
// injected into the final html instead of worrying about whether JS wants to import CSS values


ReactDOM.createRoot(document.getElementById('root')).render( // Benjibyte: I'm not sure that "getElementByID" is the best way to connect to root.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);