const hotkeys = [
    {
      id: "Open Dashboard",
      title: "Open Dashboard",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M128 184C128 206.1 110.1 224 88 224H40C17.91 224 0 206.1 0 184V136C0 113.9 17.91 96 40 96H88C110.1 96 128 113.9 128 136V184zM128 376C128 398.1 110.1 416 88 416H40C17.91 416 0 398.1 0 376V328C0 305.9 17.91 288 40 288H88C110.1 288 128 305.9 128 328V376zM160 136C160 113.9 177.9 96 200 96H248C270.1 96 288 113.9 288 136V184C288 206.1 270.1 224 248 224H200C177.9 224 160 206.1 160 184V136zM288 376C288 398.1 270.1 416 248 416H200C177.9 416 160 398.1 160 376V328C160 305.9 177.9 288 200 288H248C270.1 288 288 305.9 288 328V376zM320 136C320 113.9 337.9 96 360 96H408C430.1 96 448 113.9 448 136V184C448 206.1 430.1 224 408 224H360C337.9 224 320 206.1 320 184V136zM448 376C448 398.1 430.1 416 408 416H360C337.9 416 320 398.1 320 376V328C320 305.9 337.9 288 360 288H408C430.1 288 448 305.9 448 328V376z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk1').click()
      }
    },
    {
      id: "Open Client Area",
      title: "Open Client Area",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 272c70.75 0 128-57.25 128-128V0l-64 32l-64-32L160 32L96 0v144C96 214.8 153.3 272 224 272zM144 128h160v16C304 188.1 268.1 224 224 224S144 188.1 144 144V128zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk3').click()
      }
    },
    {
      id: "Open Servers Panel",
      title: "Open Servers Panel",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white;" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 288H32c-17.62 0-32 14.38-32 32v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32v-128C512 302.4 497.6 288 480 288zM352 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S365.3 408 352 408zM416 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S429.3 408 416 408zM480 32H32C14.38 32 0 46.38 0 64v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32V64C512 46.38 497.6 32 480 32zM352 152c-13.25 0-24-10.75-24-24S338.8 104 352 104S376 114.8 376 128S365.3 152 352 152zM416 152c-13.25 0-24-10.75-24-24S402.8 104 416 104S440 114.8 440 128S429.3 152 416 152z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk4').click()
      }
    },
    {
      id: "Open Database Management",
      title: "Open Database Management",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk5').click()
      }
    },
    {
      id: "Open SFTP",
      title: "Open SFTP",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M566.6 211.6C557.5 199.1 543.4 192 527.1 192H134.2C114.3 192 96.2 204.5 89.23 223.1L32 375.8V96c0-17.64 14.36-32 32-32h117.5c8.549 0 16.58 3.328 22.63 9.375L258.7 128H448c17.64 0 32 14.36 32 32h32c0-35.35-28.65-64-64-64H272L226.7 50.75C214.7 38.74 198.5 32 181.5 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h403.1c21.11 0 39.53-13.53 45.81-33.69l60-192C578.4 239.6 575.8 224 566.6 211.6zM543.2 244.8l-60 192C481.1 443.5 475 448 467.1 448H64c-3.322 0-6.357-.9551-9.373-1.898c-2.184-1.17-4.109-2.832-5.596-4.977c-3.031-4.375-3.703-9.75-1.828-14.73l72-192C121.5 228.2 127.5 224 134.2 224h393.8c5.141 0 9.844 2.375 12.89 6.516C543.9 234.7 544.8 239.9 543.2 244.8z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk6').click()
      }
    },
    {
      id: "Open Help Center",
      title: "Open Help Center",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M208 224C196.1 224 188 232.1 188 244c0 11.04 8.955 20 20 20s20-8.955 20-20C228 232.1 219 224 208 224zM224.6 80H188.2C163.8 80 144 99.84 144 124.2c0 8.844 7.156 16 16 16s16-7.156 16-16C176 117.5 181.5 112 188.2 112h36.36C233.1 112 240 118.9 240 127.4c0 5.875-3.266 11.16-8.734 13.89L200.6 157.2C195.3 159.1 192 165.4 192 171.4V192c0 8.844 7.156 16 16 16S224 200.8 224 192V181.1l21.78-11.31C261.1 161.8 272 145.5 272 127.4C272 101.3 250.7 80 224.6 80zM416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 41.48 17.07 79.54 45.44 109.6c-15.17 32.34-38.65 58.07-38.95 58.38c-6.514 6.836-8.309 16.91-4.568 25.67C5.754 378.4 14.26 384 23.66 384c54.19 0 97.76-20.73 125.9-39.17C168.1 349.4 187.7 352 208 352C322.9 352 416 273.2 416 176zM208 320c-16.96 0-34.04-2.098-50.75-6.232L143.7 310.4L132 318.1c-20.43 13.38-51.58 28.99-89.85 32.97c9.377-12.11 22.3-30.63 32.24-51.82l9.242-19.71L68.72 263.7C44.7 238.2 32 207.9 32 176C32 96.6 110.1 32 208 32S384 96.6 384 176S305 320 208 320zM606.4 435.4C627.6 407.1 640 372.9 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 5.43-.4668 10.76-.9414 16.09C447.4 192.1 447.7 192 448 192c88.22 0 160 64.6 160 144c0 28.69-9.424 56.45-27.25 80.26l-13.08 17.47l11.49 18.55c6.568 10.61 13.18 19.74 18.61 26.74c-18.26-1.91-36.45-6.625-54.3-14.09l-12.69-5.305l-12.58 5.557C495.9 475 472.3 480 448 480c-75.05 0-137.7-46.91-154.9-109.7c-10.1 3.336-20.5 6.132-31.2 8.271C282.7 455.1 357.1 512 448 512c29.82 0 57.94-6.414 83.12-17.54C555 504.5 583.7 512 616.3 512c9.398 0 17.91-5.57 21.73-14.32c3.74-8.758 1.945-18.84-4.568-25.67C633.3 471.8 619.6 456.8 606.4 435.4zM388.7 338c-6.25 6.25-6.25 16.38 0 22.62L426 398c3 3 7.062 4.688 11.31 4.688S445.6 401 448.6 398l82.67-82.69c6.25-6.25 6.25-16.38 0-22.62s-16.38-6.25-22.62 0l-71.36 71.38l-26.02-26.03C405.1 331.8 394.9 331.8 388.7 338z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk7').click()
      }
    },
    {
      id: "Open Settings",
      title: "Open Settings",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white;" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384H186.5C173.4 421.3 137.8 448 96 448C42.98 448 .0003 405 .0003 352C.0003 298.1 42.98 256 96 256C137.8 256 173.4 282.7 186.5 320H480zM64 352C64 369.7 78.33 384 96 384C113.7 384 128 369.7 128 352C128 334.3 113.7 320 96 320C78.33 320 64 334.3 64 352zM325.5 128C338.6 90.71 374.2 64 416 64C469 64 512 106.1 512 160C512 213 469 256 416 256C374.2 256 338.6 229.3 325.5 192H32C14.33 192 0 177.7 0 160C0 142.3 14.33 128 32 128H325.5zM416 192C433.7 192 448 177.7 448 160C448 142.3 433.7 128 416 128C398.3 128 384 142.3 384 160C384 177.7 398.3 192 416 192z"/></svg>',
      handler: () => {
        document.querySelector('sidebar .tabs #fxdk10').click()
      }
    },
    // {
    //   id: "Theme",
    //   title: "Change theme...",
    //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 80.02c-97.25 0-175.1 78.76-175.1 175.1s78.75 175.1 175.1 175.1S640 353.3 640 256S561.3 80.02 464 80.02zM165.5 346.5c-49.87-49.87-49.87-131.1 0-180.1C200.6 130.4 251 120.5 295.3 134.8c7.5-10.37 15.87-19.1 25.12-28.87L271.5 9.655c-6.375-12.87-24.62-12.87-30.1 0l-47.25 94.61L92.78 70.77C79.15 66.27 66.28 79.27 70.78 92.77l33.5 100.4L9.656 240.5c-12.87 6.374-12.87 24.62 0 30.1l94.62 47.24l-33.5 100.5c-4.5 13.62 8.5 26.5 21.1 21.1l100.4-33.5l47.25 94.61c6.375 12.87 24.62 12.87 30.1 0l47.37-94.61l5.25 1.75c-10.75-9.749-20.25-20.5-28.75-32.25C251 391.5 200.6 381.6 165.5 346.5zM256 160C203.1 160 160 203.1 160 256s43.12 95.99 95.1 95.99c7.75 0 15.12-1.25 22.25-2.875c-14.12-27.1-22.26-59.6-22.26-93.09S264.1 190.9 278.3 162.9C271.1 161.3 263.8 160 256 160z"/></svg>',
    //   children: [
    //     {
    //       id: "Dark Theme",
    //       title: "Change theme to Dark",
    //       icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"/></svg>',
    //       keywords: "lol",
    //       handler: () => {
    //         console.log("triggered");
    //       }
    //     },
    //     {
    //       id: "Light Theme",
    //       title: "Change theme to Light",
    //       icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z"/></svg>',
    //       children: [
    //         {
    //           id: "I think it worked",
    //           title: "I think it worked",
    //           icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" style="fill: white" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"/></svg>',
    //           keywords: "lol",
    //           handler: () => {
    //             console.log("triggered");
    //           }
    //         }
    //       ]
    //     },
    //   ]
    // }
  ];
setTimeout(() => { // Like a lot of things in FalixNodes Desktop, loading certain things too soon will break things.
    const ninja = document.querySelector("ninja-keys");
    ninja.data = hotkeys;
}, 2500);