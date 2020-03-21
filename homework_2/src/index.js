import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const testUsers = [
    {email: "kola4ok91@gmail.com", pass: "1111"},
    {email: "kate@email.com", pass: "2222"},
    {email: "oliver@email.com", pass: "3333"},
    {email: "maike@email.com", pass: "4444"}
];

console.log("List of available users: ", testUsers);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
