const { exec } = require('child_process');

let tcpdumpProcess = null;

const start = () => {
    return new Promise((resolve, reject) => {
        if (tcpdumpProcess) {
            return reject('Tcpdump capture is already running.');
        }

        console.log('Starting Tcpdump capture...');
        tcpdumpProcess = exec('tcpdump -i eth0 -w capture.pcap', (error, stdout, stderr) => {
            if (error) {
                console.log('Tcpdump start error:', error);
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log('Tcpdump stderr:', stderr);
                reject(`Stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });

        resolve('Tcpdump capture started.');
    });
};

const stop = () => {
    return new Promise((resolve, reject) => {
        if (!tcpdumpProcess) {
            return reject('Tcpdump capture is not running.');
        }

        console.log('Stopping Tcpdump capture...');
        tcpdumpProcess.kill();
        tcpdumpProcess = null;
        resolve('Tcpdump capture stopped.');
    });
};

module.exports = { start, stop };

