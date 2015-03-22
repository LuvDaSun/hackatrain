/* jshint browser: true */


jQuery(function($) {
    var Modernizr = window.Modernizr;
    var $window = $(window);
    var $track = $('#track');
    var $rails = $('#rails');
    var $train = $('#train');

    var trainRange = $rails.height();
    var trainHeight = $train.height();
    var trainOffset = 0 - trainHeight;
    var transformPrefixed = Modernizr.prefixed('transform');

    var move = Modernizr.csstransforms && Modernizr.csstransforms3d ? function(top) {
        if (top > trainHeight) {
            $train.css(transformPrefixed, 'translate3d(0,' + (trainOffset + top) + 'px,0)');
        }
        else {
            $train.css(transformPrefixed, 'translate(0,' + (trainOffset + top) + 'px)');
        }
    } : function(top) {
        $train.css({
            top: (trainOffset + top) + 'px',
        });
    };


    $window.bind('scroll', animate);
    $window.bind('resize', animate);

    animate();

    function animate() {
        var trackPosition = $track.offset();
        var windowHeight = $window.height();
        var scrollOffset = trackPosition.top - windowHeight * 1 / 4;
        var scrollHeight = $track.height() - windowHeight * 2 / 4;

        if (window.pageYOffset < scrollOffset) {
            move(0);
        }
        else if (window.pageYOffset < scrollOffset + scrollHeight) {
            //move(trainRange * (window.pageYOffset - scrollOffset) / scrollHeight);
            move(trainRange * Math.sin(Math.PI * (window.pageYOffset - scrollOffset) / scrollHeight / 2));
        }
        else {
            move(trainRange);
        }


    }



});
