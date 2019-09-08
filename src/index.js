import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './pages/App';
import { Provider } from './contexts/Game'

ReactDOM.render(
    <Provider>
        <App />   
    </Provider>       
, 
    document.getElementById('root')
);
