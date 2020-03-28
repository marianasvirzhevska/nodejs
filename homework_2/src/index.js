import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const testUsers = [
    {email: "kola4ok91@gmail.com", pass: "1111"},
    {email: "kate@email.com", pass: "2222"},
    {email: "oliver@email.com", pass: "3333"},
    {email: "maike@email.com", pass: "4444"}
];

console.log("List of available users: ", testUsers);

