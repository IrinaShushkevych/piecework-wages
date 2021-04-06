import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import store from './Redux/reduxstore';

let AppMain = () => {
    return <BrowserRouter>
            <Provider store={store}>
                <App />
            </ Provider>
        </ BrowserRouter>
};

export default AppMain;

