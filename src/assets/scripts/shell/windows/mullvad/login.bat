@echo off 
powershell -Command "& {.\zenity --entry}" > %TEMP%\mull-id.tmp
set /p ID=<%TEMP%\mull-id.tmp
 
cd\Program Files\Mullvad VPN\resources
 
.\mullvad.exe account set %ID%
 
cd /D %temp%
 
del mull-id.tmp"