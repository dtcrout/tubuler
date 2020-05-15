import {
    app,
    BrowserWindow,
    dialog,
    ipcMain
} from 'electron';
import downloadVideo from './downloadVideo';
import {
    pyProcess,
    createPythonProcess,
    killPythonProcess
} from './pythonProcess';

function createWindow() {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 350,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('ready', createPythonProcess);
app.on('will-quit', killPythonProcess);

ipcMain.on('url', (e, url) => {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {properties: ['openDirectory', 'createDirectory']}).then(
        (result) => {
            const filePath = `${result.filePaths[0]}/%(title)s.%(ext)s`
            const payload = JSON.stringify(
                {
                    "url": url,
                    "ydl_opts": {
                        "outtmpl": filePath
                    }
                });
            downloadVideo(payload);
        });
});
