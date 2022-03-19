const fs = require('fs');
const util = require('util');
const { ipcRenderer } = require('electron');
const cons = require('./renderer/console.js');

exports.writeToConsole = function(message){
    document.getElementById('console_output').innerHTML += ('<br>' + '> ' + message);
    document.getElementById('console_output').scrollTop = document.getElementById('console_output').scrollHeight;
  }
  
  function writeToConsole(message){
    document.getElementById('console_output').innerHTML += ('<br>' + '> ' + message);
    document.getElementById('console_output').scrollTop = document.getElementById('console_output').scrollHeight;
  }
  

  exports.getCheckedLocalPaths = function(){
    return getCheckedLocalPaths();
  }
  
  function getCheckedLocalPaths(){
    let arr = [];
    let numElements = document.getElementById('local_dir_display').children.length;
    for(let i = 0; i < numElements; i++){
      if(document.getElementById('local_dir_display').children[i].children[0].children[0].checked){
        arr.push(document.getElementById('local_dir_display').children[i].children[0].children[0].value);
      }
    }
    return arr;
  }
  
  /*function deleteLocalDir(){
    let paths = getCheckedLocalPaths();
    ipcRenderer.send('delete_local_files', paths);
    ipcRenderer.on('local_files_deleted', (event, args) => {
      displayLocalDirListing(args[0]);
      displayRemoteDirListing(args[1]);
      cons.writeToConsole('Local file(s) deleted.')
    });
  }*/
  
  function makeLocalDir(){
    let tempArgs = [];
    tempArgs.push(document.getElementById('input_new_local_dir').value);
    document.getElementById('input_new_local_dir').value = '';
    ipcRenderer.send('make_local_dir', tempArgs);
    ipcRenderer.on('local_dir_made', (event, args) => {
      displayLocalDirListing(args[0]);
      cons.writeToConsole('Local directory ' + args[2] + ' made.')
    });
  }
  
  function copyLocalFiles(){
    document.getElementById('button_local_paste').disabled = false;
    let files = getCheckedLocalPaths();
    ipcRenderer.send('copy_local_files', files);
  }
  
  /*function cutLocalFiles(){
    document.getElementById('button_local_paste').disabled = false;
    let files = getCheckedLocalPaths();
    ipcRenderer.send('cut_local_files', files);
  }*/
  
  function pasteLocalFiles(){
    ipcRenderer.send('paste_local_files');
    ipcRenderer.on('local_files_pasted', (event, args) => {
      displayLocalDirListing(args[0]);
      cons.writeToConsole('Local file(s) pasted in ' + args[0] + '.');
    });
  }
  

