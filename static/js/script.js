(() => {
  'use strict'

  // Bootstrap validation
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

// mask input date
const inputsDate = document.querySelectorAll('.form-control--mask-date');
Array.from(inputsDate).forEach(input => {
  input.addEventListener('focus', function() {
    input.setAttribute('type', 'date');
  });
  input.addEventListener('focusout', function() {
    if (input.value == '') input.setAttribute('type', 'text');
  });
});

// modal UserType
if(window.location.pathname === '/'){
  const modalUserType = new bootstrap.Modal(document.getElementById('modal-user-type'));
  modalUserType.show();
}

// Virtual Keyboard
const Keyboard = window.SimpleKeyboard.default;
const KeyboardLayouts = window.SimpleKeyboardLayouts.default;
const layout = new KeyboardLayouts().get("russian");

const myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
   ...layout,
   physicalKeyboardHighlight: true,
});

document.querySelector(".form-control-search").addEventListener("input", event => {
  myKeyboard.setInput(event.target.value);
});

function onChange(input) {
  document.querySelector(".form-control-search").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = myKeyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  console.log(currentLayout);
  myKeyboard.setOptions({
    layoutName: shiftToggle
  });
}

// lazyload
  document.addEventListener("DOMContentLoaded", function() {
    const lazyVideos = [].slice.call(document.querySelectorAll("video.lazyload"));
    if ("IntersectionObserver" in window) {
      const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(video) {
          if (video.isIntersecting) {
            for (const source in video.target.children) {
              const videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.classList.remove("lazyload");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });

      lazyVideos.forEach(function(lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  });

//  tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

// videoPlayer
  const videoPlayers = document.querySelectorAll('.video-player');
  Array.from(videoPlayers).forEach(videoPlayer => {
    const video = videoPlayer.querySelector('video');
    const videoPlayBtn = videoPlayer.querySelector('.video-player__play');
    const videoPlaybackBtn = videoPlayer.querySelector('.video-player__playback');
    const videoSoundBtn = videoPlayer.querySelector('.video-player__sound');
    const videoSoundRange = videoPlayer.querySelector('.video-player__sound-range');
    let currentSoundValue;
    const videoFullscreenBtn = videoPlayer.querySelector('.video-player__fullscreen');

    videoPlayBtn.addEventListener("click", function() {
      videoPlayback();
    });

    if (videoPlaybackBtn) videoPlaybackBtn.addEventListener("click", function() {
     videoPlayback();
    });

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
        video.volume = currentSoundValue;

        if (currentSoundValue == 0) {
          video.muted = true;
          videoSoundBtn.setAttribute('data-state','muted');
        }
        else {
          videoSoundBtn.setAttribute('data-state','on');
        }
      });
    };

    if (videoFullscreenBtn) videoFullscreenBtn.addEventListener("click", function() {
      const modalVideo = document.querySelector('#modal-video .modal-dialog');
      modalVideo.classList.toggle('modal-fullscreen');
    });

    function videoPlayback() {
      if (video.paused || video.ended) {
        video.play();
        videoPlayBtn.setAttribute('data-state','pause');
        videoPlaybackBtn.setAttribute('data-state','pause');

      } else {
        video.pause();
        videoPlayBtn.setAttribute('data-state','play');
        videoPlaybackBtn.setAttribute('data-state','play');
      }
    };
  });

  const itemsVideo = document.querySelectorAll('.video-item');
  Array.from(itemsVideo).forEach(itemVideo => {
    const itemVideoCover = itemVideo.querySelector('.video-item__cover');
    itemVideoCover.addEventListener('click', function(e) {
      e.preventDefault();
      const modalVideo = new bootstrap.Modal(document.getElementById('modal-video'));
      modalVideo.show();
    });
  });

  // inputs Range
  const inputsRange = document.querySelectorAll('input[type="range"]');

  function handleInputChange(e) {
    let target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

    console.log('change')
  };

  Array.from(inputsRange).forEach(input => {
    input.addEventListener('change', handleInputChange);
  });