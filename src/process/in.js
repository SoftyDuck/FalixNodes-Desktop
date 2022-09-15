"undefined"==typeof chrome&&(chrome={});{const{app:e,ipcMain:t}=require("electron"),o=require("glasstron"),r=require("powershell"),l=require("child_process")["exec"],i=require("path");"darwin"==process.platform?e.whenReady().then(()=>{global.blur="vibrancy",global.frame=!1,global.titleBarStyle="hiddenInset"}):"win32"==process.platform?e.whenReady().then(()=>{global.blur="acrylic",global.frame=!1}):e.whenReady().then(()=>{global.blur="blurbehind",global.frame=!0}),e.on("ready",()=>{let s=new o.BrowserWindow({width:1200,height:800,frame:!0,autoHideMenuBar:!0,blur:!0,blurType:"blurbehind",webPreferences:{preload:i.join(__dirname,"./preload.js"),webviewTag:!0}});s.loadFile("./src/index.html"),t.on("restartApp",()=>{e.relaunch({args:process.argv.slice(1).concat(["--relaunch"])}),e.exit(0)}),t.on("resetSystemHostFile",()=>{"darwin"==process.platform?console.log("Resetting Host File"):"win32"==process.platform?(console.log("Resetting Host File"),new r(`
      cp C:WindowsSystem32driversetchosts C:WindowsSystem32driversetchosts_backup
      Invoke-WebRequest -Uri "https://raw.githubusercontent.com/FalixNodes-Software/FalixNodes-Desktop/directive-rewrite-of-v4/src/base/etc/hosts" -OutFile "C:WindowsSystem32driversetchosts"
      powershell (New-Object -ComObject Wscript.Shell).Popup("Host file has been resetted.",0,"FalixNodes Desktop - Troubleshooting",0x0)
      powershell (New-Object -ComObject Wscript.Shell).Popup("Original hosts file was backed up to your Documents.",0,"FalixNodes Desktop - Troubleshooting",0x0)
  `)):(console.log("Resetting Host File"),l(`
      PASSWD="$(zenity --password --title=Authentication Required)
"
      echo -e $PASSWD | sudo -S       sudo cp /etc/hosts /etc/hosts_backup
      cd /etc/
      sudo rm hosts
      
      (sudo wget https://raw.githubusercontent.com/FalixNodes-Software/FalixNodes-Desktop/directive-rewrite-of-v4/src/base/etc/hosts) | zenity --progress --title="FalixNodes Desktop - Troubleshooting" --text="Downloading default hosts file..." --pulsate --width="500"
      
      zenity --info --text="Original hosts file was backed up to your Documents."
    `))}),t.on("blurOn",async(e,t)=>{null!==s&&e.sender.send("blurStatus",await s.setBlur(!0))}),t.on("blurOff",async(e,t)=>{null!==s&&e.sender.send("blurStatus",await s.setBlur(!1))}),t.on("blurTransparent",()=>{s.blurType="transparent"}),t.on("enableBlur",()=>{s.blurType=global.blur})})}