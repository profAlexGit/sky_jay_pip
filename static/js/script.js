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
