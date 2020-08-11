import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import "./App.scss";
import * as serviceWorker from './serviceWorker';

import {usePromiseTracker} from "react-promise-tracker";
import Spinner from "react-bootstrap/Spinner";

const LoadingIndicator = props => {
    const {promiseInProgress} = usePromiseTracker();
    return(
        promiseInProgress &&
        <div
            style={{
                width:"100%",
                height:"100%",
                display: "flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            <Spinner animation="border" variant="info"/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <LoadingIndicator/>
    </React.StrictMode>,
    /*
  <React.StrictMode>
    <App />
  </React.StrictMode>,*/

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
