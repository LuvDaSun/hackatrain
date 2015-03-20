window.addEventListener('load', function() {
    var slice = Array.prototype.slice;
    var trainElements = slice.apply(document.getElementsByClassName('train'));
    var animationFrame;
    window.addEventListener('scroll', function(e) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(function() {
            //document.getElementById('train').style.transform = 'translate3d(0,' + window.pageYOffset + 'px,0)';
            trainElements.forEach(function(trainElement) {
                trainElement.style.top = (window.pageYOffset - 1000) + 'px';
            });
        });
    });
});
