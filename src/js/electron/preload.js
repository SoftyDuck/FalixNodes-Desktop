const remote = require('electron').remote;

const win = remote.getCurrentWindow();

window.addEventListener("DOMContentLoaded", () => {
    handleWindowControls();
});

window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

function handleWindowControls() {
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

console.log('preload.js file is loaded.')
delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;


function downloadStartedNotify(){
    const notif={
          title: 'Download Started',
          body: 'Download file...',
        };
    new Notification(notif).show();
  }
  function downloadSuccessNotify(){
    const notif={
          title: 'Download Successful',
          body: 'The file has been downloaded.',
        };
    new Notification(notif).show();
  }
  function downloadFailedNotify(){
    const notif={
          title: 'Download Failed',
          body: `${state}`,
        };
    new Notification(notif).show();
  }