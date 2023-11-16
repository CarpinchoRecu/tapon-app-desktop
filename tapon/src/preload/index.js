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

  // Nueva función para eliminar una fila específica por su ID
  eliminarFilaSQLite: async (id) => {
    try {
      const resultado = await ipcRenderer.invoke('eliminar-fila', id);
      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  }
});
