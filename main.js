const { app, BrowserWindow, ipcMain: ipc, ipcRenderer } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 200,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  //EVENTOS PARA EL CONTROL DE LA VENTANA
  ipc.on('cerrarApp', () => {
    mainWindow.close();
  });

  ipc.on('minimizarApp', () => {
    mainWindow.minimize();
  });

  ipc.on('restaurarApp', () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// app.on('web-contents-created', (event, contents) => {
//   contents.on('will-attach-webview', (event, webPreferences, params) => {
//     // Strip away preload scripts if unused or verify their location is legitimate
//     delete webPreferences.preload;
//     delete webPreferences.preloadURL;

//     // Disable Node.js integration
//     webPreferences.nodeIntegration = false;

//     // Verify URL being loaded
//     if (!params.src.startsWith('https://example.com/')) {
//       event.preventDefault();
//     }
//   });
// });
