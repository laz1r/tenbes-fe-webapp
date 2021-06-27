// imports load components and assets
import React from 'react';
import ReactDOM from 'react-dom'; // imports react-dom from node_modules
import './index.css'; // can import images and style sheets
import App from './App'; // imports App component from root
import 'bootstrap/dist/css/bootstrap.min.css'; // changed my overall look !

// CSS info-
// color of original heading - #f1356d
// color of original body - #CCFFFF
ReactDOM.render( // to render React component to DOM
    <App />,
  document.getElementById('root') // first arg - component to be rendered, 
                                  // sec arg - element or container where component will be rendered
);