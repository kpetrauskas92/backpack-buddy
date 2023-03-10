
/** ACCORDION SECTION Functionality
 * This code defines an accordion behavior. It selects all elements with the class "accordion-button" and adds a click event listener to each one. 
 * When the button is clicked, it toggles an "active" class on the button and expands/collapses the content below it. 
 * If there is an active button already, it collapses it before expanding the clicked button's content. 
 * The code also updates the currently active button.
 */

let accordionButtons = document.querySelectorAll('.accordion-button');
let activeButton = null;

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
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

    activeButton = (button.classList.contains('active')) ? button : null;

  });
});

/** SIGN-UP FORM Funtionality
 * This code handles form submission and displays a message to the user using an alert modal. 
 * It defines several functions and event listeners to achieve this functionality. 
 * When the form is submitted, it prevents the default form submission behavior, 
 * retrieves the name input value from the form, and displays a message thanking the user for subscribing to "Backpack Buddy". 
 */

let form = document.getElementById('sign-up__form');
let alertModal = document.getElementById('alert-modal');
let message = alertModal.querySelector('#alert-message');
let closeAlertBtn = alertModal.querySelector('.alert-close');

function showAlert(messageText) {
  message.textContent = messageText;
  message.innerHTML = `<h2 style="color: white;">${messageText}</h2>`;
  alertModal.style.display = 'block';
}

function closeAlert() {
  alertModal.style.display = 'none';
}

closeAlertBtn.addEventListener('click', closeAlert);
window.addEventListener('click', function(event) {
  if (event.target == alertModal) {
    closeAlert();
  }
});

function handleFormSubmit(event) {
  event.preventDefault();

  let nameInput = form.querySelector('input[name="name"]');
  let name = nameInput.value;
  showAlert(`Thank you ${name}, for subscribing to Backpack Buddy!`);
}

form.addEventListener('submit', handleFormSubmit);

/**BACKPACK MODAL Functionality
 * This code handles a modal that displays a list of items in a backpack. 
 * It defines event listeners for the backpack image, modal button, close button, and window. 
 * When the user clicks on the backpack image or modal button, the modal is displayed.
 * When the user clicks on the close button or outside the modal, the modal is hidden. 
 * The code also defines a function to clear the backpack list, which is triggered when the clear button is clicked. 
 */

let modal = document.getElementById("backpack-modal");
let modalBtn = document.getElementById("backpack-button");
let closeBtn = document.getElementsByClassName("close-button")[0];
let backpackList = document.getElementById("backpack-list");
let clearBtn = document.getElementById("clear-button");
let checkboxes = document.querySelectorAll('.item-checkbox');
let backpackIcon = document.getElementById("backpack-icon");
let itemCount = document.getElementById("item-count");
let backpackImg = document.getElementById("backpack-image");

backpackImg.addEventListener('click', function() {
  
  modal.style.display = "block";
});

modalBtn.onclick = function() {
  
  modal.style.display = "block";
  
};

closeBtn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let clearBackpack = function() {
  if (confirm("Are you sure you want to clear your Backpack ?")) {
    backpackList.innerHTML = "";
    backpackIcon.innerText = "0";
    itemCount.innerText = "0";
    categoriesAdded = {};
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }
};

clearBtn.onclick = clearBackpack;

/** BACKPACK MODAL List Functionality
 * This code sets up a function that creates event listeners for checkboxes. 
 * When a checkbox is checked, the function adds an item to a backpack list and updates a count of items in the backpack. 
 * When a checkbox is unchecked, the function removes the corresponding item from the backpack list and updates the count. 
 * The function also creates a new header for the backpack list if the checked item belongs to a new category. 
 * The code uses a JavaScript object to keep track of which categories have been added to the backpack list. 
 * The function is applied to all checkboxes on the page.
 */

let categoriesAdded = {};

function createCheckboxChangeListener(categoriesAdded, backpackList, backpackIcon, itemCount) {
  return function() {
    let accordionButton = this.closest('.accordion').querySelector('.accordion-button').innerText;
    
    if (this.checked) { 
      let li = document.createElement("li");
      let h5;
      
      if (!categoriesAdded[accordionButton]) {
        h5 = document.createElement("h5");
        h5.innerText = accordionButton;
        backpackList.appendChild(h5);
        categoriesAdded[accordionButton] = true;
      }
      
      li.innerText = " " + this.value;
      
      let icon = document.createElement('i');
      icon.classList.add('fas', 'fa-check');
      li.insertBefore(icon, li.firstChild);
      
      backpackList.appendChild(li);
      backpackIcon.innerText = parseInt(backpackIcon.innerText) + 1;
      itemCount.innerText = parseInt(itemCount.innerText) + 1;

    }
    else {
      let items = backpackList.getElementsByTagName("li");
      for (let j = 0; j < items.length; j++) {
        if (items[j].innerText === this.value) {
          backpackList.removeChild(items[j].previousSibling);
          backpackList.removeChild(items[j]);
          backpackIcon.innerText = parseInt(backpackIcon.innerText) - 1;
          itemCount.innerText = parseInt(itemCount.innerText) - 1;
          
          if (items.length === 1 && items[0].previousSibling.innerText === accordionButton) {
            backpackList.removeChild(items[0].previousSibling);
            delete categoriesAdded[accordionButton];
          }
          break;
        }
      }
    }
  };
}

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', createCheckboxChangeListener(categoriesAdded, backpackList, backpackIcon, itemCount));
}

/** ADD EXTRA BUTTON Functionality
 * This code adds an event listener to a button with an id of "add-extra-item-button". 
 * When the button is clicked, the code creates a new list item element with text content from an input field with an id of "extra-item-input". 
 * If the input field is not empty, the new list item is added to a list with an id of "backpackList", the input field is cleared, 
 * and two other elements with ids of "backpackIcon" and "itemCount" are updated with new values.
 */

let addExtraItemButton = document.getElementById("add-extra-item-button");
let extraItemInput = document.getElementById("extra-item-input");

addExtraItemButton.addEventListener("click", function() {
  let extraItem = extraItemInput.value;
  if (extraItem.trim() !== "") {
    let li = document.createElement("li");
    li.innerText = "Extra: " + extraItem;
    backpackList.appendChild(li);
    extraItemInput.value = "";
    backpackIcon.innerText = parseInt(backpackIcon.innerText) + 1;
    itemCount.innerText = parseInt(itemCount.innerText) + 1;
  }
});

/**PRINT BUTTON Functionality
 * This code sets an event listener on a print button, so that when clicked, it opens a new window, creates a new document in it, 
 * writes the HTML contents of an element with the ID "backpack-modal" into it, and prints the document. 
 * Finally, it waits for one second before closing the window. Essentially, it allows the user to print a list of items in their backpack.
 */

let printBtn = document.getElementById("print-button");

printBtn.addEventListener("click", function() {
  let printWindow = window.open("", "printWindow");

  let printDocument = printWindow.document.open();
  printDocument.write("<html><head><title>Print List</title>");
  printDocument.write("</head><body>");

  let modalContent = document.createElement("div");
  modalContent.innerHTML = document.getElementById("backpack-modal").innerHTML;

  printDocument.documentElement.appendChild(modalContent);

  printDocument.close();

  printWindow.print();

  setTimeout(function() {
    printWindow.close();
  }, 1000);
});