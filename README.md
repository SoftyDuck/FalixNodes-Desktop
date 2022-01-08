![image](https://i.imgur.com/7yzQ8u1.png)

Simple and stylish to use! Access FalixNodes features such as your client and game panel, help center, phpMyAdmin, status, and more all from a centralized place.

[Download Now](https://desktop.falixnodes.net/)  
[View on Electron Apps](https://www.electronjs.org/apps/falix-software)

___

## FAQ
Q: Why and what's the point of this software?

A: Originally, the software was created by a member of the community to avoid having to use their web browser to access FalixNodes. FalixNodes Desktop served as a fast and intuitive way to access FalixNodes’ services, and it continues to do so today.  

<br/>

Q: Who is the developer of FalixNodes Desktop?

A: FalixNodes Desktop is developed and owned by Korbs Studio. To be clear, Korbs Studio owns the code to ONLY FalixNodes Desktop for desktop and does NOT have ownership over FalixNodes itself.    

<br/>

Q: Can I use FalixNodes Desktop?

A: It supports Windows 7/8/10/11, macOS Yosemite and up, and Linux. You may be able to run FalixNodes Desktop on a chromebook as well.

As for mobile, you can try out our mobile app, which serves the same purpose as our desktop software.   

<br/>

Q: Is this official software by FalixNodes?

A: Yes, FalixNodes Desktop has been approved official software for FalixNodes.

<br/>

Q: How do I update it?

A: This is done automatically on Windows and Linux. We recommend that you wait at least 1 - 2 minutes for the update to download in the background, or depending on your internet speed.

On macOS, you must manually install each update. You don’t have to do this every time; if you want the latest version in general, you may update. This is due to the fact that we need to sign our DMG file in order for updates to function; we are still working on signing the DMG file with our Apple Certificate.

<br/>

## FAQ - For Developers
Q: Why is Font Awesome included offline? Just use a script instead.

A: I understand that using one line of code, in this case a link to the Font Awesome script, will do the trick. Yes, you can do that, but the reason why I'm including Font Awesome locally with the software is for offline usage.

If the user is not connected to the internet, the software's icons will not load unless Font Awesome is installed locally. 

<br/>

Q: Why Electron and what is it?

A.1 (Why): I, Korbs, am mostly comfortable and knowledgeable with web coding languages such as HTML, CSS, and JavaScript. Using Electron was the right approach for me, and I've acquired a huge amount of experience with it over the last three years. The process of doing cross-platform support was also shortened and easier for me to do.

A.2 (What): Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologie. It combines the Chromium rendering engine and the Node.js runtime. - [Wikipedia](https://en.wikipedia.org/wiki/Electron_(software_framework))

___

## Development and Building
## Checklist
 - Using latest version of ElectronJS
 - Using latest version of Electron Builder
 - Using latest version of Glasstron
 - Update server is pointed to correct source
 - FalixNodes Desktop starts up with no errors on all platforms
   - Windows
   - macOS
   - Linux (Bad Atom error allowed if on GNOME(X11) Desktop)

### Preparing to Develop FalixNodes Desktop
#### Requirements
To run FalixNodes Desktop in development mode and later build it, you must have the following installed on your workstation:
 - NodeJS 16 and up
 - Pyton 3.10 and up
 - g++ (Linux)
 - Visual Studio (Windows)
   - Development with C++
 - Visual C++ Redistributable (Windows)
 - At least 8GB of storage

It's also a good idea to have a capable code editor and be familiar with the fundamentals of the ElectronJS framework.

### Building FalixNodes Desktop
#### Electron Builder Environment
You should probably adjust a few additional things for Electron Builder before building. 

First off, what is Electron Builder?

We can easily distribute FalixNodes Desktop cross-platform using Electron Builder, which has auto-update support out of the box. We can also distribute our software in other formats if we wanted to like Snap, MSI, PKG, etc.

<br/>

What needs to be changed?

We include assets with our setup files like banners, backgrounds, and licenes. If you're planning on building your software on top of a fork of FalixNodes Desktop, it's best you change these to not confuse users who will use your fork. 

Everything you need to change is located in the `/build` folder, also note that any files in this folder won't be distrbuted as part of the software itself. So if you were to set the software icon, and point to the icon file in the build folder, it won't work in production. The build folder is for Electron Builder only.

You need to change the following files as they may include the name "FalixNodes" or include screenshots of previous versions of FalixNodes Desktop:
 - `/build/background.png` - Background of the DMG installer (macOS)
 - `/build/installSidebar.bmp` - Sidebar banner of the NSIS installer (Windows)
 - `/build/license_*.txt` - All license files
 - `/build/icons`/ - Obviously the icon, the icon included is trademark of FalixNodes Limited

 A Figma file is included if you want to the same layout for the background and banner.

## Credits
 - Developer: [Korbs Studio](https://github.com/KorbsStudio/)
 - Framework: [Electron](https://electronjs.org/)
 - Blur Composition Effect: [Glasstron](https://github.com/NyaomiDEV/Glasstron/)