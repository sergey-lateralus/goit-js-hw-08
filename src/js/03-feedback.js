import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form  input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

let formData = {};

const STORAGE_KEY = 'feedback-form-state';

populateTextarea();

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  formData = {};
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const parsedMessage = JSON.parse(savedMessage);

    formData = parsedMessage;

    input.value = parsedMessage.email;
    textarea.value = parsedMessage.message;
  }
};