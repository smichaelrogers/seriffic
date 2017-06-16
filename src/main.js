import { app, BrowserWindow } from 'electron';
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 540,
    resizable: false,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    backgroundColor: '#fff',
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

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
