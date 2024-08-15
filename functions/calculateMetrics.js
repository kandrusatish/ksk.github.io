const { spawn } = require('child_process');

async function calculateMetrics(text1, text2) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['scripts/calculate_metrics.py']);

        pythonProcess.stdin.write(JSON.stringify({ text1, text2 }));
        pythonProcess.stdin.end();

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Python script exited with code ${code}`));
            }
            resolve(JSON.parse(result));
        });

        pythonProcess.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = calculateMetrics;