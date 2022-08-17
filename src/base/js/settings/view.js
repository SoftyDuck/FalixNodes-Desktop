var setTheme = localStorage.getItem('view')
console.log('Theme:', setTheme)
if (setTheme == null){
    setView('./base/css/settings/view/default.css')
}else{
    setView(setTheme)
}
function setView(sheet){
  document.getElementById('view-setting').href = sheet
  localStorage.setItem('view', sheet)
}