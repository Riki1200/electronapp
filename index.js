const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const os = require('os-utils');

const Window = () => {
    let v = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/assets/icons/icon.png',
        webPreferences: {
            nodeIntegration: true
        }
    });
    v.loadFile(__dirname + '/src/index.html');
    v.webContents.openDevTools();

    setInterval(() => {
        os.cpuUsage((r) => {
            v.webContents.send('cpu', r * 100);
            v.webContents.send('mem', os.freememPercentage() * 100);
            v.webContents.send('totalmemory', os.totalmem() / 1024);

        })
    }, 1001)



}

app.whenReady().then(Window);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        Window();
    }
})
