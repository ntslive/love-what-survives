(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-6061419-3', 'auto');

$(document).ready(function() {
    // ga('send', 'pageview', window.location.pathname);

    let audioElement = document.getElementById('nts-player-audio');
    let audioElementHandler = $('#radio-handler-icon');

    audioElementHandler.on('click', function() {
        if (audioElement.paused === false) {
            audioElement.removeAttribute("src"); // src value should already be set to default via RadioPlayerReducer
            audioElement.load();
            audioElementHandler.removeClass("fa-stop").addClass('fa-play');
        } else {
            let time = new Date();
            audioElement.src = "http://listen.nts.live/stream2?t=" + time.valueOf() ;
            audioElement.play();
            audioElementHandler.addClass("fa-stop").removeClass('fa-play');
        }
    });
});