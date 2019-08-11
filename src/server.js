const express = require('express');
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync(__dirname+'/config/certs/selfsigned.key','ascii');
const cert = fs.readFileSync(__dirname+'/config/certs/selfsigned.crt','ascii');
const options = {
    key: key,
    cert: cert
}

const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-byjrf.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true    
});

server.use(cors());
server.use(express.json());
server.use(routes);

const serverSec = https.createServer(options, server);

server.listen(process.env.PORT || 3000);
serverSec.listen(process.env.PORT || 3333);