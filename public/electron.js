const electron = require('electron')
const path = require('path')
const url = require('url')
const { ipcMain } = require('electron')

const { app } = electron
const { BrowserWindow } = electron

let mainWindow

app.allowRendererProcessReuse = true

function createWindow() {
  const startUrl = process.env.DEV
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(startUrl)
  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let hiddenWindow = null

ipcMain.on('STOP_HIDDEN', () => {
  hiddenWindow.close()
})

ipcMain.on('START_BACKGROUND_VIA_MAIN', () => {
  if (hiddenWindow !== null) return
  const backgroundFileUrl = url.format({
    pathname: path.join(__dirname, `../background_tasks/background.html`),
    protocol: 'file:',
    slashes: true
  })
  hiddenWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  hiddenWindow.loadURL(backgroundFileUrl)

  hiddenWindow.on('closed', () => {
    hiddenWindow = null
  })
})


ipcMain.on('MESSAGE_FROM_BACKGROUND', (_, args) => {
  mainWindow.webContents.send('MESSAGE_FROM_BACKGROUND_VIA_MAIN', args)
})

ipcMain.on('BACKGROUND_READY', (event, _) => {
  event.reply('START_PROCESSING')
})
