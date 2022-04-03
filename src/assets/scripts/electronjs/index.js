const { app, BrowserWindow, dialog, ipcMain, ipcRenderer, nativeTheme, protocol, powerMonitor, session } = require('electron')
const glasstron = require('glasstron')
const fs = require('fs');
const path = require('path');
const { Client, SFTPStream } = require('ssh2');
const PromisePool = require('es6-promise-pool');
let primaryWindow;
let sftp;

const createMainWindow = () => {
    primaryWindow = new glasstron.BrowserWindow({
        width: 1200,
        height: 800,
        minHeight: 590,
        minWidth: 720,
        autoHideMenuBar: true,
        frame: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#121212',
            symbolColor: 'white'
        },
        blur: true,
        blurType: 'blurbehind',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true,
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    sftp = new BrowserWindow({
        width: 1200,
        height: 800,
        modal: true,
        frame: false,
        show: false,
        parent: primaryWindow,
        transparent: true,
        webPreferences: {
          preload: path.join(__dirname, 'sftp.js'),
            contextIsolation: false,
            nodeIntegration: true,
        }
    })

    primaryWindow.loadFile('src/index.html')
    sftp.loadFile('src/components/content/SFTP/mainWindow.html')

    ipcMain.on('sftpOpen',  () => {
        sftp.show();
    })
    ipcMain.on('sftpClose',  () => {
        sftp.hide()
    })

    primaryWindow.on('move', function() {
        let position = primaryWindow.getPosition();
        sftp.setPosition(position[0], position[1]);
    });
    primaryWindow.on('resize', function() {
        let size = primaryWindow.getSize();
        sftp.setSize(size[0], size[1]);
    })
    primaryWindow.on('close', function() {
        sftp.close()
    })

    if (nativeTheme.shouldUseDarkColors) {
        console.log('Yes')
    } else {
        console.log('No')
    }

    if (process.windowsStore) {
        console.log('App Type: Windows Store')
    }
    else {
        console.log('App Type: Non-Windows Store')
    }
}

app.on('ready', createMainWindow);





// Display file properties dialog
ipcMain.on('display_file_properties', (event, args) => {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['Close',],
      title: 'Properties: ' + args[0],
      message: args[1],
      icon: __dirname + '/img/icon.png',
    });
  });
  
  // Store current local directory
  let curLocalDir;
  
  // Store current remote directory
  let curRemoteDir;
  
  // Store current copied local directory
  let curLocalCopyFiles = [];
  
  // Store current cut local directory
  let curLocalCutFiles = [];
  
  // Store current remote copied directory
  let curRemoteCopyFiles = [];
  
  // Store current remote cut directory
  let curRemoteCutFiles = [];
  
  ipcMain.on('change_local_dir', (event, args) => {
    curLocalDir = args;
  });
  
  ipcMain.on('get_cur_local_dir', (event, args) => {
    event.sender.send('cur_local_dir', curLocalDir);
  });
  
  ipcMain.on('get_cur_remote_dir', (event, args) => {
    event.sender.send('cur_remote_dir', curRemoteDir);
  });
  
  // Get remote directory list
  ipcMain.on('get_remote_dir_list', (event, args) => {
    curRemoteDir = args[1];
    let conn = new Client();
    conn.on('ready', () => {
      conn.sftp((error, sftp) => {
        sftp.readdir(args[1], (error, list) => {
          if(error){
            conn.end();
            throw error
          }
          newArgs = [];
          newArgs.push(list);
          let statsList = [];
          for(let i = 0; i < list.length; i++){
            statsList.push(list[i].attrs.isDirectory());
          }
          newArgs.push(statsList);
          event.sender.send('remote_dir_list', newArgs);
          conn.end();
        });
      });
    }).connect(args[0]);
  });
  
  // Download remote file from server
  ipcMain.on('download_remote_files', (event, args) => {
    let conn = new Client();
    conn.on('ready', () => {
      let pool = new PromisePool(downloadFileProducer(conn, args[1]), 10);
      pool.start().then(() => {
        conn.end();
        let tempArgs = [];
        tempArgs.push(curLocalDir);
        tempArgs.push(curRemoteDir);
        tempArgs.push(args[1].length);
        event.sender.send('remote_download_complete', tempArgs);
      });
    }).connect(args[0]);
  });
  
  // Producer used in promise pool to download files
  function *downloadFileProducer(conn, files){
    for(const file of files){
      yield downloadFile(conn, file);
    }
  }
  
  // Function used to download files in promise pool
  function downloadFile(conn, file){
    return new Promise((resolve, reject) => {
      conn.sftp((error, sftp) => {
        return sftp.fastGet(file, curLocalDir + file.substring(file.lastIndexOf('/') + 1), {}, (error) => {
          if(error){
            conn.end();
            throw error;
          }
          resolve(file);
        });
      });
    });
  }
  
  // Upload local file to server
  ipcMain.on('upload_local_files', (event, args) => {
    let conn = new Client();
    conn.on('ready', () => {
      let pool = new PromisePool(uploadFileProducer(conn, args[1]), 10);
      pool.start().then(() => {
        conn.end();
        let tempArgs = [];
        tempArgs.push(curLocalDir);
        tempArgs.push(curRemoteDir);
        tempArgs.push(args[1].length);
        event.sender.send('local_upload_complete', tempArgs);
      });
    }).connect(args[0]);
  });
  
  // Producer used in promise pool to upload files
  function *uploadFileProducer(conn, files){
    for(const file of files){
      yield uploadFile(conn, file);
    }
  }
  
  // Function used to upload files in promise pool
  function uploadFile(conn, file){
    return new Promise((resolve, reject) => {
      conn.sftp((error, sftp) => {
        return sftp.fastPut(file, curRemoteDir + file.substring(file.lastIndexOf('/') + 1), {}, (error) => {
          if(error){
            conn.end();
            throw error;
          }
          resolve(file);
        });
      });
    });
  }
  
  ipcMain.on('copy_local_files', (event, args) => {
    curLocalCopyFiles = args;
    curLocalCutFiles = null;
  });
  
  ipcMain.on('cut_local_files', (event, args) => {
    curLocalCutFiles = args;
    curLocalCopyFiles = null;
  });
  
  ipcMain.on('copy_remote_files', (event, args) => {
    curRemoteCopyFiles = args;
    curRemoteCutFiles = null;
  });
  
  ipcMain.on('cut_remote_files', (event, args) => {
    curRemoteCutFiles = args;
    curRemoteCopyFiles = null;
  });
  
  // Paste local files
  ipcMain.on('paste_local_files', (event, args) => {
    if(curLocalCopyFiles != null){
      let pool = new PromisePool(pasteLocalFileProducer(curLocalCopyFiles, curLocalDir), 10);
      pool.start().then(() => {
        let tempArgs = [];
        tempArgs.push(curLocalDir);
        tempArgs.push(curRemoteDir);
        event.sender.send('local_files_pasted', tempArgs);
      });
    }else{
      let pool = new PromisePool(moveLocalFileProducer(curLocalCutFiles, curLocalDir), 10);
      pool.start().then(() => {
        let tempArgs = [];
        tempArgs.push(curLocalDir);
        tempArgs.push(curRemoteDir);
        event.sender.send('local_files_pasted', tempArgs);
      });
    }
  });
  
  // Producer used in promise pool to paste local files
  function *pasteLocalFileProducer(files, dest){
    for(const file of files){
      yield pasteLocalFile(file, dest + file.substring(file.lastIndexOf('/') + 1));
    }
  }
  
  // Function used to paste local files in promise pool
  function pasteLocalFile(src, dest){
    return new Promise((resolve, reject) => {
      fs.copyFile(src, dest, (error) => {
        if(error){
          throw error;
        }
        resolve(src);
      });
    });
  }
  
  // Producer used in promise pool to move local files
  function *moveLocalFileProducer(files, dest){
    for(const file of files){
      yield moveLocalFile(file, dest + file.substring(file.lastIndexOf('/') + 1));
    }
  }
  
  // Function used to move local files in promise pool
  function moveLocalFile(src, dest){
    return new Promise((resolve, reject) => {
      fs.rename(src, dest, (error) => {
        if(error){
          throw error;
        }
        resolve(src);
      });
    });
  }
  
  // Paste remote files
  ipcMain.on('paste_remote_files', (event, args) => {
    if(curRemoteCopyFiles != null){
      let conn = new Client();
      conn.on('ready', () => {
        let pool = new PromisePool(pasteRemoteFileProducer(curRemoteCopyFiles, curRemoteDir, conn), 10);
        pool.start().then(() => {
          conn.end();
          let tempArgs = [];
          tempArgs.push(curLocalDir);
          tempArgs.push(curRemoteDir);
          event.sender.send('remote_files_pasted', tempArgs);
        });
      }).connect(args);
    }else{
      let conn = new Client();
      conn.on('ready', () => {
        let pool = new PromisePool(moveRemoteFileProducer(curRemoteCutFiles, curRemoteDir, conn), 10);
        pool.start().then(() => {
          conn.end();
          let tempArgs = [];
          tempArgs.push(curLocalDir);
          tempArgs.push(curRemoteDir);
          event.sender.send('remote_files_pasted', tempArgs);
        });
      }).connect(args);
    }
  });
  
  // Producer used in promise pool to paste remote files
  function *pasteRemoteFileProducer(files, dest, conn){
    for(const file of files){
      yield pasteRemoteFile(file, dest + file.substring(file.lastIndexOf('/') + 1), conn);
    }
  }
  
  // Function used to paste remote files in promise pool
  function pasteRemoteFile(src, dest, conn){
    return new Promise((resolve, reject) => {
      conn.sftp((error, sftp) => {
        sftp.createReadStream(src).pipe(sftp.createWriteStream(dest));
        resolve(src);
      });
    });
  }
  
  // Producer used in promise pool to move remote files
  function *moveRemoteFileProducer(files, dest, conn){
    for(const file of files){
      yield moveRemoteFile(file, dest + file.substring(file.lastIndexOf('/') + 1), conn);
    }
  }
  
  // Function used to move remote files in promise pool
  function moveRemoteFile(src, dest, conn){
    return new Promise((resolve, reject) => {
      conn.sftp((error, sftp) => {
        return sftp.rename(src, dest, (error) => {
          if(error){
            conn.end();
            throw error;
          }
          resolve(src);
        });
      });
    });
  }
  
  
  // Delete remote path
  /*ipcMain.on('delete_remote_files', (event, args) => {
    let conn = new Client();
    conn.on('ready', () => {
      let pool = new PromisePool(deleteRemoteFileProducer(conn, args[1]), 10);
      pool.start().then(() => {
        conn.end();
        let tempArgs = [];
        tempArgs.push(curLocalDir);
        tempArgs.push(curRemoteDir);
        event.sender.send('remote_files_deleted', tempArgs);
      });
    }).connect(args[0]);
  });
  
  // Producer used in promise pool to delete remote files
  function *deleteRemoteFileProducer(conn, files){
    for(const file of files){
      yield deleteRemoteFile(conn, file);
    }
  }
  
  // Function used to delete remote files in promise pool
  function deleteRemoteFile(conn, file){
    return new Promise((resolve, reject) => {
      conn.sftp((error, sftp) => {
        return sftp.unlink(file, (error) => {
          if(error){
            conn.end();
            throw error;
          }
          resolve(file);
        });
      });
    });
  }
  
  // Delete local path
  ipcMain.on('delete_local_files', (event, args) => {
    let pool = new PromisePool(deleteLocalFileProducer(args), 10);
    pool.start().then(() => {
      let tempArgs = [];
      tempArgs.push(curLocalDir);
      tempArgs.push(curRemoteDir);
      event.sender.send('local_files_deleted', tempArgs);
    });
  });
  
  // Producer used in promise pool to delete local files
  function *deleteLocalFileProducer(files){
    for(const file of files){
      yield deleteLocalFile(file);
    }
  }
  
  // Function used to delete local files in promise pool
  function deleteLocalFile(file){
    return new Promise((resolve, reject) => {
      return fs.unlink(file, (error) => {
        if(error) throw error;
        resolve(file);
      });
    });
  }*/
  
  // Make local directory
  ipcMain.on('make_local_dir', (event, args) => {
    fs.mkdir(curLocalDir + args[0], (error) => {
      if(error) throw error;
      let tempArgs = [];
      tempArgs.push(curLocalDir);
      tempArgs.push(curRemoteDir);
      tempArgs.push(args[1]);
      event.sender.send('local_dir_made', tempArgs);
    });
  });
  
  // Make remote directory
  ipcMain.on('make_remote_dir', (event, args) => {
    let conn = new Client();
    conn.on('ready', () => {
      conn.sftp((error, sftp) => {
        sftp.mkdir(curRemoteDir + args[1], (error) => {
          if(error){
            conn.end();
            throw error;
          }
          let tempArgs = [];
          tempArgs.push(curLocalDir);
          tempArgs.push(curRemoteDir);
          tempArgs.push(args[1]);
          event.sender.send('remote_dir_made', tempArgs);
          conn.end();
        });
      });
    }).connect(args[0]);
  });
  