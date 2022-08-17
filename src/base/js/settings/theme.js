var setTheme = localStorage.getItem('theme')
console.log('Theme:', setTheme)
if (setTheme == null){
    swapTheme('./base/css/settings/theme/dark.css')
}else{
    swapTheme(setTheme)
}
function swapTheme(sheet){
  document.getElementById('theme-setting').href = sheet
  localStorage.setItem('theme', sheet)
}