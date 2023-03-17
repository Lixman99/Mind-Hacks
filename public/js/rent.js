// Get the input field element
const inputField = document.querySelector('#demo-one-input');
console.log(inputField);
// Add an event listener for the focus event
inputField.addEventListener('focus', function() {
  // Do something when the input field receives focus
  console.log('Input field has received focus');
  console.log(inputField.textContent);
});
