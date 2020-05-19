import path from 'path';
import { spawn, execFile } from 'child_process';

let pyProcess = null;

function createPythonProcess() {
    // Run app using Python
    const script = path.join(__dirname, 'download_video', 'app.py');
    pyProcess = spawn('./venv/bin/python', [script]);

    // Run app executable
    // const script = path.join(__dirname, 'download_video_dist', 'app', 'app');
    // pyProcess = execFile(script);

    pyProcess.on('exit', (code) => {
        console.log(`Exiting with code: ${code}`);
    });

    // Does 'error' event exist? I couldn't find it in the docs...
    pyProcess.on('error', (message) => {
        console.log(`Error: ${message}`);
    });
}

function killPythonProcess() {
    pyProcess.kill();
}

export { pyProcess, createPythonProcess, killPythonProcess };
