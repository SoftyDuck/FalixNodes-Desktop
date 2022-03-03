const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#232323"),
    itemBackgroundColor: Color.fromHex("#FFFFFF"),
    svgColor: Color.WHITE,
    icon: path.join(__dirname, '../../../assets/images/icons/app', '/icon.png'),
  })
})

delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;