window.document.addEventListener('scroll', function(e) {
    //document.getElementById('train').style.transform = 'translate3d(0,' + e.target.body.scrollTop + 'px,0)';
    document.getElementById('train').style.top = (e.target.body.scrollTop - 150) + 'px';
});
