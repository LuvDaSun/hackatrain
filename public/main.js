window.addEventListener('load', function() {
    var trainElement = document.getElementById('train');
    var animationFrame;
    window.addEventListener('scroll', function(e) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(function() {
            //document.getElementById('train').style.transform = 'translate3d(0,' + window.pageYOffset + 'px,0)';
            trainElement.style.top = (window.pageYOffset - 150) + 'px';
        });
    });
});
