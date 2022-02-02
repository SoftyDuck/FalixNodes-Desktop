let gpLOI = document.getElementsByClassName('switch');
let thyGamePanel = localStorage.getItem('thyGamePanel');

if (thyGamePanel == null) {
    GPLS('Off');
} else {
    GPLS(thyGamePanel);
}

for (let i of gpLOI) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    GPLS(theme);
  });
}

function GPLS(theme) {
  if (theme == 'On') {
    setTimeout(() => {
        loadGamePanel()
    }, 1000);
  } else if (theme == 'Off') {
    
  }
  localStorage.setItem('thyGamePanel', theme);
}