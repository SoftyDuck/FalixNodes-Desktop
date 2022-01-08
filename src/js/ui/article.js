function openPostView() {
    document.getElementById('postview').style.right = '0%';
    document.getElementById('postview').style.opacity = '1';
    document.getElementById('news-back').style.display = 'inherit';
    document.getElementById('allPosts').style.opacity = '0';
}

function closeArticle() {
    document.getElementById('postview').style.right = '-100%';
    document.getElementById('postview').style.opacity = '0';
    document.getElementById('news-back').style.display = 'none';
    document.getElementById('allPosts').style.opacity = '1';
}