function hideBlog() {
    document.querySelector('.posts').style.opacity = '0';
    document.querySelector('.posts').style.transform = 'translate(110%, 0px)';
    document.querySelector('webview#article-viewer').style.right = '0%';
    document.querySelector('webview#article-viewer').style.opacity = '1';

    document.querySelector('button#blogBack').style.display = 'inherit';
}

function showBlog() {
    document.querySelector('.posts').style.opacity = '1';
    document.querySelector('.posts').style.transform = 'translate(0%, 0px)';
    document.querySelector('webview#article-viewer').style.right = '-100%';
    document.querySelector('webview#article-viewer').style.opacity = '0';

    document.querySelector('button#blogBack').style.display = 'none';
}