function displayLocalDirListing(path){
  ipcRenderer.send('change_local_dir', path);
  fs.readdir(path, (error, files) => {
    if(error){
      cons.writeToConsole(error);
    }
    let numElements = document.getElementById('local_dir_display').children.length;
    for(let i = 0; i < numElements; i++){
      document.getElementById('local_dir_display').children[0].remove();
    }
    if(path != '/'){
      let row = document.createElement('tr');
      let name = document.createElement('td');
      name.addEventListener('dblclick', () => {
        let oldPath = path.substring(0, path.lastIndexOf('/', path.length - 2) + 1);
        displayLocalDirListing(oldPath);
      });
      name.appendChild(document.createTextNode('..'));
      let dir = document.createElement('i');
      dir.className = 'fa-light fa-arrow-right-from-arc';
      dir.style = 'float: right; width: 18px; height: 18px;';
      dir.addEventListener('click', () => {
        let oldPath = path.substring(0, path.lastIndexOf('/', path.length - 2) + 1);
        displayLocalDirListing(oldPath);
      });
      name.appendChild(dir);
      row.appendChild(name);
      document.getElementById('local_dir_display').appendChild(row);
    }
    for(let i = 0; i < files.length; i++){
      let row = document.createElement('tr');
      let name = document.createElement('td');
      let nameText = files[i];
      if(nameText.length > 65){
        nameText = nameText.substring(0, 62) + '...';
      }
      name.appendChild(document.createTextNode(nameText));
      fs.stat(path + files[i], (error, stats) => {
        if(error){
          cons.writeToConsole(error);
          return;
        }
        if(stats.isDirectory()){
          let dir = document.createElement('i');
          dir.className = 'fa-light fa-arrow-right-from-arc';
          dir.style = 'float: right; width: 18px; height: 18px;';
          dir.addEventListener('click', () => {
            displayLocalDirListing(path + files[i] + '/');
          });
          name.addEventListener('dblclick', () => {
            displayLocalDirListing(path + files[i] + '/');
          });
          name.appendChild(dir);
        }
      });
      let details = document.createElement('i');
      details.className = 'fa-light fa-circle-info';
      details.style = 'float: right; width: 18px; height: 18px; margin-left: 3px; margin-right: 3px';
      details.addEventListener('click', () => {
        displayLocalFileProperties(files[i], path + files[i]);
      });
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style = 'float: right; margin-top: 3px';
      checkbox.value = path + files[i];
      name.appendChild(checkbox);
      name.appendChild(details);
      row.appendChild(name);
      document.getElementById('local_dir_display').appendChild(row);
    }
    if(path.length > 55){
      let shortPath = path.substring(path.length - 59);
      shortPath = '...' + shortPath;
      document.getElementById('local_cur_dir').innerHTML = 'Current directory: ' + shortPath;
    }else{
      document.getElementById('local_cur_dir').innerHTML = 'Current directory: ' + path;
    }
  });
}

function displayLocalFileProperties(fileName, path){
  fs.stat(path, (error, stats) => {
    if(error){
      cons.writeToConsole(error);
      return;
    }
    let args = [];
    args.push(fileName);
    args.push(util.inspect(stats).substring(8, util.inspect(stats).length - 2));
    ipcRenderer.send('display_file_properties', args);
  });
}


exports.displayRemoteDirListing = function(path){
    displayRemoteDirListing(path);
  }
  
  function displayRemoteDirListing(path){
    let args = [];
    args.push(getConnectionSettings());
    args.push(path);
    ipcRenderer.send('get_remote_dir_list', args);
    ipcRenderer.on('remote_dir_list', (event, args) => {
      ipcRenderer.on('sftp_message', (event, args) => {
        cons.writeToConsole(args);
      });
      let numElements = document.getElementById('remote_dir_display').children.length;
      for(let i = 0; i < numElements; i++){
        document.getElementById('remote_dir_display').children[0].remove();
      }
      if(path != '/'){
        let row = document.createElement('tr');
        let name = document.createElement('td');
        name.addEventListener('dblclick', () => {
          let oldPath = path.substring(0, path.lastIndexOf('/', path.length - 2) + 1);
          displayRemoteDirListing(oldPath);
        });
        name.appendChild(document.createTextNode('..'));
        let dir = document.createElement('i');
        dir.className = 'fa-light fa-arrow-right-from-arc';
        dir.style = 'float: right; width: 18px; height: 18px;';
        dir.addEventListener('click', () => {
          let oldPath = path.substring(0, path.lastIndexOf('/', path.length - 2) + 1);
          displayRemoteDirListing(oldPath);
        });
        name.appendChild(dir);
        row.appendChild(name);
        document.getElementById('remote_dir_display').appendChild(row);
      }
      for(let i = 0; i < args[0].length; i++){
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let nameText = args[0][i].filename;
        if(nameText.length > 65){
          nameText = nameText.substring(0, 62) + '...';
        }
        name.appendChild(document.createTextNode(nameText));
        let details = document.createElement('i');
        details.className = 'fa-light fa-circle-info';
        details.style = 'float: right; width: 18px; height: 18px; margin-left: 3px; margin-right: 3px';
        details.addEventListener('click', () => {
          let props = 'mode: ' + args[0][i].attrs.mode + '\n' + 'uid: ' + args[0][i].attrs.uid + '\n' +'gid: ' + args[0][i].attrs.gid + '\n' +'size: ' + args[0][i].attrs.size + '\n' +'atime: ' + args[0][i].attrs.atime + '\n' +'mtime: ' + args[0][i].attrs.mtime;
          displayRemoteFileProperties(args[0][i].filename, props);
        });
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style = 'float: right; margin-top: 3px';
        checkbox.value = path + args[0][i].filename;
        name.appendChild(checkbox);
        name.appendChild(details);
  
        if(args[1][i]){
          let dir = document.createElement('i');
          dir.className = 'fa-light fa-arrow-right-from-arc';
          dir.style = 'float: right; width: 18px; height: 18px;';
          dir.addEventListener('click', () => {
            displayRemoteDirListing(path + args[0][i].filename + '/');
          });
          name.addEventListener('dblclick', () => {
            displayRemoteDirListing(path + args[0][i].filename + '/');
          });
          name.appendChild(dir);
        }
  
        row.appendChild(name);
        document.getElementById('remote_dir_display').appendChild(row);
      }
      if(path.length > 55){
        let shortPath = path.substring(path.length - 59);
        shortPath = '...' + shortPath;
        document.getElementById('remote_cur_dir').innerHTML = 'Current directory: ' + shortPath;
      }else{
        document.getElementById('remote_cur_dir').innerHTML = 'Current directory: ' + path;
      }
    });
    ipcRenderer.on('sftp_message', (event, args) => {
      cons.writeToConsole(args);
    });
  }
  
  function displayRemoteFileProperties(fileName, stats){
    let args = [];
    args.push(fileName);
    args.push(stats);
    ipcRenderer.send('display_file_properties', args);
  }
  

