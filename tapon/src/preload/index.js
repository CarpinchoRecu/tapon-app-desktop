const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  consultarSQLite: async (query) => {
    try {
      const resultado = await ipcRenderer.invoke('consulta-db', query)
      return resultado
    } catch (error) {
      throw new Error(error)
    }
  },

  insertarSQLite: async (query) => {
    try {
      const resultado = await ipcRenderer.invoke('insertar-db', query)
      return resultado
    } catch (error) {
      throw new Error(error)
    }
  },

  actualizarSQLite: async (query, values) => {
    try {
      const resultado = await ipcRenderer.invoke('update-db', query, values)
      return resultado
    } catch (error) {
      throw new Error(error)
    }
  },

  EliminarClienteSQLite: async (nombre, localidad, direccion) => {
    try {
      const resultado = await ipcRenderer.invoke('eliminarCliente-db', nombre, localidad, direccion)
      return resultado
    } catch (error) {
      throw new Error(error)
    }
  },

  EliminarProductoSQLite: async (idNumber, nombre, localidad, direccion) => {
    try {
      const resultado = await ipcRenderer.invoke(
        'eliminarProducto-db',
        idNumber,
        nombre,
        localidad,
        direccion
      )
      return resultado
    } catch (error) {
      throw new Error(error)
    }
  },

  NotificadorPagadoSQLite: async (idMoroso) => {
    try {
      const resultado = await ipcRenderer.invoke('notificadorPagado-db', idMoroso)
      return resultado
    } catch (error) {
      throw new Error(error)
    }
  },
})
