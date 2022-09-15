let switches_bt = document.getElementsByClassName('switch_bt');
let blurSetting = localStorage.getItem('blurSetting');

if (blurSetting == null) {} else {setBlur(blurSetting);}

for (let i of switches_bt) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setBlur(theme);
  });
}

function setBlur(theme) {
  if (theme == 'blurOn') {
    window.api.send('blurOn')
    window.api.send('enableBlur')
    document.querySelector('#blur-setting-On').style.borderColor = 'var(--accent)';
    document.querySelector('#blur-setting-Off').style.borderColor = 'rgba(52, 52, 52, 0.961)';
    document.querySelector('#blur-setting-Transparent').style.borderColor = 'rgba(52, 52, 52, 0.961)';
  } else if (theme == 'blurTransparent') {
    window.api.send('blurTransparent')
    document.querySelector('#blur-setting-On').style.borderColor = 'rgba(52, 52, 52, 0.961)';
    document.querySelector('#blur-setting-Off').style.borderColor = 'rgba(52, 52, 52, 0.961)';
    document.querySelector('#blur-setting-Transparent').style.borderColor = 'var(--accent)';
  } else if (theme == 'blurOff') {
    window.api.send('blurOff')
    window.api.send('blurTransparent')
    document.querySelector('#blur-setting-On').style.borderColor = 'rgba(52, 52, 52, 0.961)';
    document.querySelector('#blur-setting-Off').style.borderColor = 'var(--accent)';
    document.querySelector('#blur-setting-Transparent').style.borderColor = 'rgba(52, 52, 52, 0.961)';
  }
  localStorage.setItem('blurSetting', theme);
}