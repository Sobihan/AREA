// Import dependencies
const { PrismaClient } = require('@prisma/client')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const api = require('./routes/routes');
const about = require('./controllers/about')

const prisma = new PrismaClient()

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const hostname = 'backend';
const port = 8080;

BigInt.prototype.toJSON = function() { return this.toString()  }

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.get('/about', about.about);
app.get('/about.json', about.about);

// Catch any bad requests
app.get('*', (req, res) => {
    console.log('Catch All');
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    //job_extra.launchJobOnStart()
});

module.exports.prisma = prisma;


//docker run --rm --name postgres-quotes -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres:14.1-alpine
//npx prisma migrate dev --name init
//docker exec -it dashboard_bend sh
//sudo chmod -R 777 db
//systemctl stop apache2.service
//sudo docker-compose rm
//docker rmi b-dev-500-par-5-1-dashboard-alexandre1berthomier_dbpostgres
//docker stop $(docker ps -aq)
//docker rm $(docker ps -aq)
//docker rmi $(docker images -q)
//docker rmi dashboard/fend:latest
//git reset HEAD^

//sudo docker-compose up --build backend