// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Función para realizar consultas a la base de datos SQLite desde React
  consultarSQLite: async (query) => {
    try {
      const resultado = await ipcRenderer.invoke('consulta-db', query);
      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  }
});
