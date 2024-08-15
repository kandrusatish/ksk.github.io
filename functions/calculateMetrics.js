const { spawn } = require('child_process');

async function calculateMetrics(text1, text2) {
    return new Promise((resolve, reject) => {
        // Using 'python' since your environment points 'python' to Python 3
        const pythonProcess = spawn('python3', ['scripts/calculate_metrics.py']);

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

exports.handler = async (event) => {
    try {
        const { text1, text2 } = JSON.parse(event.body);
        const metrics = await calculateMetrics(text1, text2);
        return {
            statusCode: 200,
            body: JSON.stringify(metrics),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};