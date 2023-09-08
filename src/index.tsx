import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';
import {Provider} from 'react-redux'

const getElement = document.getElementById('root')
if(getElement) {
    const root = ReactDOM.createRoot(getElement);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}
