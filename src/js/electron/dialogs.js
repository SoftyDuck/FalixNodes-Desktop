const { type } = require('os');
const path = require('path');
var downloadMinerWinCPU = document.getElementById('windows-miner-cpu');
var downloadMinerWinGPU = document.getElementById('windows-miner-gpu');
var downloadMinerLinuxCPU = document.getElementById('linux-miner-cpu');
var downloadMinerLinuxGPU = document.getElementById('linux-miner-gpu');
var downloadMinerMacCPU = document.getElementById('mac-miner-cpu');

// OS - Windows - CPU
downloadMinerWinCPU.addEventListener('click', (event) => {
    dialog.showMessageBox({
        buttons: ['Canel', 'Download'],
        icon: path.join(__dirname, '../../images/icons/app/64x64.png'),
        title: 'Falix Software',
        message: 'FalixCoins Miner',
        detail: 'You are about to download the cpu mining software for FalixCoins, download now? Remember to add the file to a new folder on your desktop.',
    }).then(box => {
        console.log('Button Clicked Index - ', box.response);
      
        if (box.response === 0) {
            console.log('User triggered "Cancel" button in dialog.'); // For debugging only
        } else if (box.response === 1) {
            console.log('User triggered "Download" button in dialog.'); // For debugging only
            location.href = "https://github.com/FalixInc/FalixCoins-Miner/releases/download/1.0/falixnodes_miner-win.exe"; // Download file
        }
    }).catch(err => {
        console.log(err)
    })
});

// OS - Windows - GPU
downloadMinerWinGPU.addEventListener('click', (event) => {
    dialog.showMessageBox({
        buttons: ['Canel', 'Download'],
        icon: path.join(__dirname, '../../images/icons/app/64x64.png'),
        title: 'Falix Software',
        message: 'FalixCoins Miner',
        detail: 'You are about to download the cpu mining software for FalixCoins, download now? Remember to add the file to a new folder on your desktop.',
    }).then(box => {
        console.log('Button Clicked Index - ', box.response);
      
        if (box.response === 0) {
            console.log('User triggered "Cancel" button in dialog.'); // For debugging only
        } else if (box.response === 1) {
            console.log('User triggered "Download" button in dialog.'); // For debugging only
            location.href = "https://github.com/FalixInc/FalixCoins-Miner/releases/download/1.0/falixnodes_gpu_miner-win.exe"; // Download file
        }
    }).catch(err => {
        console.log(err)
    })
});


// OS - Linux - CPU
downloadMinerLinuxCPU.addEventListener('click', (event) => {
    dialog.showMessageBox({
        buttons: ['Canel', 'Download'],
        icon: path.join(__dirname, '../../images/icons/app/64x64.png'),
        title: 'Falix Software',
        message: 'FalixCoins Miner',
        detail: 'You are about to download the cpu mining software for FalixCoins, download now? Remember to add the file to a new folder on your desktop.',
    }).then(box => {
        console.log('Button Clicked Index - ', box.response);
      
        if (box.response === 0) {
            console.log('User triggered "Cancel" button in dialog.'); // For debugging only
        } else if (box.response === 1) {
            console.log('User triggered "Download" button in dialog.'); // For debugging only
            location.href = "https://github.com/FalixInc/FalixCoins-Miner/releases/download/1.0/falixnodes_miner-linux"; // Download file
        }
    }).catch(err => {
        console.log(err)
    })
});
  
// OS - Linux - GPU
downloadMinerLinuxGPU.addEventListener('click', (event) => {
    dialog.showMessageBox({
        buttons: ['Canel', 'Download'],
        icon: path.join(__dirname, '../../images/icons/app/64x64.png'),
        title: 'Falix Software',
        message: 'FalixCoins Miner',
        detail: 'You are about to download the cpu mining software for FalixCoins, download now? Remember to add the file to a new folder on your desktop.',
    }).then(box => {
        console.log('Button Clicked Index - ', box.response);
      
        if (box.response === 0) {
            console.log('User triggered "Cancel" button in dialog.'); // For debugging only
        } else if (box.response === 1) {
            console.log('User triggered "Download" button in dialog.'); // For debugging only
            location.href = "https://github.com/FalixInc/FalixCoins-Miner/releases/download/1.0/falixnodes_gpu_miner-linux"; // Download file
        }
    }).catch(err => {
        console.log(err)
    })
});


// OS - macOS - CPU
downloadMinerMacCPU.addEventListener('click', (event) => {
    dialog.showMessageBox({
        buttons: ['Canel', 'Download'],
        icon: path.join(__dirname, '../../images/icons/app/64x64.png'),
        title: 'Falix Software',
        message: 'FalixCoins Miner',
        detail: 'You are about to download the cpu mining software for FalixCoins, download now? Remember to add the file to a new folder on your desktop.',
    }).then(box => {
        console.log('Button Clicked Index - ', box.response);
      
        if (box.response === 0) {
            console.log('User triggered "Cancel" button in dialog.'); // For debugging only
        } else if (box.response === 1) {
            console.log('User triggered "Download" button in dialog.'); // For debugging only
            location.href = "https://github.com/FalixInc/FalixCoins-Miner/releases/download/1.0/falixnodes_miner-macos"; // Download file
        }
    }).catch(err => {
        console.log(err)
    })
});