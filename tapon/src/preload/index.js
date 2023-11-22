const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

  consultarSQLite: async (query) => {
    try {
      const resultado = await ipcRenderer.invoke('consulta-db', query);
      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  },

  insertarSQLite: async (query) => {
    try {
      const resultado = await ipcRenderer.invoke('insertar-db', query);
      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  },

  actualizarSQLite: async (query, values) => {
    try {
      const resultado = await ipcRenderer.invoke('update-db', query, values);
      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  },
});
