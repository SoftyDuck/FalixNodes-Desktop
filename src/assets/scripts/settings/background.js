setTimeout(() => {
  const customBackground = document.querySelector('.appBackground');
  const textBG = document.querySelector('.bgURL');
  const buttonBG = document.querySelector('#use-custom-background > div > button');

  customBackground.addEventListener('input', name => {
    textBG.textContent = name.target.value
  })

  const saveToLocal = () => {
    localStorage.setItem('customBackground', textBG.textContent)
  }

  buttonBG.addEventListener('click', saveToLocal)

  const customBG = localStorage.getItem('customBackground')

  if (customBackground) {
    textBG.textContent = customBG;
    document.querySelector('img#primary-background').setAttribute('src', customBG);
  }
}, 2000);

function setBG1() {localStorage.setItem('customBackground', './imgs/pexels-eberhard-grossgasteiger-2310646.jpg'); document.querySelector('img#primary-background').setAttribute('src', customBG);}
function setBG2() {localStorage.setItem('customBackground', './imgs/pexels-eberhard-grossgasteiger-844297.jpg'); document.querySelector('img#primary-background').setAttribute('src', customBG);}
function setBG3() {localStorage.setItem('customBackground', './imgs/pexels-eberhard-grossgasteiger-12365968.jpg'); document.querySelector('img#primary-background').setAttribute('src', customBG);}
function setBG4() {localStorage.setItem('customBackground', './imgs/pexels-eberhard-grossgasteiger-12366149.jpg'); document.querySelector('img#primary-background').setAttribute('src', customBG);}
function setBG5() {localStorage.setItem('customBackground', './imgs/pexels-eberhard-grossgasteiger-12366148.jpg'); document.querySelector('img#primary-background').setAttribute('src', customBG);}
function setBG6() {localStorage.setItem('customBackground', './imgs/pexels-eberhard-grossgasteiger-12366150.jpg'); document.querySelector('img#primary-background').setAttribute('src', customBG);}