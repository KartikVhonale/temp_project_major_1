const { exec } = require('child_process');

let tsharkProcess = null;

const start = () => {
    return new Promise((resolve, reject) => {
        if (tsharkProcess) {
            return reject('Tshark capture is already running.');
        }

        console.log('Starting Tshark capture...');
        tsharkProcess = exec('tshark -i eth0 -w capture.pcap', (error, stdout, stderr) => {
            if (error) {
                console.log('Tshark start error:', error);
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log('Tshark stderr:', stderr);
                reject(`Stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });

        resolve('Tshark capture started.');
    });
};

const stop = () => {
    return new Promise((resolve, reject) => {
        if (!tsharkProcess) {
            return reject('Tshark capture is not running.');
        }

        console.log('Stopping Tshark capture...');
        tsharkProcess.kill();
        tsharkProcess = null;
        resolve('Tshark capture stopped.');
    });
};

module.exports = { start, stop };

