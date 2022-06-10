if (navigator.platform.match(/(Mac)/i)) {
    document.querySelector('body').insertAdjacentHTML("afterend", "<link rel='stylesheet' href='./assets/stylesheets/platforms/macOS.css'>");
}
if (navigator.platform.match(/(Linux)/i)) {
    document.querySelector('body').insertAdjacentHTML("afterend", "<link rel='stylesheet' href='./assets/stylesheets/platforms/linux.css'>");
} else {
    document.querySelector('body').insertAdjacentHTML("afterend", "<link rel='stylesheet' href='./stassets/ylesheets/platforms/windows.css'>");
}