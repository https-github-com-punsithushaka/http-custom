const playBtn = document.querySelector(".play"),
    skipForward = document.querySelector(".skip-forward"),
    skipBack = document.querySelector(".skip-back"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),
    progressHead = document.querySelector('.progress-head'),

    currentTimeHtml = document.querySelector(".current-time"),
    durationHtml = document.querySelector(".duration"),

    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.img'),
    title = document.querySelector(".audio-title"),
    singer = document.querySelector(".audio-singer");

this.tracks = [
    {
        name: "SHAA FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.ggpht.com/GVDvyxywvpbXZGvMDq6FV08nStnOGOyUPMiRd1CaXWkEgN6NSlJOG5Ak0EJgR4_LNHAl5h5r=s48-c-k-c0x00ffffff-no-rj",
        source: "https://radio.lotustechnologieslk.net:2020/stream/shaafmgarden",
    },
    {
        name: "SIRASA FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.ggpht.com/TUSJzwrR0HJ-rhcCmAehUp3-ALRji2Fv0qThpybu9WeIXsdnRfgaQb25kx3_A1lBtd6vTgSi=s176-c-k-c0x00ffffff-no-rj-mo",
        source: "https://ssl.shoutcaststreaming.us:8078/index.html/stream?1680368785",
    },
    {
        name: "SIYATHA FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.googleusercontent.com/ytc/AL5GRJWRTb2uaD9AZoaQUvg2FZVr0asck5Qg1WXK46ZnFA=s176-c-k-c0x00ffffff-no-rj-mo",
        source: "https://s9.voscast.com:9393/live?1680369928",
    },
    {
        name: "BEE FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.ggpht.com/a9NDtrWfjD9ClOC4R_7WTM2vr5kTp1f5j-O8Q0wHlEeCeorExMuDgU3xmf9QuAlOrH8LoT3e390=s176-c-k-c0x00ffffff-no-rj-mo",
        source: "https://ssl.surfmusic.de/s.php?s=http://stream.zeno.fm/6pftgwe91rhvv?1680370070",
    },
    {
        name: "CITY FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.googleusercontent.com/ytc/AL5GRJXj0-MD32pepWFMZuhkqh4vQ2aHPIX8ELD4zF35=s176-c-k-c0x00ffffff-no-rj-mo",
        source: "https://ssl.surfmusic.de/s.php?s=http://220.247.227.20:8000/citystream?1680370150",
    },
    {
        name: "FM DERANA",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.googleusercontent.com/ytc/AL5GRJW7wQTdwSqSNgyQTOjGqBIEOuudeQLyCfxYp2O31g=s176-c-k-c0x00ffffff-no-rj-mo",
        source: "https://us10a.serverse.com/proxy/fmderana?mp=/stream&1680370206",
    },
    {
        name: "ITN FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.googleusercontent.com/ytc/AL5GRJUxjUGne0i4Pteh1IpgE1zFUDTPFD4ypbMsZlNzMA=s176-c-k-c0x00ffffff-no-rj-mo",
        source: "https://cp12.serverse.com/proxy/itnfm?mp=/stream&1680370262",
    },
    {
        name: "Y FM",
        artist: "Pruduct By Punsith__S",
        cover: "https://yt3.googleusercontent.com/ytc/AL5GRJWMnS4t-oQnPQuJYH5xDhUUeRNjVjNclPv6ETUU=s176-c-k-c0x00ffffff-no-rj",
        source: "https://ssl.shoutcaststreaming.us:8079/stream?1680370379",
    },
];

// Initial state values
let audio = null,
    barWidth = null,
    duration = null,
    currentTime = null,
    isTimerPlaying = false,
    currentTrackIndex = 0,
    currentTrack = tracks[0];

// Set initial state values
audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

progressBarContainer.addEventListener('click', (x) => {
    let maxduration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxduration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    img.src = currentTrack.cover;
});


skipForward.addEventListener('click', () => {

    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }

    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

skipBack.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        this.currentTrackIndex = this.tracks.length - 1;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        let curmin = Math.floor(audio.currentTime / 60);
        let cursec = Math.floor(audio.currentTime - curmin * 60);

        if (durmin < 10) durmin = "0" + durmin;

        if (dursec < 10) dursec = "0" + dursec;

        if (curmin < 10) curmin = "0" + curmin;

        if (cursec < 10) cursec = "0" + cursec;

        duration = durmin + ":" + dursec;
        currentTime = curmin + ":" + cursec;

        progressBar.style.width = `${barWidth}%`;
        progressHead.style.setProperty("left", `${barWidth}%`)
        currentTimeHtml.innerText = `${currentTime}`;
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');


        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }
};

audio.onended = function () { };

// Animations
TweenMax.from('.img', 4, { rotation: "+=360", transformOrigin: "50% 50%", ease: Linear.easeNone, repeat: -1 });
gsap.from("body, h1, .audio-img, .audio-title, .audio-singer, .audio-btns", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});