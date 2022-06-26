import {initModeDraw, lineSetting} from'./canvas-drawing.js';

const textareaNote = document.querySelector('#note-textarea');

const buttonModeDraw = document.querySelector('button[data-bs-target="#note-mode-draw"]');
if (buttonModeDraw) buttonModeDraw.addEventListener('shown.bs.tab', function (e) {
  e.target;
  initModeDraw();
});

const selectTextWeight = document.querySelector('[name="note-mode-text_weigth"]');
if (selectTextWeight) selectTextWeight.addEventListener('input', function(e) {
  textareaNote.style.fontWeight = this.value;
  lineSetting.weight = this.value/100;
});

const selectTextSize = document.querySelector('[name="note-mode-text_size"]');
if (selectTextSize) selectTextSize.addEventListener('input', function(e) {
  textareaNote.style.fontSize = this.value + 'px';
});

const inputColor = document.querySelector('#note-mode-text_color');
const inputColorLabel = document.querySelector('#note-mode-text_color + label');
if (inputColor) inputColor.addEventListener('input', function(e) {
  lineSetting.color = this.value;
  inputColorLabel.innerText = this.value;
  textareaNote.style.color = this.value;
});

