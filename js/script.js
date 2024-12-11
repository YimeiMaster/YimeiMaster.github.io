// script.js

// 设置导航栏的活动状态
document.querySelectorAll('.nav-link').forEach(function(link) {
    if (window.location.href.indexOf(link.href) > -1) {
        link.classList.add('active');
    }
});
