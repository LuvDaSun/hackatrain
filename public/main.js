/* jshint browser */

window.addEventListener('load', function() {
    var railsElement = document.getElementById('rails');
    var trainElement = document.getElementById('train');
    var animationFrame;
    var trainRange = railsElement.offsetHeight;
    var trainOffset = 0 - trainElement.offsetHeight;

    window.addEventListener('scroll', move);
    window.addEventListener('resize', move);

    function move(e) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(function() {
            var scrollOffset = railsElement.offsetTop + window.innerHeight / 2 - trainOffset / 2;
            var scrollHeight = railsElement.offsetHeight;

            if (window.pageYOffset < scrollOffset) {
                trainElement.style.top = trainOffset + 'px';
            }
            else if (window.pageYOffset < scrollOffset + scrollHeight) {
                trainElement.style.top = (trainOffset + trainRange * Math.sin(Math.PI * (window.pageYOffset - scrollOffset) / scrollHeight / 2)) + 'px';
            }
            else {
                trainElement.style.top = (trainOffset + trainRange) + 'px';
            }
        });
    }

});
