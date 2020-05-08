import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld(
  'expanse',
  {
    timer: {
      on: (event: string, callback: (event: string) => {}) => {
        ipcRenderer.on(`timer:${event}`, () => {
          callback(event);
        });
      },
      pause: () => {
        ipcRenderer.send('timer:pause');
      },
      start: () => {
        ipcRenderer.send('timer:start');
      },
      resume: () => {
        ipcRenderer.send('timer:resume');
      }
    }
  }
)
