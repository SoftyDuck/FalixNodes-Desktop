const storageInput = document.querySelector('.storage');
const text = document.querySelector('.text');
const button = document.querySelector('.btn');

storageInput.addEventListener('input', name => {
  text.textContent = name.target.value
})

const saveToLocal = () => {
  localStorage.setItem('textInput', text.textContent)
}

button.addEventListener('click', saveToLocal)

const storedInput = localStorage.getItem('textInput')

if (storageInput) {
  text.textContent = storedInput;
  document.querySelector('img#primary-background').setAttribute('src', storedInput);
}

function setBG1() {localStorage.setItem('textInput', './base/img/backgrounds/pexels-eberhard-grossgasteiger-2310646.jpg'); document.querySelector('img#primary-background').setAttribute('src', storedInput);}
function setBG2() {localStorage.setItem('textInput', './base/img/backgrounds/pexels-eberhard-grossgasteiger-844297.jpg'); document.querySelector('img#primary-background').setAttribute('src', storedInput);}
function setBG3() {localStorage.setItem('textInput', './base/img/backgrounds/pexels-eberhard-grossgasteiger-12365968.jpg'); document.querySelector('img#primary-background').setAttribute('src', storedInput);}
function setBG4() {localStorage.setItem('textInput', './base/img/backgrounds/pexels-eberhard-grossgasteiger-12366149.jpg'); document.querySelector('img#primary-background').setAttribute('src', storedInput);}
function setBG5() {localStorage.setItem('textInput', './base/img/backgrounds/pexels-eberhard-grossgasteiger-12366148.jpg'); document.querySelector('img#primary-background').setAttribute('src', storedInput);}
function setBG6() {localStorage.setItem('textInput', './base/img/backgrounds/pexels-eberhard-grossgasteiger-12366150.jpg'); document.querySelector('img#primary-background').setAttribute('src', storedInput);}