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

function setupRadioPlayer() {
    const width = window.innerWidth;
    const isMobile = width <= 767;

    // let startTime = moment().add(2, 'seconds');
    // let endTime = moment().add(7, 'seconds');
    let startTime = moment.utc("2017-09-07 17:00"); // yyyy-mm-dd
    let endTime = moment.utc("2017-09-07 18:00"); // yyyy-mm-dd

    let audioElement = document.getElementById('nts-player-audio');
    let radioIsPlaying = false;
    let audioElementHandler, $audioIcon, $beforeEl, $duringEl, $radioHandler, $afterEl;
    if (isMobile) {
        audioElementHandler = $('#mobile-radio-player');
        $audioIcon = $('#radio-handler-icon-mobile');

        $beforeEl = $('#before-text-mobile');
        $duringEl = $('#during-text-mobile');
        $radioHandler = $('#header__radio-player__handler--mobile');
        $afterEl = $('#after-text-mobile');
    } else {
        audioElementHandler = $('.header__radio-player');
        $audioIcon = $('#radio-handler-icon-desktop');

        $beforeEl = $('#before-text');
        $duringEl = $('#during-text');
        $radioHandler = $('#header__radio-player__handler--desktop');
        $afterEl = $('#after-text');
    }

    function stopRadio() {
        if (!radioIsPlaying) return;

        audioElement.removeAttribute("src"); // src value should already be set to default via RadioPlayerReducer
        audioElement.load();
        $audioIcon.removeClass("fa-stop").addClass('fa-play');

        radioIsPlaying = false;
    }

    function playRadio() {
        if (radioIsPlaying) return;

        let time = new Date();
        audioElement.src = "http://stream-relay-geo.ntslive.net/stream?t=" + time.valueOf() ;
        audioElement.play();
        $audioIcon.addClass("fa-stop").removeClass('fa-play');

        radioIsPlaying = true;
    }

    audioElementHandler.on('click', function() {
        let now = moment.utc();
        if (now > startTime && now < endTime) {
            if (radioIsPlaying) {
                stopRadio();
            } else {
                playRadio();
            }
        }
    });

    let autoplayed = false; // Only autoplay once (don't want to autoplay after it's been actively paused.
    let startedEllipsis = false;
    function handleRadioTextDisplay() {
        let now = moment.utc();

        if (now < startTime) {
            $beforeEl.removeClass("hidden");

            if (!startedEllipsis) {
                setupMovingEllipsis();
                startedEllipsis = true;
            }
        } else if (now < endTime) {
            $beforeEl.addClass("hidden");
            $radioHandler.removeClass("hidden");
            audioElementHandler.addClass("cursor-pointer");
            $duringEl.removeClass("hidden");

            if (!autoplayed) {
                playRadio();
                autoplayed = true;
                $(document).trigger("breakEllipsisInterval");
            }
        } else {
            $beforeEl.addClass("hidden");
            $radioHandler.addClass("hidden");
            audioElementHandler.removeClass("cursor-pointer");
            $duringEl.addClass("hidden");
            $afterEl.removeClass('hidden');

            stopRadio();
        }
    }

    handleRadioTextDisplay();
    setInterval(handleRadioTextDisplay, 5000);
}

function setupMovingEllipsis() {
    let $ellipsisEl = $('#ellipsis');
    let i = 0;
    function handleMovingEllipsis() {
        if (i === 3) {
            i = 0;
        } else {
            i++;
        }

        let text = "";
        for (let j=0; j<i; j++) {
            text += '.';
        }

        $ellipsisEl.text(text);
    }
    let ellipsisInterval = setInterval(handleMovingEllipsis, 1000);

    $(document).on('breakEllipsisInterval', function() {
        window.clearInterval(ellipsisInterval);
    });
}


$(document).ready(function() {
    ga('send', 'pageview', window.location.pathname);

    setupRadioPlayer();

    const isMobile = window.innerWidth <= 767;
    if (isMobile) {
        $('canvas').remove();
    }
});
