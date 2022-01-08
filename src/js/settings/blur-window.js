let switches = document.getElementsByClassName('switch');
let blurEffect = localStorage.getItem('blurEffect');

if (blurEffect == null) {
  setBlur('On');
} else {
  setBlur(blurEffect);
}

for (let i of switches) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setBlur(theme);
  });
}

function setBlur(theme) {
  if (theme == 'On') {
    window.api.send('blurToggleOn')
  } else if (theme == 'Off') {
    window.api.send('blurToggleOff')
  }
  localStorage.setItem('blurEffect', theme);
}