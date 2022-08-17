var setTheme = localStorage.getItem('accent')
console.log('Accent Color:', setTheme)
if (setTheme == null){
    swapAccentColor('./base/css/settings/accent-colors/default.css')
}else{
    swapAccentColor(setTheme)
}
function swapAccentColor(sheet){
  document.getElementById('accent-setting').href = sheet
  localStorage.setItem('accent', sheet)
}

function accentColorReset() {
  document.querySelector('#ss-color-default').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-classic').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-red').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-orange').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-yellow').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-green').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-lime').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-pink').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
  document.querySelector('#ss-color-gray').setAttribute('class', 'fa-duotone fa-circle-dot fa-swap-opacity');
}