/* jshint browser */


(function() {

    window.addEventListener('load', window_load);

    var trackElement;
    var railsElement;
    var trainElement;
    var trainRange;
    var trainOffset;

    var animationFrame;

    function window_load() {
        trackElement = document.getElementById('track');
        railsElement = document.getElementById('rails');
        trainElement = document.getElementById('train');
        trainRange = railsElement.offsetHeight;
        trainOffset = 0 - trainElement.offsetHeight;

        animate();

        window.addEventListener('scroll', window_scroll);
        window.addEventListener('resize', window_resize);
    }

    function window_scroll() {
        animate();
    }

    function window_resize() {
        animate();
    }

    function animate() {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(function() {
            var scrollOffset = trackElement.offsetTop - window.innerHeight * 1 / 3;
            var scrollHeight = trackElement.offsetHeight - window.innerHeight * 1 / 3;
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


})();
