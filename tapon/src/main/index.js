import { app, shell, BrowserWindow, ipcMain, screen, Menu } from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png'
import sqlite3 from 'sqlite3'
import { rejects } from 'assert'

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // creando la primer ventana
  const mainWindow = new BrowserWindow({
    width,
    height,
    show: true,
    fullscreen: true,
    fullscreenable: true,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Plantilla del menú
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Minimizar',
          role: 'minimize'
        },
        {
          label: 'Salir',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        {
          label: 'Alternar Herramientas de Desarrollo',
          click: () => {
            mainWindow.webContents.toggleDevTools()
          }
        },
        {
          label: 'Pantalla completa',
          type: 'checkbox',
          click: () => {
            const isFullScreen = mainWindow.isFullScreen()
            mainWindow.setFullScreen(!isFullScreen)
          }
        }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Bienvenidos',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
            alert("Bienvenidos a TaponApp, esta app fue hecha por Francisco Costanzo");
          `)
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // crear y conectar a SQLite
  const dbPath = join(app.getPath('userData'), 'db_sqlite.db')
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error al abrir la base de datos:', err.message)
    } else {
      console.log('Conexión exitosa a la base de datos')
    }
  })

  ipcMain.handle('consulta-db', async (event, query) => {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  })

  ipcMain.handle('insertar-db', async (event, query) => {
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve({ message: 'Inserción exitosa' })
        }
      })
    })
  })

  ipcMain.handle('update-db', async (event, query, values) => {
    return new Promise((resolve, reject) => {
      db.run(query, values, function (err) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve({ message: 'Actualización exitosa' })
        }
      })
    })
  })

  ipcMain.handle('eliminarCliente-db', async (event, nombre, localidad, direccion) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM clientes WHERE nombre = ? AND localidad = ? AND direccion = ?';
      const values = [nombre, localidad, direccion];
  
      db.run(query, values, function (err) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({ message: 'Eliminación exitosa' });
        }
      });
    });
  });
  

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  app.applicationIcon = icon
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
