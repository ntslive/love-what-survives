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
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-6061419-3', 'auto');

$(document).ready(function() {
    // ga('send', 'pageview', window.location.pathname); // FIXME unncomment for live!!!

    let audioElement = document.getElementById('nts-player-audio');
    let audioElementHandler = $('#radio-handler-icon');
    let radioIsPlaying = false;

    function stopRadio() {
        if (!radioIsPlaying) return;

        audioElement.removeAttribute("src"); // src value should already be set to default via RadioPlayerReducer
        audioElement.load();
        audioElementHandler.removeClass("fa-stop").addClass('fa-play');

        radioIsPlaying = false;
    }

    function playRadio() {
        if (radioIsPlaying) return;

        let time = new Date();
        audioElement.src = "http://listen.nts.live/stream2?t=" + time.valueOf() ;
        audioElement.play();
        audioElementHandler.addClass("fa-stop").removeClass('fa-play');

        radioIsPlaying = true;
    }

    audioElementHandler.on('click', function() {
        if (radioIsPlaying) {
            stopRadio();
        } else {
            playRadio();
        }
    });


    let startTime = moment().add(2, 'seconds');
    let endTime = moment().add(7, 'seconds');
    // let startTime = moment.utc("2017-09-04 14:12"); // yyyy-mm-dd
    // let endTime = moment.utc("2017-09-04 14:13"); // yyyy-mm-dd
    console.log(startTime.toDate());
    console.log(endTime.toDate());

    let $beforeEl = $('#before-text');
    let $duringEl = $('#during-text');
    let $radioHandler = $('.header__radio-player__handler');
    let $afterEl = $('#after-text');

    function handleRadioTextDisplay() {
        let now = moment.utc();

        if (now < startTime) {
            $beforeEl.removeClass("hidden");
        } else if (now < endTime) {
            $beforeEl.addClass("hidden");
            $radioHandler.removeClass("hidden");
            $duringEl.removeClass("hidden");

            playRadio()
        } else {
            $beforeEl.addClass("hidden");
            $radioHandler.addClass("hidden");
            $duringEl.addClass("hidden");
            $afterEl.removeClass('hidden');

            stopRadio();
        }
    }

    handleRadioTextDisplay();
    setInterval(handleRadioTextDisplay, 5000);
});
