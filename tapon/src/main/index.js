import { app, shell, BrowserWindow, ipcMain, screen, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png'
import sqlite3 from 'sqlite3'
import fs from 'fs'

// Función para crear una copia de seguridad en una carpeta específica
function backupDatabase() {
  // Obtener la fecha actual
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Sumar 1 ya que los meses van de 0 a 11
  const day = String(currentDate.getDate()).padStart(2, '0')

  // Construir la cadena de fecha con el formato deseado (DD-MM-YYYY)
  const formattedDate = `${day}-${month}-${year}`

  const dbPath = join(app.getPath('userData'), 'db_sqlite.db')

  // Ruta de la carpeta de copias de seguridad
  const backupFolderPath = join(app.getPath('userData'), 'backup_folder')

  // Verificar si la carpeta de copias de seguridad existe, si no, crearla
  if (!fs.existsSync(backupFolderPath)) {
    fs.mkdirSync(backupFolderPath)
  }

  // Ruta para la copia de seguridad
  const backupPath = join(
    backupFolderPath,
    `backup-${formattedDate}-${Math.floor(Math.random() * 1000000)}.db`
  )

  // Copiar la base de datos a la ruta de la copia de seguridad
  fs.copyFileSync(dbPath, backupPath)

  console.log('Copia de seguridad creada en:', backupPath)
}

// creando la primer ventana
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width,
    height,
    show: true,
    fullscreen: false,
    fullscreenable: true,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.setMinimumSize(width, height)

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
          label: 'Recargar',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload()
          }
        },
        { type: 'separator' },
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
        { type: 'separator' },
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
      console.warn('Conexion exitosa a la base de datos')
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
      const query =
        'UPDATE clientes SET eliminado = 1 WHERE nombre = ? AND localidad = ? AND direccion = ?'
      const values = [nombre, localidad, direccion]

      db.run(query, values, function (err) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve({ message: 'Eliminación exitosa' })
        }
      })
    })
  })

  ipcMain.handle('eliminarProducto-db', async (event, idNumber, nombre, localidad, direccion) => {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE clientes SET eliminado = 1 WHERE id = ? AND nombre = ? AND localidad = ? AND direccion = ?'
      const values = [idNumber, nombre, localidad, direccion]

      db.run(query, values, function (err) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve({ message: 'Eliminación exitosa' })
        }
      })
    })
  })

  ipcMain.handle('notificadorPagado-db', async (event, idMoroso) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE clientes
      SET fecha_ultimo_pago = strftime('%Y-%m-%d', date(fecha_ultimo_pago, '+' || cada_cuanto_paga || ' day'))
      WHERE id = ?;
    `

    const values = idMoroso

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
