
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
  setTimeout(() => {
    modal.classList.add("visible");
  }, 10);
});

modalBtn.onclick = function() {
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("visible");
  }, 10);
};

closeBtn.onclick = function() {
  modal.classList.remove("visible");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("visible");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
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

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', createCheckboxChangeListener(categoriesAdded, backpackList, backpackIcon, itemCount));
}

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
        let listItemText = items[j].innerText.substring(items[j].innerText.indexOf(" "));
        if (listItemText.trim() === this.value.trim()) {
          let header = items[j].previousSibling;
          backpackList.removeChild(items[j]);
          backpackIcon.innerText = parseInt(backpackIcon.innerText) - 1;
          itemCount.innerText = parseInt(itemCount.innerText) - 1;
          
          // Check if there are no more items in the category, and remove the header
          let categoryItems = Array.from(backpackList.getElementsByTagName("li")).filter(li => li.previousSibling === header);
          if (categoryItems.length === 0) {
            backpackList.removeChild(header);
            delete categoriesAdded[accordionButton];
          }
          break;
        }
      }
    }
  };
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


let linksButton = document.getElementById("useful-links-button");
let linksDiv = document.getElementById("useful-links");

linksButton.addEventListener("click", function () {
  const listItems = linksDiv.querySelectorAll("li");
  listItems.forEach((item, index) => {
    item.style.setProperty("--order", index);
  });

  if (linksDiv.classList.contains("visible")) {
    linksDiv.classList.remove("visible");
    listItems.forEach((item, index) => {
      item.style.animation = `slideOut 0.5s forwards calc(0.1s * var(--order))`;
      if (index === listItems.length - 1) {
        item.addEventListener("animationend", function () {
          linksDiv.classList.add("hidden");
        }, { once: true });
      }
    });
  } else {
    linksDiv.classList.remove("hidden");
    linksDiv.classList.add("visible");
    listItems.forEach((item) => {
      item.style.animation = `slideIn 0.5s forwards calc(0.1s * var(--order))`;
    });
  }
});

let weatherApiKey;
let openCageApiKey;

fetch("assets/creds/config.json")
  .then(response => response.json())
  .then(data => {
    weatherApiKey = data.weather_api_key;
    openCageApiKey = data.open_cage_api_key;
    initWeatherWidget();
  });

async function initWeatherWidget() {
  const locationInput = document.getElementById("location-input");
  const searchLocationButton = document.getElementById("search-location");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    updateWeatherData("Geolocation is not supported by your browser.");
  }

  searchLocationButton.addEventListener("click", async function () {
    const location = locationInput.value;
    try {
      const { lat, lng } = await fetchLatLngFromLocation(location);
      await fetchWeatherData(lat, lng);
    } catch (err) {
      alert("No results found for the entered location.");
    }
  });

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchWeatherData(latitude, longitude);
  }

  function error() {
    updateWeatherData("Unable to retrieve your location. Please enter your location manually.");
  }
}

async function fetchLatLngFromLocation(location) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${openCageApiKey}`);
  if (!response.ok) {
    throw new Error("Error fetching location data.");
  }
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const latitude = data.results[0].geometry.lat;
    const longitude = data.results[0].geometry.lng;
    return { lat: latitude, lng: longitude };
  } else {
    throw new Error("No results found for the entered location.");
  }
}

async function fetchWeatherData(latitude, longitude) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`);
    if (!response.ok) {
      throw new Error("Error fetching weather data.");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    updateWeatherData("Error fetching weather data. Please try again later.");
  }
}

function displayWeather(data) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const forecast = data.list.find(item => {
    const itemDate = new Date(item.dt_txt);
    return itemDate.getDate() === tomorrow.getDate();
  });

  if (forecast) {
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const windSpeedElement = document.querySelector('.wind-speed');
    const cityElement = document.querySelector('.city');
    const weatherIconElements = document.querySelectorAll('.weather-icon');

    const temperature = forecast.main.temp.toFixed(1);
    const description = forecast.weather[0].description;
    const windSpeed = forecast.wind.speed.toFixed(1);
    const city = data.city.name;
    const country = data.city.country;
    const weatherIcon = getWeatherIcon(forecast.weather[0].main);

    temperatureElement.innerHTML = `Temperature: <span style="font-weight: bold;">${temperature}°C</span>`;
    descriptionElement.innerHTML = `Weather: <span style="font-weight: bold;">${description}</span>`;
    windSpeedElement.innerHTML = `Wind Speed: <span style="font-weight: bold;">${windSpeed} m/s</span>`;
    cityElement.innerHTML = `<span class="loaction-text">Tomorrow's weather in</span> <span class="city-name">${city},${country}</span>`;
    weatherIconElements.forEach(element => {
      element.style.display = 'none';
      if (element.classList.contains(weatherIcon)) {
        element.style.display = 'block';
      }
    });
  } else {
    updateWeatherData("Weather data not available for tomorrow.");
  }
}

function getWeatherIcon(weather) {
  switch (weather) {
    case 'Clouds':
      return 'cloudy';
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      return 'rain';
    case 'Snow':
      return 'snow';
    case 'Clear':
      return 'sunny';
    case 'Thunderstorm':
      return 'thunderstorms';
    default:
      return '';
  }
}

function updateWeatherData(content) {
  const temperatureElement = document.querySelector('.temperature');
  const descriptionElement = document.querySelector('.description');
  const windSpeedElement = document.querySelector('.wind-speed');

  temperatureElement.innerHTML = '';
  descriptionElement.innerHTML = content;
  windSpeedElement.innerHTML = '';
}
