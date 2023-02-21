
/**
 * Accordion function
 */

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