const express = require ('express');
const bodyParser = require('body-parser')
const server = express();
const cors = require('cors')

const drugRoute = require('./routes/drug');
const diseaseRoute = require('./routes/disease');
const interactionRoute = require('./routes/interaction');
const catchAllRoute = require('./routes/catchAll');

const port = 5000;





server.use(cors({credentials: true, origin: 'http://localhost:3000'}));
server.use(bodyParser.json());

server.use('/',drugRoute)
server.use('/',diseaseRoute)
server.use('/',interactionRoute)
server.use(catchAllRoute)

server.listen(port,console.log('server listening to 5000'))