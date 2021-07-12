# Falix Software (Formly FalixNodes Software)
![image](https://user-images.githubusercontent.com/51213244/121123903-fe27d080-c7f1-11eb-9aba-4102590265f7.png)

________________________

## ❔ Q&A for Developers
### Why is Font Awesome included offline? You could use a script instead.
I understand that using one line of code, in this case a link to the Font Awesome script, will do the trick. Yes, you can do that, but the reason why I'm including Font Awesome locally with the software is for offline usage. 

If the user is offline, the icons in the software won't load unless Font Awesome is included locally.

### Why all these requirements to just build it?
The reason why the software needs all these requirements like Python and Visual Studio(Desktop Development with C++) is because of technology that was coded into the software like [Glasstron](https://www.npmjs.com/package/glasstron) for visual appeal and [XTerm](https://xtermjs.org/) for the built-in terminal to use FalixCoins Miner with.

### Why Electron?
#### What is it?
Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologie. It combines the Chromium rendering engine and the Node.js runtime. - [Wikipedia](https://en.wikipedia.org/wiki/Electron_(software_framework))

#### Why I use it
I, Korbs, am mostly comfortable and knowledgeable with web coding languages such as HTML, CSS, and JavaScript. Using Electron was the right approach for me, and I've acquired a huge amount of experience with it over the last three years. Cross-platform support was also shortened and easier for me to do.

There are tons of other good reasons why to use Electron, you can read more about that here on [Alibaba Cloud](https://www.alibabacloud.com/blog/what-is-electronjs-and-why-should-you-use-it_581971) (Article).

________________________

## Push Notification
### What is it?
A push notification works simiar to a native notification, where it pops up like any other notification. With push notifcations, the developer can send a notification at any time he or she wants. Since we're doing this in Electron, the app has to be opened to see the notification. I could let the app run in the background after it closes, but I refuse to, as that could have an impact on performance.

### How to use it?
Falix Software is using a service called [Pushy](https://pushy.me/), which is a reliable push notification delivery system. It's also cross-platform and supports [Electron](https://pushy.me/docs/additional-platforms/electron) application, meaning we can use Pushy API in the main file of Falix Software.

Everything is already setup in the main file, I've had it setup where can you send the title, message, and url for the push notification. You just need to use it right.

In the notification data, when sending a notification, it should look like this:
```
{
  "title": "Title of Notification",
  "message": "This is a message, with a brief explanation or a short description.",
  "url": "https://example.com/"
}
```

In Pushy's API, the data is set out like this:

`title` - `${data.title}`

`message` - `${data.message}`

`url` - `${data.url}`

You can see these used in the main file.

A notification is clicked, a invisible window will open and will trigger the `shell.openExternal('')` command. The reason why we use a URL that has this command seperately, is because using `shell.openExternal` doesn't seem to work in the main file on the Linux platform, but has been tested to work fine on Windows 10.

If a URL isn't used in the notification, you'll be fine. The invisible window will load nothing at all, making it a dummy window.

If a message or title isn't used, it will default to `undefined`.

If you want, you can read [Pushy's Docs](https://pushy.me/docs).

________________________

## 🔧 Preparing to Build
### Requirements
 - [NodeJS](https://nodejs.org/en/) 14.16.0 or above
 - [Python](https://www.python.org/) 3.9 or above
 - G++ (Linux)
    - Debian/Ubuntu: `apt install g++`
    - Fedora: `dnf install g++`
 - [Visual Studio Community](https://visualstudio.microsoft.com/) (Install Desktop Development with C++) (on Windows)
 - [Visual C++ Redistributable](https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0) (on Windows)
 - At least 8GB of storage

### Downloading Source Code
#### Using Git
If you have Git already installed, run the following command to download and automatically extract the source code from our GitHub:
```
git clone https://github.com/FalixNodes-Software/Desktop-App/
```

#### Using GitHub CLI
If you have GitHub CLI already installed, run the following command to download and automatically extract the source code from our GitHub:
```
gh repo clone FalixNodes-Software/Desktop-App
```

If you don't have Git or GitHub CLI installed, you can download it manually from our [GitHub](https://github.com/FalixNodes-Software/Desktop-App/) or install [Git](https://git-scm.com/) or install [GitHub CLI](https://cli.github.com/).

You can also download the source code manually and go from there.

### Building
#### Installing Dependencies
FalixNodes Software uses Electron and other required packages to run the app and uses Electron Builder to package it up nicely. Run the following commands to install them:
```
npm install install
```

### Running
After all required dependencies are installed, you should be able to run the software with the start command provided in __package.json__.

To run the start command, simply run the following command:
```
npm start
```

### Create a Package
Wanna create an installer? You can do this with Electron Builder, there is already a build command ready which is provided in __package.json__.

To start building the installer, run the following command: 
```
npm run build
```

After installer is done building, check the `/dist/` folder.

________________________

## 📊 Benchmark Testing
### What is this?
This will show data and timing of Falix Software being ran on my machines. This will show how well the computer performs running the software, as we're still improving performance in v3.

### Machines
#### HP All In One 24-e014
 - CPU: Intel Core i3 7100u | 2.24GHz | 4 Cores
 - Memory: 16GB DDR4
 - Graphics Card: Intel HD 620 Kaby Lake GT2
 - Storage: 120GB SSD
 - Operating System: Fedora 34
 - Desktop Environment: GNOME 40 Wayland
 - Node Version: v14.17.1

#### Dell Inspiron 15-3552
 Note: This low end laptop appears to have no fans.
 - CPU: Intel Celeron N3060 | 1.60GHz | 2 Cores
 - Memory: 4GB DDR3L
 - Graphics Card: Intel HD (Unknown model)
 - Storage: 320GB HDD
 - Operating System: Windows 10 v1909
 - DirectX: 12
 - Node Version: v14.17.1

#### HP Omni-100 5050
 - CPU: AMD Althon | 1.80Ghz | 2 Cores
 - Memory: 8GB DDR3L
 - Graphics Card: 
 - Storage: 320GB HDD
 - Operating System: Windows 10 v21H1
 - DirectX: 12
 - Node Version: v14.17.1

### Running
Running software after intended install (Not building)

#### HP All In One 24-e014
 - Start software             |        01s

#### Dell Inspiron 15-3552
 - Start software             |        09s

#### HP Omni-100 5050
 - Start software             |        07s


### Building
Running commands from __package.json__ in the following order:
 - Install node packages: `npm i`
 - Rebuild modules like node-pty and Glasstron: `npm run rebuild`
 - Start software: `npm start`
 - Build setup files: `npm run build`

#### HP All In One 24-e014
 - Installing node packges    |        50s
 - Rebuild Modules            |        12s
 - Start software             |        02s
 - Build - Target: AppImage   |     1m 49s
 
 AppImage file is smaller than NSIS

#### Dell Inspiron 15-3552
 - Installing node packges    |    4m  31s
 - Rebuild Modules            |    2m  15s
 - Start software             |        09s
 - Build - Target: NSIS       |    10m 23s

#### HP Omni-100 5050
 - Installing node packges    |    3m  46s
 - Rebuild Modules            |    1m  37s
 - Start software             |        07s
 - Build - Target: NSIS       |    9m  00s

 NOTE: We also build .appx files with [`electron-windows-store`](https://www.npmjs.com/package/electron-windows-store) for the Microsoft Store

________________________

## 💡 Credits
Developer/Maintainer: [Korbs Studio](https://github.com/KorbsStudio)

Blur Composition Effect: [Glasstron by AryToNex](https://github.com/AryToNeX/Glasstron)

Built-in Terminal: [XTerm](https://xtermjs.org/)

Game Panel Controls: [/webview/browser/ in Electron Sample Apps by Hokein](https://github.com/hokein/electron-sample-apps/tree/master/webview/browser)