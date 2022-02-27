let alGoogle = localStorage.getItem('alGoogle');

if (autoLoginGoogle == null) {
  autoLoginGoogle('On');
} else {
  autoLoginGoogle(alGoogle);
}

for (let i of switches) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    autoLoginGoogle(theme);
  });
}

function autoLoginGoogle(theme) {
  if (theme == 'On') {
    console.log('Google Auto Login: Active')
    setTimeout(() => {webviewCP.loadURL('https://client.falixnodes.net/auth/google')}, 1000);
    setTimeout(() => {webviewAC.loadURL('https://client.falixnodes.net/auth/google')}, 1000);
  } else if (theme == 'Off') {
    console.log('Google Auto Login: Not Active')
  }
  localStorage.setItem('alGoogle', theme);
}