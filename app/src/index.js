const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);

app.use(cors())

const messages = [
    {name:"Tim",message:"yo"},
    {name:"Pam",message:"hi"}
]


app.get('/', (req, res) => {
    res.send(`<h1>Hi</h1>`);
});

app.get('/messages', (req, res) => {
    res.contentType('application/json')
    res.send(JSON.stringify(messages));
});

app.get('/test', (req, res) => {
    res.send(`<h1>Hi</h1><span> my first deploying</span>`);
});


server.listen((process.env.PORT || 3001), function(){
    console.log('Listening on http://localhost:3001');
});