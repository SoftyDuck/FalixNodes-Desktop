const {exec} = require("child_process");
const PowerShell = require("powershell");
const log = require("electron-log");
module.exports = {
    name: "loginVPN", once: false, execute(primaryWindow) {
        switch (process.platform) {
            case "linux":
                exec(`
      MULLID=$( zenity --entry --text="Type in your Mullvad Account Number" )

      if [ $? = 0 ]
      then
          mullvad account set $MULLID
      else
          echo "Mullvad login was cancelled."
      fi
      `);
                break
            case "win32":
                let ps = new PowerShell(`
      Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::InputBox('Your Mullvad Account Number:', 'FalixNodes Desktop - External Mullvad Login') > mull-id.tmp
      $MULLVADID = Get-Content -Path mull-id.tmp -RAW

      mullvad.exe account set $MULLVADID > mullvad-login.txt
      $MULLVADMSG1 = Get-Content -Path mullvad-login.txt -RAW

      Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::($MULLVADMSG1)
      `)
                break
        }
        primaryWindow.sender.executeJavaScript('document.querySelector(".sContainer#MULLVAD-FAILED").style.display = "none";').then(r => {
            log.info("Successfully changed #mullvad-failed container style to none");
        })
    }
}