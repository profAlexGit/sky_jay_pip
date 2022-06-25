/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/create-note.js":
/*!***************************!*\
  !*** ./js/create-note.js ***!
  \***************************/
/***/ (() => {

// канвас поле для рисования в заметке
var canvas,
    ctx,
    flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
var lineColor = "black",
    lineWeight = 2;

function initModeDraw() {
  canvas = document.getElementById('note-canvas');
  ctx = canvas.getContext("2d");
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  resizeCanvasToDisplaySize(ctx.canvas);
  canvas.addEventListener("mousemove", function (e) {
    findxy('move', e);
  }, false);
  canvas.addEventListener("mousedown", function (e) {
    findxy('down', e);
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    findxy('up', e);
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    findxy('out', e);
  }, false);
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWeight;
  ctx.stroke();
  ctx.closePath();
}

function findxy(res, e) {
  var parentCanvas = canvas.closest('.col');

  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - parentCanvas.offsetLeft - 12;
    currY = e.clientY - parentCanvas.offsetTop;
    flag = true;
    dot_flag = true;

    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = lineColor;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }

  if (res == 'up' || res == "out") {
    flag = false;
  }

  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - parentCanvas.offsetLeft - 12;
      currY = e.clientY - parentCanvas.offsetTop;
      draw();
    }
  }
}

function resizeCanvasToDisplaySize(canvas) {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

var buttonModeDraw = document.querySelector('button[data-bs-target="#note-mode-draw"]');
if (buttonModeDraw) buttonModeDraw.addEventListener('shown.bs.tab', function (e) {
  e.target;
  initModeDraw();
});
var inputColor = document.querySelector('#note-mode-text_color');
var inputColorLabel = document.querySelector('#note-mode-text_color + label');
if (inputColor) inputColor.addEventListener('input', function (e) {
  lineColor = this.value;
  inputColorLabel.innerText = this.value;
});

/***/ }),

/***/ "./js/date-picker.js":
/*!***************************!*\
  !*** ./js/date-picker.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tiny_date_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-date-picker */ "./node_modules/tiny-date-picker/dist/tiny-date-picker.js");
/* harmony import */ var tiny_date_picker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tiny_date_picker__WEBPACK_IMPORTED_MODULE_0__);

var dpInput = document.querySelector('.input-date-note');

if (dpInput) {
  var dp = tiny_date_picker__WEBPACK_IMPORTED_MODULE_0___default()(dpInput, {
    mode: 'dp-permanent',
    lang: {
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      today: 'Сегодня',
      clear: 'Очистить',
      close: 'Закрыть'
    },
    dayOffset: 1
  });
  dp.on({
    select: function select(_, dp) {
      return console.log(dp.state.selectedDate);
    }
  });
}

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  'use strict'; // Bootstrap validation

  var forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})(); // modal UserType


if (window.location.pathname === '/') {
  var modalUserType = new bootstrap.Modal(document.getElementById('modal-user-type'));
  modalUserType.show();
} // modal for video of videoList


var itemsVideo = document.querySelectorAll('.video-item');
Array.from(itemsVideo).forEach(function (itemVideo) {
  var itemVideoCover = itemVideo.querySelector('.video-item__cover');
  itemVideoCover.addEventListener('click', function (e) {
    e.preventDefault();
    var modalVideo = new bootstrap.Modal(document.getElementById('modal-video'));
    modalVideo.show();
  });
}); // Virtual Keyboard

var Keyboard = window.SimpleKeyboard["default"];
var KeyboardLayouts = window.SimpleKeyboardLayouts["default"];
var layout = new KeyboardLayouts().get("russian");
var myKeyboard = new Keyboard(_objectSpread(_objectSpread({
  onChange: function onChange(input) {
    return _onChange(input);
  },
  onKeyPress: function onKeyPress(button) {
    return _onKeyPress(button);
  }
}, layout), {}, {
  physicalKeyboardHighlight: true
}));
document.querySelector(".form-control-search").addEventListener("input", function (event) {
  myKeyboard.setInput(event.target.value);
});

function _onChange(input) {
  document.querySelector(".form-control-search").value = input;
  console.log("Input changed", input);
}

function _onKeyPress(button) {
  console.log("Button pressed", button);
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  var currentLayout = myKeyboard.options.layoutName;
  var shiftToggle = currentLayout === "default" ? "shift" : "default";
  console.log(currentLayout);
  myKeyboard.setOptions({
    layoutName: shiftToggle
  });
} // lazyload


document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazyload"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];

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
    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
}); //  tooltips

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
}); // inputs Range

var inputsRange = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
  var target = e.target;
  var min = target.min;
  var max = target.max;
  var val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

;
Array.from(inputsRange).forEach(function (input) {
  input.addEventListener('change', handleInputChange);
}); // mask input date

