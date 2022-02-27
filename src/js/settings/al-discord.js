let alDiscord = localStorage.getItem('alDiscord');

if (autoLoginDiscord == null) {
  autoLoginDiscord('On');
} else {
  autoLoginDiscord(alDiscord);
}

for (let i of switches) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    autoLoginDiscord(theme);
  });
}

function autoLoginDiscord(theme) {
  if (theme == 'On') {
    console.log('Discord Auto Login: Active')
    setTimeout(() => {webviewCP.loadURL('https://client.falixnodes.net/auth/oauth/discord')}, 0500);
    setTimeout(() => {webviewAC.loadURL('https://client.falixnodes.net/auth/oauth/discord')}, 1000);
  } else if (theme == 'Off') {
    console.log('Discord Auto Login: Not Active')
  }
  localStorage.setItem('alDiscord', theme);
}