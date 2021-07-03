// /* eslint-disable no-undef */
// "use strict";

// document.documentElement.classList.add("dark");
// document.getElementById("__container").classList.add("dark-bg");

// let toggled = null;
// electron.ipcRenderer.send("blurQuery");

// electron.ipcRenderer.on("blurStatus", (e, res) => {
// 	toggled = res;
// 	document.getElementById("toggle").innerHTML = "Toggle " + (toggled ? "off" : "on");
// });

// electron.ipcRenderer.on("darkTheme", (e, isDark) => {
// 	if(isDark){
// 		document.documentElement.classList.remove("light");
// 		document.getElementById("__container").classList.remove("light-bg");
// 		document.documentElement.classList.add("dark");
// 		document.getElementById("__container").classList.add("dark-bg");
// 	}else{
// 		document.documentElement.classList.remove("dark");
// 		document.getElementById("__container").classList.add("dark-bg");
// 		document.documentElement.classList.add("light");
// 		document.getElementById("__container").classList.add("light-bg");
// 	}
// });

// document.getElementById("toggle").onclick = () => {
// 	electron.ipcRenderer.send("blurToggle", !toggled);
// };

// if(process.platform === "win32"){
// 	document.getElementById("win32-select").onchange = () => {
// 		electron.ipcRenderer.send("blurTypeChange", document.getElementById("win32-select").value);
// 	};

// 	electron.ipcRenderer.on("supportsAcrylic", () => {
// 		const acrylic = document.createElement("option");
// 		acrylic.value = "acrylic";
// 		acrylic.innerHTML = "acrylic";
// 		document.getElementById("win32-select").appendChild(acrylic);
// 	});

// 	electron.ipcRenderer.on("blurTypeChanged", (e, res) => {
// 		document.getElementById("win32-p").innerHTML = "Current blur type: " + res.toString();
// 	});

// 	document.getElementById("win32").classList.remove("hidden");
// }

// if(process.platform === "linux"){
// 	electron.ipcRenderer.send("wmQuery");
	
// 	electron.ipcRenderer.on("wmString", (e, res) => {
// 		const linp = document.getElementById("linux-wm");
// 		linp.innerHTML = "Current window manager: " + res;
// 		linp.classList.remove("hidden");
		
// 		if(res === "GNOME Shell"){
// 			const gnomeSlider = document.getElementById("gnomeSlider");
// 			gnomeSlider.oninput = () => {
// 				electron.ipcRenderer.send("gnomeSigma", parseInt(gnomeSlider.value));
// 			};
// 			gnomeSlider.classList.remove("hidden");
// 		}
		
// 		if(res === "KWin"){
// 			electron.ipcRenderer.on("maximized", (e, res) => {
// 				document.getElementById("__container").style["border-radius"] = res ? "0" : "20px";
// 			});
// 		}
// 	});
// }
