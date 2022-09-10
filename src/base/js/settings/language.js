var setTheme = localStorage.getItem('language')
console.log('Language:', setTheme)
if (setTheme == null){
    swapLanguage('./base/css/settings/language/english.css')
}else{
    swapLanguage(setTheme)
}
function swapLanguage(sheet){
  document.getElementById('language-setting').href = sheet
  localStorage.setItem('language', sheet)
}

function languageReset() {
  document.querySelector('#ss-language-english i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-bengali i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-chinese i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-french i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-german i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-hindi i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-latvian i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-portuguese i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-russian i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-spanish i').setAttribute('class', 'fa-duotone fa-circle');
  document.querySelector('#ss-language-turkish i').setAttribute('class', 'fa-duotone fa-circle');
}