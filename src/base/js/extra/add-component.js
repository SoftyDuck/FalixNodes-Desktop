function addComponent() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("add-component");
        if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "This component failed to load, try reloading FalixNodes Desktop.";}
            elmnt.removeAttribute("add-component");
            addComponent();
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
        }
    }
}