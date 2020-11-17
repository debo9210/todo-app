import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//temporary todo object
let DATA = [
  {id: 'Todo-0', name: 'Eat', completed: true},
  {id: 'Todo-1', name: 'Sleep', completed: false},
  {id: 'Todo-2', name: 'Repeat', completed: false}
];


ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
