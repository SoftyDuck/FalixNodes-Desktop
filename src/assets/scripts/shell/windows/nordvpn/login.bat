::===============================================================
:: This script is useless. 
::
:: Before building the this batch file for Windows users, I did't check if NordVPN actually provided a "--login" command on their
:: Windows app, which they don't. Since they don't, this renders the script completely userless. 
::
:: This is also why FalixNodes Desktop has limited interactions on Windows with NordVPN.
::
:: If NordVPN were to ever add more commands on Windows, the script will work
::===============================================================


@echo off
powershell -Command "& {.\zenity --entry}" > email.tmp
set /p EMAIL=email.tmp
powershell -Command "& {.\zenity --password}" > password.tmp
set /p PASSWORD=password.tmp

cd 'C:\Program FIles\NordVPN\'
nordvpn --login --legacy --username %EMAIL% --password %PASSWORD%

Remove-Item .\email.tmp
Remove-Item .\password.tmp