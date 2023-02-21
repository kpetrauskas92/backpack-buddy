
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
  showAlert(`Thank you for subscribing to Backpack Buddy, ${name}!`);
}

form.addEventListener('submit', handleFormSubmit);

// back pack modal functions 

let modal = document.getElementById("backpack-modal");
let modalBtn = document.getElementById("backpack-button");
let closeBtn = document.getElementsByClassName("close-button")[0];
let backpackList = document.getElementById("backpack-list");
let clearBtn = document.getElementById("clear-button");
let checkboxes = document.querySelectorAll('.item-checkbox');
let backpackIcon = document.getElementById("backpack-icon");
let itemCount = document.getElementById("item-count")

modalBtn.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let clearBackpack = function() {
  if (confirm("Are you sure you want to clear your Backpack ?")) {
    backpackList.innerHTML = "";
    backpackIcon.innerText = "0";
    itemCount.innerText = "0";
    categoriesAdded = {};
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
  }
  }}

clearBtn.onclick = clearBackpack;

// list updates in backpack when checked

let categoriesAdded = {};

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function() {
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
      
      li.innerText = this.value;
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
  });
}

// add extra button function 

let addExtraItemButton = document.getElementById("add-extra-item-button");
let extraItemInput = document.getElementById("extra-item-input");

addExtraItemButton.addEventListener("click", function() {
  let extraItem = extraItemInput.value;
  if (extraItem.trim() !== "") {
    let li = document.createElement("li");
    li.innerText = extraItem;
    backpackList.appendChild(li);
    extraItemInput.value = "";
    itemCount.innerText = parseInt(itemCount.innerText) + 1;
  }
});