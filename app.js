const express = require('express');
const path = require('path');
const tshark = require('./tshark');
const tcpdump = require('./tcpdump');
const cors = require('cors'); // CORS middleware

const app = express();
const port = 3000;

// Use CORS middleware to handle cross-origin requests
app.use(cors());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes to handle start/stop for tshark and tcpdump
app.get('/start-tshark', (req, res) => {
    console.log('Received request to start Tshark');
    tshark.start()
        .then((output) => {
            console.log('Tshark started successfully');
            res.json({ status: 'started', output });
        })
        .catch((error) => {
            console.log('Error starting Tshark: ', error);
            res.json({ status: 'error', error });
        });
});

app.get('/stop-tshark', (req, res) => {
    console.log('Received request to stop Tshark');
    tshark.stop()
        .then((output) => {
            console.log('Tshark stopped successfully');
            res.json({ status: 'stopped', output });
        })
        .catch((error) => {
            console.log('Error stopping Tshark: ', error);
            res.json({ status: 'error', error });
        });
});

app.get('/start-tcpdump', (req, res) => {
    console.log('Received request to start Tcpdump');
    tcpdump.start()
        .then((output) => {
            console.log('Tcpdump started successfully');
            res.json({ status: 'started', output });
        })
        .catch((error) => {
            console.log('Error starting Tcpdump: ', error);
            res.json({ status: 'error', error });
        });
});

app.get('/stop-tcpdump', (req, res) => {
    console.log('Received request to stop Tcpdump');
    tcpdump.stop()
        .then((output) => {
            console.log('Tcpdump stopped successfully');
            res.json({ status: 'stopped', output });
        })
        .catch((error) => {
            console.log('Error stopping Tcpdump: ', error);
            res.json({ status: 'error', error });
        });
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

