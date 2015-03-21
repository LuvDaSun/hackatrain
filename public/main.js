/* jshint browser */

window.addEventListener('load', function() {
    var trainElement = document.getElementById('train');
    var animationFrame;
    window.addEventListener('scroll', function(e) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(function() {
            trainElement.style.top = (window.pageYOffset - 1000) + 'px';
        });
    });
});
