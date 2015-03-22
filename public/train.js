/* jshint browser: true */


jQuery(function($) {

    var $window = $(window);
    var $track = $('#track');
    var $rails = $('#rails');
    var $train = $('#train');

    var trainRange = $rails.height();
    var trainHeight = $train.height();
    var trainOffset = 0 - trainHeight;

    $window.bind('scroll', animate);
    $window.bind('resize', animate);

    animate();

    function animate() {
        var trackPosition = $track.offset();
        var windowHeight = $window.height();
        var scrollOffset = trackPosition.top - windowHeight * 1 / 4;
        var scrollHeight = $track.height() - windowHeight * 2 / 4;
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

        if (top > trainHeight) {
            $train.css({
                top: '',
                transform: 'translate3d(0,' + (trainOffset + top) + 'px,0)',
            });
        }
        else {
            $train.css({
                top: (trainOffset + top) + 'px',
                transform: '',
                //transform: 'translateY(' + (trainOffset + top) + 'px)',
            });
        }
    }

});
