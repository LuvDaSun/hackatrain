/* jshint browser: true */


jQuery(function($) {

    var $window = $(window);
    var trackElement = document.getElementById('track');
    var railsElement = document.getElementById('rails');
    var trainElement = document.getElementById('train');
    var trainRange = railsElement.offsetHeight;
    var trainHeight = trainElement.offsetHeight;
    var trainOffset = 0 - trainHeight;

    $window.bind('scroll', animate);
    $window.bind('resize', animate);

    animate();

    function animate() {
        var scrollOffset = trackElement.offsetTop - window.innerHeight * 1 / 4;
        var scrollHeight = trackElement.offsetHeight - window.innerHeight * 2 / 4;
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
    }

});
