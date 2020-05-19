import downloadVideo from './downloadVideo';
import {
    app,
    BrowserWindow,
    dialog,
    ipcMain
} from 'electron';
import handleResponse from './handleResponse';
import {
    pyProcess,
    createPythonProcess,
    killPythonProcess
} from './pythonProcess';

function createWindow() {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 375,
        frame: false,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('ready', createPythonProcess);
app.on('will-quit', killPythonProcess);

ipcMain.on('url', (event, url) => {
    if (url == '') {
        console.log('No URL provided...');
        event.sender.send('log', '🔗 Please enter URL!');
    } else {
        const currentWindow = BrowserWindow.getFocusedWindow();
        const dialogProperties = ['openDirectory', 'createDirectory'];

        dialog.showOpenDialog(currentWindow, {properties: dialogProperties}).then((result) => {
            if (result.canceled) {
                console.log('Dialog cancelled...');
            } else {
                console.log('Downloading video...');
                event.sender.send('log', '⏳ Downloading video...');

                const filePath = `${result.filePaths[0]}/%(title)s.%(ext)s`;

                const payload = JSON.stringify({
                    "url": url,
                    "ydl_opts": {
                        "outtmpl": filePath
                    }
                });

                downloadVideo(payload).then((response) => {
                    event.sender.send('log', handleResponse(response));
                });
            }
        });
    }
});
