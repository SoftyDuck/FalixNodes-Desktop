setTimeout(() => {
    const customUsername = document.querySelector('.appUsername');
    const textUN = document.querySelector('.setName');
    const buttonUN = document.querySelector('#cswU');
  
    customUsername.addEventListener('input', name => {
      textUN.textContent = name.target.value
    })
  
    const saveToLocal = () => {
      localStorage.setItem('customUsername', textUN.textContent)
    }
  
    buttonUN.addEventListener('click', saveToLocal)
  
    const username = localStorage.getItem('customUsername')
  
    if (customUsername) {
      textUN.textContent = username;
      document.querySelector('#username').innerHTML = username + '!';
    }
}, 2750);