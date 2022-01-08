let switches_bt = document.getElementsByClassName('switch_bt');
let blurType = localStorage.getItem('blurType');

if (blurType == null) {} else {setBlurType(blurType);}

for (let i of switches_bt) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setBlurType(theme);
  });
}

function setBlurType(theme) {
  if (theme == 'btBH') {
    window.api.send('btBH')
  } else if (theme == 'btTP') {
    window.api.send('btTP')
  } else if (theme == 'btAY') {
    window.api.send('btAY')
  } else if (theme == 'btVB') {
    window.api.send('btVB')
  }
  localStorage.setItem('blurType', theme);
}