function setConnectionSettings(){
  let host = document.getElementById('input_host');
  let port = document.getElementById('input_port');
  let username = document.getElementById('input_username');
  let password = document.getElementById('input_password');
  if(host.readOnly == false){
    host.readOnly = true;
    port.readOnly = true;
    username.readOnly = true;
    password.readOnly = true;
    document.getElementById('button_connect').disabled = true;
    document.getElementById('button_remote_disconnect').disabled = false;
    document.getElementById('button_local_upload').disabled = false;
    document.getElementById('button_remote_copy').disabled = false;
    // document.getElementById('button_remote_cut').disabled = false;
    document.getElementById('button_remote_download').disabled = false;
    document.getElementById('button_remote_new_dir').disabled = false;
    cons.writeToConsole('Connection settings: ' + username.value + '@' + host.value + ':' + port.value + ' established.');
    remoteDir.displayRemoteDirListing('/');
    ipcRenderer.on('sftp_message', (event, args) => {
      cons.writeToConsole(args[0]);
    });
  }
}

function editConnectionSettings(){
  let host = document.getElementById('input_host');
  let port = document.getElementById('input_port');
  let username = document.getElementById('input_username');
  let password = document.getElementById('input_password');
  if(host.readOnly == true){
    host.readOnly = false;
    port.readOnly = false;
    username.readOnly = false;
    password.readOnly = false;
    document.getElementById('button_connect').disabled = false;
    document.getElementById('button_remote_disconnect').disabled = true;
    document.getElementById('button_local_upload').disabled = true;
    document.getElementById('button_remote_copy').disabled = true;
    // document.getElementById('button_remote_cut').disabled = true;
    document.getElementById('button_remote_paste').disabled = true;
    document.getElementById('button_remote_download').disabled = true;
    document.getElementById('button_remote_new_dir').disabled = true;
    cons.writeToConsole('Connection settings now editable.');
    let numElements = document.getElementById('remote_dir_display').children.length;
    for(let i = 0; i < numElements; i++){
      document.getElementById('remote_dir_display').children[0].remove();
    }
    document.getElementById('remote_cur_dir').innerHTML = 'Current directory:';
  }
}

function getConnectionSettings(){
  let connectionSettings = {
    host: document.getElementById('input_host').value,
    port: document.getElementById('input_port').value,
    username: document.getElementById('input_username').value,
    password: document.getElementById('input_password').value,
  }
  return connectionSettings;
}

