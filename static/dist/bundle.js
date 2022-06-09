/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

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

// modal UserType
if(window.location.pathname === '/'){
  const modalUserType = new bootstrap.Modal(document.getElementById('modal-user-type'));
  modalUserType.show();
}

// modal for video of videoList
  const itemsVideo = document.querySelectorAll('.video-item');
  Array.from(itemsVideo).forEach(itemVideo => {
    const itemVideoCover = itemVideo.querySelector('.video-item__cover');
    itemVideoCover.addEventListener('click', function(e) {
      e.preventDefault();
      const modalVideo = new bootstrap.Modal(document.getElementById('modal-video'));
      modalVideo.show();
    });
  });

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

// inputs Range
  const inputsRange = document.querySelectorAll('input[type="range"]');
  function handleInputChange(e) {
    let target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  };
  Array.from(inputsRange).forEach(input => {
    input.addEventListener('change', handleInputChange);
  });

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

/***/ }),

/***/ "./js/video-player.js":
/*!****************************!*\
  !*** ./js/video-player.js ***!
  \****************************/
/***/ (() => {

// videoPlayer
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {
  const videoPlayers = document.querySelectorAll('.video-player');
  Array.from(videoPlayers).forEach(videoPlayer => {
    const video = videoPlayer.querySelector('video');
    const videoPlayBtn = videoPlayer.querySelector('.video-player__play');
    const videoPlaybackBtn = videoPlayer.querySelector('.video-player__playback');
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
       console.log('volume ' + video.volume);
    });

    videoPlayBtn.addEventListener("click", videoPlayback);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

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
//      modalVideo.classList.toggle('modal-fullscreen');

      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
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
        progressLoop();
        videoPlayBtn.setAttribute('data-state','pause');
        videoPlaybackBtn.setAttribute('data-state','pause');
    };

    function onPause() {
        state = PAUSED;
        video.pause();
        videoPlayBtn.setAttribute('data-state','play');
        videoPlaybackBtn.setAttribute('data-state','play');
    };

    function progressLoop() {
      if(state === PLAYING) {
        videoProgress.value = video.currentTime;
        videoProgress.style.backgroundSize = ((video.currentTime / video.duration) * 100) + '% 100%';
        requestAnimationFrame(progressLoop);
      }
    };

  });

}

/***/ }),

/***/ "./css/scss/base.scss":
/*!****************************!*\
  !*** ./css/scss/base.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/btn-user.scss":
/*!********************************!*\
  !*** ./css/scss/btn-user.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/btn.scss":
/*!***************************!*\
  !*** ./css/scss/btn.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/form.scss":
/*!****************************!*\
  !*** ./css/scss/form.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/modal.scss":
/*!*****************************!*\
  !*** ./css/scss/modal.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/navbar.scss":
/*!******************************!*\
  !*** ./css/scss/navbar.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/tooltip.scss":
/*!*******************************!*\
  !*** ./css/scss/tooltip.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/video-list.scss":
/*!**********************************!*\
  !*** ./css/scss/video-list.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/video-player.scss":
/*!************************************!*\
  !*** ./css/scss/video-player.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/scss/video-tags.scss":
/*!**********************************!*\
  !*** ./css/scss/video-tags.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************!*\
  !*** ./app.js ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_scss_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/scss/base.scss */ "./css/scss/base.scss");
/* harmony import */ var _css_scss_navbar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/scss/navbar.scss */ "./css/scss/navbar.scss");
/* harmony import */ var _css_scss_btn_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/scss/btn.scss */ "./css/scss/btn.scss");
/* harmony import */ var _css_scss_btn_user_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css/scss/btn-user.scss */ "./css/scss/btn-user.scss");
/* harmony import */ var _css_scss_form_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/scss/form.scss */ "./css/scss/form.scss");
/* harmony import */ var _css_scss_modal_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/scss/modal.scss */ "./css/scss/modal.scss");
/* harmony import */ var _css_scss_tooltip_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/scss/tooltip.scss */ "./css/scss/tooltip.scss");
/* harmony import */ var _css_scss_video_tags_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/scss/video-tags.scss */ "./css/scss/video-tags.scss");
/* harmony import */ var _css_scss_video_list_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css/scss/video-list.scss */ "./css/scss/video-list.scss");
/* harmony import */ var _css_scss_video_player_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/scss/video-player.scss */ "./css/scss/video-player.scss");
/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/script.js */ "./js/script.js");
/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _js_video_player_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/video-player.js */ "./js/video-player.js");
/* harmony import */ var _js_video_player_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_video_player_js__WEBPACK_IMPORTED_MODULE_11__);













})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map