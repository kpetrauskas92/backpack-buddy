
// accordion

let accordionButtons = document.querySelectorAll('.accordion-button');
let activeButton = null;

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Collapses the currently active button (if there is one)
    if (activeButton && activeButton !== button) {
      activeButton.classList.remove('active');
      activeButton.nextElementSibling.style.maxHeight = 0;
    }
    
    button.classList.toggle('active');
    let content = button.nextElementSibling;
    if (button.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = 0;
    }

    // Updates the currently active button
    activeButton = (button.classList.contains('active')) ? button : null;

  });
});

// email sign up

let form = document.getElementById('sign-up__form');
let alertModal = document.getElementById('alert-modal');
let message = alertModal.querySelector('#alert-message');
let closeBtn = alertModal.querySelector('.alert-close');

function showAlert(messageText) {
  message.textContent = messageText;
  message.innerHTML = `<h2 style="color: white;">${messageText}</h2>`;
  alertModal.style.display = 'block';
}

function closeAlert() {
  alertModal.style.display = 'none';
}

closeBtn.addEventListener('click', closeAlert);
window.addEventListener('click', function(event) {
  if (event.target == alertModal) {
    closeAlert();
  }
});

function handleFormSubmit(event) {
  event.preventDefault();

  let nameInput = form.querySelector('input[name="name"]');
  let name = nameInput.value;
  showAlert(`Thank you for subscribing to Backpack Buddy, ${name}!`);
}

form.addEventListener('submit', handleFormSubmit);
