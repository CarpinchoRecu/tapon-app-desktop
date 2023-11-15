import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {};

if (process.contextIsolated) {
  try {
    const extendedElectronAPI = {
      ...electronAPI,
      ipcRenderer: {
        send: (channel, data) => {
          ipcRenderer.send(channel, data);
        },
        on: (channel, listener) => {
          ipcRenderer.on(channel, (_, ...args) => listener(...args));
        },
        removeAllListeners: (channel) => {
          ipcRenderer.removeAllListeners(channel);
        },
      },
    };

    contextBridge.exposeInMainWorld('electron', extendedElectronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