var inputsDate = document.querySelectorAll('.form-control--mask-date');
Array.from(inputsDate).forEach(function (input) {
  input.addEventListener('focus', function () {
    input.setAttribute('type', 'date');
  });
  input.addEventListener('focusout', function () {
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
  var videoPlayers = document.querySelectorAll('.video-player');
  Array.from(videoPlayers).forEach(function (videoPlayer) {
    var video = videoPlayer.querySelector('video');
    var videoPlayBtn = videoPlayer.querySelector('.video-player__play');
    var videoPlaybackBtn = videoPlayer.querySelector('.video-player__playback');
    var videoControls = videoPlayer.querySelector('.video-player__controls');
    var videoProgress = videoPlayer.querySelector('.video-player__duration');
    var videoSoundBtn = videoPlayer.querySelector('.video-player__sound');
    var videoSoundRange = videoPlayer.querySelector('.video-player__sound-range');
    var currentSoundValue;
    var videoFullscreenBtn = videoPlayer.querySelector('.video-player__fullscreen'); // States

    var PAUSED = 'paused';
    var PLAYING = 'playing'; // Initial state

    var state = PAUSED;
    video.addEventListener('loadedmetadata', function () {
      if (videoProgress) videoProgress.setAttribute('max', video.duration);
    });
    videoPlayBtn.addEventListener("click", videoPlayback);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    videoPlayer.addEventListener("mouseover", controlsVisible);
    videoPlayer.addEventListener("mouseleave", controlsHide);
    if (videoProgress) videoProgress.addEventListener('input', function (e) {
      video.currentTime = this.value;
    });
    if (videoPlaybackBtn) videoPlaybackBtn.addEventListener("click", videoPlayback);
    if (videoSoundBtn) videoSoundBtn.addEventListener('click', function (e) {
      video.muted = !video.muted;

      if (video.muted) {
        videoSoundBtn.setAttribute('data-state', 'muted');
        videoSoundRange.value = 0;
        videoSoundRange.style.backgroundSize = 0;
      } else {
        videoSoundBtn.setAttribute('data-state', 'on');
        videoSoundRange.value = 50;
        videoSoundRange.style.backgroundSize = '50% 100%';
      }
    });

    if (videoSoundRange) {
      currentSoundValue = videoSoundRange.value;
      videoSoundRange.addEventListener('change', function () {
        currentSoundValue = videoSoundRange.value;
        video.volume = currentSoundValue / 100;

        if (currentSoundValue == 0) {
          video.muted = true;
          videoSoundBtn.setAttribute('data-state', 'muted');
        } else {
          video.muted = false;
          videoSoundBtn.setAttribute('data-state', 'on');
        }

        console.log('volume ' + video.volume);
      });
    }

    ;
    if (videoFullscreenBtn) videoFullscreenBtn.addEventListener("click", function () {
      var modalVideo = document.querySelector('#modal-video .modal-dialog');

      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    });
    Array.from(document.querySelectorAll('.modal')).forEach(function (modal) {
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
    }

    ;

    function onPlay() {
      state = PLAYING;
      video.play();
      if (videoProgress) progressLoop();
      videoPlayBtn.setAttribute('data-state', 'pause');
      if (videoPlaybackBtn) videoPlaybackBtn.setAttribute('data-state', 'pause');
      if (videoControls) controlsHide();
    }

    ;

    function onPause() {
      state = PAUSED;
      video.pause();
      videoPlayBtn.setAttribute('data-state', 'play');
      if (videoPlaybackBtn) videoPlaybackBtn.setAttribute('data-state', 'play');
      if (videoControls) controlsVisible();
    }

    ;

    function progressLoop() {
      if (state === PLAYING) {
        videoProgress.value = video.currentTime;
        videoProgress.style.backgroundSize = video.currentTime / video.duration * 100 + '% 100%';
        requestAnimationFrame(progressLoop);
      }
    }

    ;

    function controlsVisible() {
      if (videoControls) videoControls.setAttribute('data-state', 'visible');
    }

    ;

    function controlsHide() {
      if (state === PLAYING) {
        setTimeout(function () {
          if (videoControls) videoControls.setAttribute('data-state', 'hidden');
        }, 1500);
      }
    }

    ;
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

/***/ "./css/scss/date-picker.scss":
/*!***********************************!*\
  !*** ./css/scss/date-picker.scss ***!
  \***********************************/
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


/***/ }),

/***/ "./node_modules/tiny-date-picker/tiny-date-picker.css":
/*!************************************************************!*\
  !*** ./node_modules/tiny-date-picker/tiny-date-picker.css ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/tiny-date-picker/dist/tiny-date-picker.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-date-picker/dist/tiny-date-picker.js ***!
  \****************************************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /**
   * @file A generic set of mutation-free date functions.
   */

  /**
   * now returns the current date without any time values
   *
   * @returns {Date}
   */
  function now() {
    var dt = new Date();
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  /**
   * dateEq compares two dates
   *
   * @param {Date} date1 the first date
   * @param {Date} date2 the second date
   * @returns {boolean}
   */
  function datesEq(date1, date2) {
    return (date1 && date1.toDateString()) === (date2 && date2.toDateString());
  }

  /**
   * shiftDay shifts the specified date by n days
   *
   * @param {Date} dt
   * @param {number} n
   * @returns {Date}
   */
  function shiftDay(dt, n) {
    dt = new Date(dt);
    dt.setDate(dt.getDate() + n);
    return dt;
  }

  /**
   * shiftMonth shifts the specified date by a specified number of months
   *
   * @param {Date} dt
   * @param {number} n
   * @param {boolean} wrap optional, if true, does not change year
   *                       value, defaults to false
   * @returns {Date}
   */
  function shiftMonth(dt, n, wrap) {
    dt = new Date(dt);

    var dayOfMonth = dt.getDate();
    var month = dt.getMonth() + n;

    dt.setDate(1);
    dt.setMonth(wrap ? (12 + month) % 12 : month);
    dt.setDate(dayOfMonth);

    // If dayOfMonth = 31, but the target month only has 30 or 29 or whatever...
    // head back to the max of the target month
    if (dt.getDate() < dayOfMonth) {
      dt.setDate(0);
    }

    return dt;
  }

  /**
   * shiftYear shifts the specified date by n years
   *
   * @param {Date} dt
   * @param {number} n
   * @returns {Date}
   */
  function shiftYear(dt, n) {
    dt = new Date(dt);
    dt.setFullYear(dt.getFullYear() + n);
    return dt;
  }

  /**
   * setYear changes the specified date to the specified year
   *
   * @param {Date} dt
   * @param {number} year
   */
  function setYear(dt, year) {
    dt = new Date(dt);
    dt.setFullYear(year);
    return dt;
  }

  /**
   * setMonth changes the specified date to the specified month
   *
   * @param {Date} dt
   * @param {number} month
   */
  function setMonth(dt, month) {
    return shiftMonth(dt, month - dt.getMonth());
  }

  /**
   * dateOrParse creates a function which, given a date or string, returns a date
   *
   * @param {function} parse the function used to parse strings
   * @returns {function}
   */
  function dateOrParse(parse) {
    return function (dt) {
      return dropTime(typeof dt === 'string' ? parse(dt) : dt);
    };
  }

  /**
   * constrainDate returns dt or min/max depending on whether dt is out of bounds (inclusive)
   *
   * @export
   * @param {Date} dt
   * @param {Date} min
   * @param {Date} max
   * @returns {Date}
   */
  function constrainDate(dt, min, max) {
    return (dt < min) ? min :
           (dt > max) ? max :
           dt;
  }

  function dropTime(dt) {
    dt = new Date(dt);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  /**
   * @file Utility functions for function manipulation.
   */

  /**
   * bufferFn buffers calls to fn so they only happen every ms milliseconds
   *
   * @param {number} ms number of milliseconds
   * @param {function} fn the function to be buffered
   * @returns {function}
   */
  function bufferFn(ms, fn) {
    var timeout = undefined;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, ms);
    };
  }

  /**
   * noop is a function which does nothing at all.
   */
  function noop() { }

  /**
   * copy properties from object o2 to object o1.
   *
   * @params {Object} o1
   * @params {Object} o2
   * @returns {Object}
   */
  function cp() {
    var args = arguments;
    var o1 = args[0];
    for (var i = 1; i < args.length; ++i) {
      var o2 = args[i] || {};
      for (var key in o2) {
        o1[key] = o2[key];
      }
    }
    return o1;
  }

  /**
   * @file Responsible for sanitizing and creating date picker options.
   */

  var english = {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    today: 'Today',
    clear: 'Clear',
    close: 'Close',
  };

  /**
   * DatePickerOptions constructs a new date picker options object, overriding
   * default values with any values specified in opts.
   *
   * @param {DatePickerOptions} opts
   * @returns {DatePickerOptions}
   */
  function DatePickerOptions(opts) {
    opts = opts || {};
    opts = cp(defaults(), opts);
    var parse = dateOrParse(opts.parse);
    opts.lang = cp(english, opts.lang);
    opts.parse = parse;
    opts.inRange = makeInRangeFn(opts);
    opts.min = parse(opts.min || shiftYear(now(), -100));
    opts.max = parse(opts.max || shiftYear(now(), 100));
    opts.hilightedDate = opts.parse(opts.hilightedDate);

    return opts;
  }

  function defaults() {
    return {
      lang: english,

      // Possible values: dp-modal, dp-below, dp-permanent
      mode: 'dp-modal',

      // The date to hilight initially if the date picker has no
      // initial value.
      hilightedDate: now(),

      format: function (dt) {
        return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
      },

      parse: function (str) {
        var date = new Date(str);
        return isNaN(date) ? now() : date;
      },

      dateClass: function () { },

      inRange: function () {
        return true;
      }
    };
  }

  function makeInRangeFn(opts) {
    var inRange = opts.inRange; // Cache this version, and return a variant

    return function (dt, dp) {
      return inRange(dt, dp) && opts.min <= dt && opts.max >= dt;
    };
  }

  /**
   * @file Helper functions for dealing with dom elements.
   */

  var Key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
    esc: 27,
  };

  /**
   * on attaches an event handler to the specified element, and returns an
   * off function which can be used to remove the handler.
   *
   * @param {string} evt the name of the event to handle
   * @param {HTMLElement} el the element to attach to
   * @param {function} handler the event handler
   * @returns {function} the off function
   */
  function on(evt, el, handler) {
    el.addEventListener(evt, handler, true);

    return function () {
      el.removeEventListener(evt, handler, true);
    };
  }

  var CustomEvent = shimCustomEvent();

  function shimCustomEvent() {
    var CustomEvent = window.CustomEvent;

    if (typeof CustomEvent !== 'function') {
      CustomEvent = function (event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };

      CustomEvent.prototype = window.Event.prototype;
    }

    return CustomEvent;
  }

  /**
   * @file Manages the calendar / day-picker view.
   */

  var dayPicker = {
    onKeyDown: keyDown,
    onClick: {
      'dp-day': selectDay,
      'dp-next': gotoNextMonth,
      'dp-prev': gotoPrevMonth,
      'dp-today': selectToday,
      'dp-clear': clear,
      'dp-close': close,
      'dp-cal-month': showMonthPicker,
      'dp-cal-year': showYearPicker,
    },
    render: render
  };

  /**
   * view renders the calendar (day picker) as an HTML string.
   *
   * @param {DatePickerContext} context the date picker being rendered
   * @returns {string}
   */
  function render(dp) {
    var opts = dp.opts;
    var lang = opts.lang;
    var state = dp.state;
    var dayNames = lang.days;
    var dayOffset = opts.dayOffset || 0;
    var selectedDate = state.selectedDate;
    var hilightedDate = state.hilightedDate;
    var hilightedMonth = hilightedDate.getMonth();
    var today = now().getTime();

    return (
      '<div class="dp-cal">' +
        '<header class="dp-cal-header">' +
          '<button tabindex="-1" type="button" class="dp-prev">Prev</button>' +
          '<button tabindex="-1" type="button" class="dp-cal-month">' +
            lang.months[hilightedMonth] +
          '</button>' +
          '<button tabindex="-1" type="button" class="dp-cal-year">' +
            hilightedDate.getFullYear() +
          '</button>' +
          '<button tabindex="-1" type="button" class="dp-next">Next</button>' +
        '</header>' +
        '<div class="dp-days">' +
          dayNames.map(function (name, i) {
            return (
              '<span class="dp-col-header">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>'
            );
          }).join('') +
          mapDays(hilightedDate, dayOffset, function (date) {
            var isNotInMonth = date.getMonth() !== hilightedMonth;
            var isDisabled = !opts.inRange(date);
            var isToday = date.getTime() === today;
            var className = 'dp-day';
            className += (isNotInMonth ? ' dp-edge-day' : '');
            className += (datesEq(date, hilightedDate) ? ' dp-current' : '');
            className += (datesEq(date, selectedDate) ? ' dp-selected' : '');
            className += (isDisabled ? ' dp-day-disabled' : '');
            className += (isToday ? ' dp-day-today' : '');
            className += ' ' + opts.dateClass(date, dp);

            return (
              '<button tabindex="-1" type="button" class="' + className + '" data-date="' + date.getTime() + '">' +
                date.getDate() +
              '</button>'
            );
          }) +
        '</div>' +
        '<footer class="dp-cal-footer">' +
          '<button tabindex="-1" type="button" class="dp-today">' + lang.today + '</button>' +
          '<button tabindex="-1" type="button" class="dp-clear">' + lang.clear + '</button>' +
          '<button tabindex="-1" type="button" class="dp-close">' + lang.close + '</button>' +
        '</footer>' +
      '</div>'
    );
  }

  /**
   * keyDown handles the key down event for the day-picker
   *
   * @param {Event} e
   * @param {DatePickerContext} dp
   */
  function keyDown(e, dp) {
    var key = e.keyCode;
    var shiftBy =
      (key === Key.left) ? -1 :
      (key === Key.right) ? 1 :
      (key === Key.up) ? -7 :
      (key === Key.down) ? 7 :
      0;

    if (key === Key.esc) {
      dp.close();
    } else if (shiftBy) {
      e.preventDefault();
      dp.setState({
        hilightedDate: shiftDay(dp.state.hilightedDate, shiftBy)
      });
    }
  }

  function selectToday(e, dp) {
    dp.setState({
      selectedDate: now(),
    });
  }

  function clear(e, dp) {
    dp.setState({
      selectedDate: null,
    });
  }

  function close(e, dp) {
    dp.close();
  }

  function showMonthPicker(e, dp) {
    dp.setState({
      view: 'month'
    });
  }

  function showYearPicker(e, dp) {
    dp.setState({
      view: 'year'
    });
  }

  function gotoNextMonth(e, dp) {
    var hilightedDate = dp.state.hilightedDate;
    dp.setState({
      hilightedDate: shiftMonth(hilightedDate, 1)
    });
  }

  function gotoPrevMonth(e, dp) {
    var hilightedDate = dp.state.hilightedDate;
    dp.setState({
      hilightedDate: shiftMonth(hilightedDate, -1)
    });
  }

  function selectDay(e, dp) {
    dp.setState({
      selectedDate: new Date(parseInt(e.target.getAttribute('data-date'))),
    });
  }

  function mapDays(currentDate, dayOffset, fn) {
    var result = '';
    var iter = new Date(currentDate);
    iter.setDate(1);
    iter.setDate(1 - iter.getDay() + dayOffset);

    // If we are showing monday as the 1st of the week,
    // and the monday is the 2nd of the month, the sunday won't
    // show, so we need to shift backwards
    if (dayOffset && iter.getDate() === dayOffset + 1) {
      iter.setDate(dayOffset - 6);
    }

    // We are going to have 6 weeks always displayed to keep a consistent
    // calendar size
    for (var day = 0; day < (6 * 7); ++day) {
      result += fn(iter);
      iter.setDate(iter.getDate() + 1);
    }

    return result;
  }

  /**
   * @file Manages the month-picker view.
   */

  var monthPicker = {
    onKeyDown: keyDown$1,
    onClick: {
      'dp-month': onChooseMonth
    },
    render: render$1
  };

  function onChooseMonth(e, dp) {
    dp.setState({
      hilightedDate: setMonth(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-month'))),
      view: 'day',
    });
  }

  /**
   * render renders the month picker as an HTML string
   *
   * @param {DatePickerContext} dp the date picker context
   * @returns {string}
   */
  function render$1(dp) {
    var opts = dp.opts;
    var lang = opts.lang;
    var months = lang.months;
    var currentDate = dp.state.hilightedDate;
    var currentMonth = currentDate.getMonth();

    return (
      '<div class="dp-months">' +
        months.map(function (month, i) {
          var className = 'dp-month';
          className += (currentMonth === i ? ' dp-current' : '');

          return (
            '<button tabindex="-1" type="button" class="' + className + '" data-month="' + i + '">' +
              month +
            '</button>'
          );
        }).join('') +
      '</div>'
    );
  }

  /**
   * keyDown handles keydown events that occur in the month picker
   *
   * @param {Event} e
  * @param {DatePickerContext} dp
   */
  function keyDown$1(e, dp) {
    var key = e.keyCode;
    var shiftBy =
      (key === Key.left) ? -1 :
      (key === Key.right) ? 1 :
      (key === Key.up) ? -3 :
      (key === Key.down) ? 3 :
      0;

    if (key === Key.esc) {
      dp.setState({
        view: 'day',
      });
    } else if (shiftBy) {
      e.preventDefault();
      dp.setState({
        hilightedDate: shiftMonth(dp.state.hilightedDate, shiftBy, true)
      });
    }
  }

  /**
   * @file Manages the year-picker view.
   */

  var yearPicker = {
    render: render$2,
    onKeyDown: keyDown$2,
    onClick: {
      'dp-year': onChooseYear
    },
  };

  /**
   * view renders the year picker as an HTML string.
   *
   * @param {DatePickerContext} dp the date picker context
   * @returns {string}
   */
  function render$2(dp) {
    var state = dp.state;
    var currentYear = state.hilightedDate.getFullYear();
    var selectedYear = state.selectedDate.getFullYear();

    return (
      '<div class="dp-years">' +
        mapYears(dp, function (year) {
          var className = 'dp-year';
          className += (year === currentYear ? ' dp-current' : '');
          className += (year === selectedYear ? ' dp-selected' : '');

          return (
            '<button tabindex="-1" type="button" class="' + className + '" data-year="' + year + '">' +
              year +
            '</button>'
          );
        }) +
      '</div>'
    );
  }

  function onChooseYear(e, dp) {
    dp.setState({
      hilightedDate: setYear(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-year'))),
      view: 'day',
    });
  }

  function keyDown$2(e, dp) {
    var key = e.keyCode;
    var opts = dp.opts;
    var shiftBy =
      (key === Key.left || key === Key.up) ? 1 :
      (key === Key.right || key === Key.down) ? -1 :
      0;

    if (key === Key.esc) {
      dp.setState({
        view: 'day',
      });
    } else if (shiftBy) {
      e.preventDefault();
      var shiftedYear = shiftYear(dp.state.hilightedDate, shiftBy);

      dp.setState({
        hilightedDate: constrainDate(shiftedYear, opts.min, opts.max),
      });
    }
  }

  function mapYears(dp, fn) {
    var result = '';
    var max = dp.opts.max.getFullYear();

    for (var i = max; i >= dp.opts.min.getFullYear(); --i) {
      result += fn(i);
    }

    return result;
  }

  /**
   * @file Defines the base date picker behavior, overridden by various modes.
   */

  var views = {
    day: dayPicker,
    year: yearPicker,
    month: monthPicker
  };

  function BaseMode(input, emit, opts) {
    var detatchInputEvents; // A function that detaches all events from the input
    var closing = false; // A hack to prevent calendar from re-opening when closing.
    var selectedDate; // The currently selected date
    var dp = {
      // The root DOM element for the date picker, initialized on first open.
      el: undefined,
      opts: opts,
      shouldFocusOnBlur: true,
      shouldFocusOnRender: true,
      state: initialState(),
      adjustPosition: noop,
      containerHTML: '<div class="dp"></div>',

      attachToDom: function () {
        document.body.appendChild(dp.el);
      },

      updateInput: function (selectedDate) {
        var e = new CustomEvent('change', {bubbles: true});
        e.simulated = true;
        input.value = selectedDate ? opts.format(selectedDate) : '';
        input.dispatchEvent(e);
      },

      computeSelectedDate: function () {
        return opts.parse(input.value);
      },

      currentView: function() {
        return views[dp.state.view];
      },

      open: function () {
        if (closing) {
          return;
        }

        if (!dp.el) {
          dp.el = createContainerElement(opts, dp.containerHTML);
          attachContainerEvents(dp);
        }

        selectedDate = constrainDate(dp.computeSelectedDate(), opts.min, opts.max);
        dp.state.hilightedDate = selectedDate || opts.hilightedDate;
        dp.state.view = 'day';

        dp.attachToDom();
        dp.render();

        emit('open');
      },

      isVisible: function () {
        return !!dp.el && !!dp.el.parentNode;
      },

      hasFocus: function () {
        var focused = document.activeElement;
        return dp.el &&
          dp.el.contains(focused) &&
          focused.className.indexOf('dp-focuser') < 0;
      },

      shouldHide: function () {
        return dp.isVisible();
      },

      close: function (becauseOfBlur) {
        var el = dp.el;

        if (!dp.isVisible()) {
          return;
        }

        if (el) {
          var parent = el.parentNode;
          parent && parent.removeChild(el);
        }

        closing = true;

        if (becauseOfBlur && dp.shouldFocusOnBlur) {
          focusInput(input);
        }

        // When we close, the input often gains refocus, which
        // can then launch the date picker again, so we buffer
        // a bit and don't show the date picker within N ms of closing
        setTimeout(function() {
          closing = false;
        }, 100);

        emit('close');
      },

      destroy: function () {
        dp.close();
        detatchInputEvents();
      },

      render: function () {
        if (!dp.el || !dp.el.firstChild) {
          return;
        }

        var hadFocus = dp.hasFocus();
        var html = dp.currentView().render(dp);
        html && (dp.el.firstChild.innerHTML = html);

        dp.adjustPosition();

        if (hadFocus || dp.shouldFocusOnRender) {
          focusCurrent(dp);
        }
      },

      // Conceptually similar to setState in React, updates
      // the view state and re-renders.
      setState: function (state) {
        for (var key in state) {
          dp.state[key] = state[key];
        }

        emit('statechange');
        dp.render();
      },
    };

    detatchInputEvents = attachInputEvents(input, dp);

    // Builds the initial view state
    // selectedDate is a special case and causes changes to hilightedDate
    // hilightedDate is set on open, so remains undefined initially
    // view is the current view (day, month, year)
    function initialState() {
      return {
        get selectedDate() {
          return selectedDate;
        },
        set selectedDate(dt) {
          if (dt && !opts.inRange(dt)) {
            return;
          }

          if (dt) {
            selectedDate = new Date(dt);
            dp.state.hilightedDate = selectedDate;
          } else {
            selectedDate = dt;
          }

          dp.updateInput(selectedDate);
          emit('select');
          dp.close();
        },
        view: 'day',
      };
    }

    return dp;
  }

  function createContainerElement(opts, containerHTML) {
    var el = document.createElement('div');

    el.className = opts.mode;
    el.innerHTML = containerHTML;

    return el;
  }

  function attachInputEvents(input, dp) {
    var bufferShow = bufferFn(5, function () {
      if (dp.shouldHide()) {
        dp.close();
      } else {
        dp.open();
      }
    });

    var off = [
      on('blur', input, bufferFn(150, function () {
        if (!dp.hasFocus()) {
          dp.close(true);
        }
      })),

      on('mousedown', input, function () {
        if (input === document.activeElement) {
          bufferShow();
        }
      }),

      on('focus', input, bufferShow),

      on('input', input, function (e) {
        var date = dp.opts.parse(e.target.value);
        isNaN(date) || dp.setState({
          hilightedDate: date
        });
      }),
    ];

    // Unregister all events that were registered above.
    return function() {
      off.forEach(function (f) {
        f();
      });
    };
  }

  function focusCurrent(dp) {
    var current = dp.el.querySelector('.dp-current');
    return current && current.focus();
  }

  function attachContainerEvents(dp) {
    var el = dp.el;
    var calEl = el.querySelector('.dp');

    // Hack to get iOS to show active CSS states
    el.ontouchstart = noop;

    function onClick(e) {
      e.target.className.split(' ').forEach(function(evt) {
        var handler = dp.currentView().onClick[evt];
        handler && handler(e, dp);
      });
    }

    // The calender fires a blur event *every* time we redraw
    // this means we need to buffer the blur event to see if
    // it still has no focus after redrawing, and only then
    // do we return focus to the input. A possible other approach
    // would be to set context.redrawing = true on redraw and
    // set it to false in the blur event.
    on('blur', calEl, bufferFn(150, function () {
      if (!dp.hasFocus()) {
        dp.close(true);
      }
    }));

    on('keydown', el, function (e) {
      if (e.keyCode === Key.enter) {
        onClick(e);
      } else {
        dp.currentView().onKeyDown(e, dp);
      }
    });

    // If the user clicks in non-focusable space, but
    // still within the date picker, we don't want to
    // hide, so we need to hack some things...
    on('mousedown', calEl, function (e) {
      e.target.focus && e.target.focus(); // IE hack
      if (document.activeElement !== e.target) {
        e.preventDefault();
        focusCurrent(dp);
      }
    });

    on('click', el, onClick);
  }

  function focusInput(input) {
    // When the modal closes, we need to focus the original input so the
    // user can continue tabbing from where they left off.
    input.focus();

    // iOS zonks out if we don't blur the input, so...
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      input.blur();
    }
  }

  /**
   * @file Defines the modal date picker behavior.
   */

  function ModalMode(input, emit, opts) {
    var dp = BaseMode(input, emit, opts);

    // In modal mode, users really shouldn't be able to type in
    // the input, as all input is done via the calendar.
    input.readonly = true;

    // In modal mode, we need to know when the user has tabbed
    // off the end of the calendar, and set focus to the original
    // input. To do this, we add a special element to the DOM.
    // When the user tabs off the bottom of the calendar, they
    // will tab onto this element.
    dp.containerHTML += '<a href="#" class="dp-focuser">.</a>';

    return dp;
  }

  /**
   * @file Defines the dropdown date picker behavior.
   */

  function DropdownMode(input, emit, opts) {
    var dp = BaseMode(input, emit, opts);

    dp.shouldFocusOnBlur = false;

    Object.defineProperty(dp, 'shouldFocusOnRender', {
      get: function() {
        return input !== document.activeElement;
      }
    });

    dp.adjustPosition = function () {
      autoPosition(input, dp);
    };

    return dp;
  }

  function autoPosition(input, dp) {
    var inputPos = input.getBoundingClientRect();
    var win = window;

    adjustCalY(dp, inputPos, win);
    adjustCalX(dp, inputPos, win);

    dp.el.style.visibility = '';
  }

  function adjustCalX(dp, inputPos, win) {
    var cal = dp.el;
    var scrollLeft = win.pageXOffset;
    var inputLeft = inputPos.left + scrollLeft;
    var maxRight = win.innerWidth + scrollLeft;
    var offsetWidth = cal.offsetWidth;
    var calRight = inputLeft + offsetWidth;
    var shiftedLeft = maxRight - offsetWidth;
    var left = calRight > maxRight && shiftedLeft > 0 ? shiftedLeft : inputLeft;

    cal.style.left = left + 'px';
  }

  function adjustCalY(dp, inputPos, win) {
    var cal = dp.el;
    var scrollTop = win.pageYOffset;
    var inputTop = scrollTop + inputPos.top;
    var calHeight = cal.offsetHeight;
    var belowTop = inputTop + inputPos.height + 8;
    var aboveTop = inputTop - calHeight - 8;
    var isAbove = (aboveTop > 0 && belowTop + calHeight > scrollTop + win.innerHeight);
    var top = isAbove ? aboveTop : belowTop;

    if (cal.classList) {
      cal.classList.toggle('dp-is-above', isAbove);
      cal.classList.toggle('dp-is-below', !isAbove);
    }
    cal.style.top = top + 'px';
  }

  /**
   * @file Defines the permanent date picker behavior.
   */

  function PermanentMode(root, emit, opts) {
    var dp = BaseMode(root, emit, opts);

    dp.close = noop;
    dp.destroy = noop;
    dp.updateInput = noop;
    dp.shouldFocusOnRender = opts.shouldFocusOnRender;

    dp.computeSelectedDate = function () {
      return opts.hilightedDate;
    };

    dp.attachToDom = function () {
      root.appendChild(dp.el);
    };

    dp.open();

    return dp;
  }

  /**
   * @file Defines the various date picker modes (modal, dropdown, permanent)
   */

  function Mode(input, emit, opts) {
    input = input && input.tagName ? input : document.querySelector(input);

    if (opts.mode === 'dp-modal') {
      return ModalMode(input, emit, opts);
    }

    if (opts.mode === 'dp-below') {
      return DropdownMode(input, emit, opts);
    }

    if (opts.mode === 'dp-permanent') {
      return PermanentMode(input, emit, opts);
    }
  }

  /**
   * @file Defines simple event emitter behavior.
   */

  /**
   * Emitter constructs a new emitter object which has on/off methods.
   *
   * @returns {EventEmitter}
   */
  function Emitter() {
    var handlers = {};

    function onOne(name, handler) {
      (handlers[name] = (handlers[name] || [])).push(handler);
    }

    function onMany(fns) {
      for (var name in fns) {
        onOne(name, fns[name]);
      }
    }

    return {
      on: function (name, handler) {
        if (handler) {
          onOne(name, handler);
        } else {
          onMany(name);
        }

        return this;
      },

      emit: function (name, arg) {
        (handlers[name] || []).forEach(function (handler) {
          handler(name, arg);
        });
      },

      off: function (name, handler) {
        if (!name) {
          handlers = {};
        } else if (!handler) {
          handlers[name] = [];
        } else {
          handlers[name] = (handlers[name] || []).filter(function (h) {
            return h !== handler;
          });
        }

        return this;
      }
    };
  }

  /**
   * @file The root date picker file, defines public exports for the library.
   */

  /**
  * The date picker language configuration
  * @typedef {Object} LangOptions
  * @property {Array.<string>} [days] - Days of the week
  * @property {Array.<string>} [months] - Months of the year
  * @property {string} today - The label for the 'today' button
  * @property {string} close - The label for the 'close' button
  * @property {string} clear - The label for the 'clear' button
  */

  /**
  * The configuration options for a date picker.
  *
  * @typedef {Object} DatePickerOptions
  * @property {LangOptions} [lang] - Configures the label text, defaults to English
  * @property {('dp-modal'|'dp-below'|'dp-permanent')} [mode] - The date picker mode, defaults to 'dp-modal'
  * @property {(string|Date)} [hilightedDate] - The date to hilight if no date is selected
  * @property {function(string|Date):Date} [parse] - Parses a date, the complement of the "format" function
  * @property {function(Date):string} [format] - Formats a date for displaying to user
  * @property {function(Date):string} [dateClass] - Associates a custom CSS class with a date
  * @property {function(Date):boolean} [inRange] - Indicates whether or not a date is selectable
  * @property {(string|Date)} [min] - The minimum selectable date (inclusive, default 100 years ago)
  * @property {(string|Date)} [max] - The maximum selectable date (inclusive, default 100 years from now)
  */

  /**
  * The state values for the date picker
  *
  * @typedef {Object} DatePickerState
  * @property {string} view - The current view 'day' | 'month' | 'year'
  * @property {Date} selectedDate - The date which has been selected by the user
  * @property {Date} hilightedDate - The date which is currently hilighted / active
  */

  /**
  * An instance of TinyDatePicker
  *
  * @typedef {Object} DatePicker
  * @property {DatePickerState} state - The values currently displayed.
  * @property {function} on - Adds an event handler
  * @property {function} off - Removes an event handler
  * @property {function} setState - Changes the current state of the date picker
  * @property {function} open - Opens the date picker
  * @property {function} close - Closes the date picker
  * @property {function} destroy - Destroys the date picker (removing all handlers from the input, too)
  */

  /**
   * TinyDatePicker constructs a new date picker for the specified input
   *
   * @param {HTMLElement | string} input The input or CSS selector associated with the datepicker
   * @param {DatePickerOptions} opts The options for initializing the date picker
   * @returns {DatePicker}
   */
  function TinyDatePicker(input, opts) {
    var emitter = Emitter();
    var options = DatePickerOptions(opts);
    var mode = Mode(input, emit, options);
    var me = {
      get state() {
        return mode.state;
      },
      on: emitter.on,
      off: emitter.off,
      setState: mode.setState,
      open: mode.open,
      close: mode.close,
      destroy: mode.destroy,
    };

    function emit(evt) {
      emitter.emit(evt, me);
    }

    return me;
  }

  return TinyDatePicker;

})));


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/* harmony import */ var _node_modules_tiny_date_picker_tiny_date_picker_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/tiny-date-picker/tiny-date-picker.css */ "./node_modules/tiny-date-picker/tiny-date-picker.css");
/* harmony import */ var _css_scss_date_picker_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./css/scss/date-picker.scss */ "./css/scss/date-picker.scss");
/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./js/script.js */ "./js/script.js");
/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _js_video_player_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./js/video-player.js */ "./js/video-player.js");
/* harmony import */ var _js_video_player_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_js_video_player_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _js_date_picker_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./js/date-picker.js */ "./js/date-picker.js");
/* harmony import */ var _js_create_note_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./js/create-note.js */ "./js/create-note.js");
/* harmony import */ var _js_create_note_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_js_create_note_js__WEBPACK_IMPORTED_MODULE_15__);
















})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map