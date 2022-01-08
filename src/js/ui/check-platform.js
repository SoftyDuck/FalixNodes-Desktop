var OSName="Unknown OS";
var platformCheck = document.getElementById("tools");


if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="macOS";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";

if (OSName === 'macOS') {
    platformCheck.insertAdjacentHTML("afterend", "<link rel='stylesheet' href='./css/platforms/macOS.css'>");
}
if (OSName === 'windows') {
    platformCheck.insertAdjacentHTML("afterend", "<link rel='stylesheet' href='./css/platforms/windows.css'>");
}
if (OSName === 'linux') {
    platformCheck.insertAdjacentHTML("afterend", "<link rel='stylesheet' href='./css/platforms/linux.css'>");
}