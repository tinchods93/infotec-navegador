const path = require('path');
const isDev = require('electron-is-dev');
const { app, BrowserWindow } = require('electron');
const { ContextMenu } = require('../src/electron.components/ContextMenu');
const { MainMenu } = require('../src/electron.components/MainMenu');

require('electron-reload')(__dirname);
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  createWindow();
  const _MainMenu = new MainMenu({ mainWindow });
  _MainMenu.render();
  ContextMenu(mainWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

module.exports = { mainWindow };
