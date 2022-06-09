// videoPlayer
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {
  const videoPlayers = document.querySelectorAll('.video-player');
  Array.from(videoPlayers).forEach(videoPlayer => {
    const video = videoPlayer.querySelector('video');
    const videoPlayBtn = videoPlayer.querySelector('.video-player__play');
    const videoPlaybackBtn = videoPlayer.querySelector('.video-player__playback');

    const videoControls = videoPlayer.querySelector('.video-player__controls');
    const videoProgress = videoPlayer.querySelector('.video-player__duration');
    const videoSoundBtn = videoPlayer.querySelector('.video-player__sound');
    const videoSoundRange = videoPlayer.querySelector('.video-player__sound-range');
    let currentSoundValue;
    const videoFullscreenBtn = videoPlayer.querySelector('.video-player__fullscreen');

    // States
    const PAUSED = 'paused';
    const PLAYING = 'playing';

    // Initial state
    let state = PAUSED;

    video.addEventListener('loadedmetadata', function() {
       if (videoProgress) videoProgress.setAttribute('max', video.duration);
    });

    videoPlayBtn.addEventListener("click", videoPlayback);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    videoPlayer.addEventListener("mouseover", controlsVisible);
    videoPlayer.addEventListener("mouseleave", controlsHide);

    if (videoProgress) videoProgress.addEventListener('input', function(e) {
       video.currentTime = this.value;
    });

    if (videoPlaybackBtn) videoPlaybackBtn.addEventListener("click", videoPlayback);

    if (videoSoundBtn) videoSoundBtn.addEventListener('click', function(e) {
      video.muted = !video.muted;
      if (video.muted) {
        videoSoundBtn.setAttribute('data-state','muted');
        videoSoundRange.value = 0;
        videoSoundRange.style.backgroundSize = 0;

      } else {
        videoSoundBtn.setAttribute('data-state','on');
        videoSoundRange.value = 50;
        videoSoundRange.style.backgroundSize = '50% 100%';
      }
    });

    if (videoSoundRange) {
      currentSoundValue = videoSoundRange.value;
      videoSoundRange.addEventListener('change', function(){
        currentSoundValue = videoSoundRange.value;
        video.volume = currentSoundValue / 100;

        if (currentSoundValue == 0) {
          video.muted = true;
          videoSoundBtn.setAttribute('data-state','muted');
        }
        else {
          video.muted = false;
          videoSoundBtn.setAttribute('data-state','on');
        }
       console.log('volume ' + video.volume);
      });
    };

    if (videoFullscreenBtn) videoFullscreenBtn.addEventListener("click", function() {
      const modalVideo = document.querySelector('#modal-video .modal-dialog');
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    });

    Array.from(document.querySelectorAll('.modal')).forEach(modal => {
      modal.addEventListener('hidden.bs.modal', function (e) {
        onPause();
      });
    });

    function videoPlayback() {
      if (video.paused || video.ended) {
        onPlay();
      } else {
        onPause();
      }
    };

    function onPlay() {
      state = PLAYING;
      video.play();
      if (videoProgress) progressLoop();
      videoPlayBtn.setAttribute('data-state','pause');
      if (videoPlaybackBtn) videoPlaybackBtn.setAttribute('data-state','pause');
      if (videoControls) controlsHide();
    };

    function onPause() {
        state = PAUSED;
        video.pause();
        videoPlayBtn.setAttribute('data-state','play');
        if (videoPlaybackBtn) videoPlaybackBtn.setAttribute('data-state','play');
        if (videoControls) controlsVisible();
    };

    function progressLoop() {
      if(state === PLAYING) {
        videoProgress.value = video.currentTime;
        videoProgress.style.backgroundSize = ((video.currentTime / video.duration) * 100) + '% 100%';
        requestAnimationFrame(progressLoop);
      }
    };
    function controlsVisible() {
        if (videoControls) videoControls.setAttribute('data-state','visible');
    };
    function controlsHide() {
      if (state === PLAYING) {
        setTimeout(function() {
          if (videoControls) videoControls.setAttribute('data-state','hidden');
        }, 1500);
      }
    };

  });

}