function getCheckedRemotePaths(){
  let arr = [];
  let numElements = document.getElementById('remote_dir_display').children.length;
  for(let i = 0; i < numElements; i++){
    if(document.getElementById('remote_dir_display').children[i].children[0].children[0].checked){
      arr.push(document.getElementById('remote_dir_display').children[i].children[0].children[0].value);
    }
  }
  return arr;
}

function downloadFromServer(){
  let paths = getCheckedRemotePaths();
  let connectionSettings = getConnectionSettings();
  let tempArgs = [];
  tempArgs.push(connectionSettings);
  tempArgs.push(paths);
  if(paths.length > 1){
    cons.writeToConsole('Downloading files...');
  }else{
    cons.writeToConsole('Downloading ' + paths[0].substring(paths[0].lastIndexOf('/') + 1) + '...');
  }
  ipcRenderer.send('download_remote_files', tempArgs);
  ipcRenderer.on('remote_download_complete', (event, args) => {
    displayRemoteDirListing(args[1]);
    if(args[2] > 1){
      cons.writeToConsole('Files downloaded to ' + args[0] + '.');
    }else{
      cons.writeToConsole(paths[0].substring(paths[0].lastIndexOf('/') + 1) + ' downloaded to ' + args[0] + '.');
    }
  });
}

function uploadToServer(){
  let paths = local.getCheckedLocalPaths();
  let connectionSettings = getConnectionSettings();
  if(paths.length > 1){
    cons.writeToConsole('Uploading files...');
  }else{
    cons.writeToConsole('Uploading ' + paths[0].substring(paths[0].lastIndexOf('/') + 1) + '...');
  }
  let tempArgs = [];
  tempArgs.push(connectionSettings);
  tempArgs.push(paths);
  ipcRenderer.send('upload_local_files', tempArgs);
  ipcRenderer.on('local_upload_complete', (event, args) => {
    displayRemoteDirListing(args[1]);
    if(args[2] > 1){
      cons.writeToConsole('Files uploaded to ' + args[1] + '.');
    }else{
      cons.writeToConsole(paths[0].substring(paths[0].lastIndexOf('/') + 1) + ' uploaded to ' + args[1] + '.');
    }
  });
}

/*function deleteRemoteDir(){
  let paths = getCheckedRemotePaths();
  let connectionSettings = getConnectionSettings();
  let tempArgs = [];
  tempArgs.push(connectionSettings);
  tempArgs.push(paths);
  ipcRenderer.send('delete_remote_files', tempArgs);
  ipcRenderer.on('remote_files_deleted', (event, args) => {
    displayLocalDirListing(args[0]);
    displayRemoteDirListing(args[1]);
    cons.writeToConsole('Remote file(s) deleted.')
  });
}*/

function makeRemoteDir(){
  let connectionSettings = getConnectionSettings();
  let tempArgs = [];
  tempArgs.push(connectionSettings);
  tempArgs.push(document.getElementById('input_new_remote_dir').value);
  document.getElementById('input_new_remote_dir').value = '';
  ipcRenderer.send('make_remote_dir', tempArgs);
  ipcRenderer.on('remote_dir_made', (event, args) => {
    displayRemoteDirListing(args[1]);
    cons.writeToConsole('Remote directory ' + args[2] + ' made.')
  });
}

function copyRemoteFiles(){
  document.getElementById('button_remote_paste').disabled = false;
  let files = getCheckedRemotePaths();
  ipcRenderer.send('copy_remote_files', files);
}

/*function cutRemoteFiles(){
  document.getElementById('button_remote_paste').disabled = false;
  let files = getCheckedRemotePaths();
  ipcRenderer.send('cut_remote_files', files);
}*/

function pasteRemoteFiles(){
  let connectionSettings = getConnectionSettings();
  ipcRenderer.send('paste_remote_files', connectionSettings);
  ipcRenderer.on('remote_files_pasted', (event, args) => {
    displayRemoteDirListing(args[1]);
    cons.writeToConsole('Remote file(s) pasted in ' + args[1] + '.');
  });
}
