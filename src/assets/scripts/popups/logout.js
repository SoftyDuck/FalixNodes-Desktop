function logout() {
    // UI Feedback
    document.querySelector('#master').style.display = 'inherit';
    document.querySelector('p#sm-loggingout').style.display = 'inherit';
    setTimeout(() => {
        document.querySelector('p#sm-loggingout').style.opacity = '1';
    }, 1000);

    // Log Out User
    window.api.send('logout')

    // UI Feedback
    setTimeout(() => {
        document.querySelector('p#sm-restart').style.display = 'inherit';
        document.querySelector('p#sm-loggingout').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('p#sm-loggingout').style.display = 'none';
            document.querySelector('p#sm-restart').style.opacity = '1';
            setTimeout(() => {
                document.querySelector('.fa-spin').style.transition = '1.3s opacity';
                document.querySelector('.fa-spin').style.opacity = '0';
                document.querySelector('p#sm-restart').style.opacity = '0';
            }, 1000);
        }, 1000);
    }, 4000);
}