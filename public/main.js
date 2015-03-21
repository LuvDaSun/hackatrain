/* jshint browser */



window.addEventListener('load', function() {
    var trackElement = document.getElementById('track');
    var railsElement = document.getElementById('rails');
    var trainElement = document.getElementById('train');
    var trainRange = railsElement.offsetHeight;
    var trainOffset = 0 - trainElement.offsetHeight;

    window.addEventListener('scroll', move);
    window.addEventListener('resize', move);
    move();

    var animationFrame;

    function move() {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(function() {
            var scrollOffset = trackElement.offsetTop - window.innerHeight / 2;
            var scrollHeight = trackElement.offsetHeight;
            var top;

            if (window.pageYOffset < scrollOffset) {
                top = 0;
            }
            else if (window.pageYOffset < scrollOffset + scrollHeight) {
                //top = trainRange * (window.pageYOffset - scrollOffset) / scrollHeight;
                top = trainRange * Math.sin(Math.PI * (window.pageYOffset - scrollOffset) / scrollHeight / 2);
            }
            else {
                top = trainRange;
            }

            if (top > trainElement.offsetHeight) {
                trainElement.style.top = '';
                trainElement.style.transform = 'translate3d(0,' + (trainOffset + top) + 'px,0)';
            }
            else {
                trainElement.style.top = (trainOffset + top) + 'px';
                trainElement.style.transform = '';
                //trainElement.style.transform = 'translateY(' + (trainOffset + top) + 'px)';
            }
        });
    }

});
