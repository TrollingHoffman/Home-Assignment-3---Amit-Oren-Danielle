// שליפת דירות, סינון, חיפוש
// שליפת דירות, סינון, חיפוש
var countHeader = document.getElementById("countRentals");
countHeader.textContent = "There are " + amsterdam.length + " available rentals";

var roomsDiv = document.getElementById("roomsContainer");
var roomSelect = document.createElement("select");
roomSelect.id = "slctRooms";
roomsDiv.appendChild(roomSelect);

var roomOptions = [];

amsterdam.forEach(function(apt) {
  if (roomOptions.indexOf(apt.bedrooms) === -1 && apt.bedrooms != null) {
    roomOptions.push(apt.bedrooms);
  }
});

roomOptions.sort(function(a, b) { return a - b; });

var defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "All";
roomSelect.appendChild(defaultOption);

roomOptions.forEach(function(num) {
  var option = document.createElement("option");
  option.value = num;
  option.textContent = num + " rooms";
  roomSelect.appendChild(option);
});

var section = document.createElement("section");
var title = document.createElement("h2");
title.textContent = "Rental Options";
section.appendChild(title);

var listingsContainer = document.createElement("div");
listingsContainer.id = "listingsContainer";
listingsContainer.className = "listings-container";
section.appendChild(listingsContainer);

document.body.appendChild(section);

function displayFilteredListings(filteredApts) {
  listingsContainer.innerHTML = "";

  filteredApts.forEach(function(apt) {
    var card = document.createElement("div");
    card.className = "listing-card";

    card.innerHTML =
      '<img src="' + apt.picture_url.url + '" alt="' + apt.name + '" class="listing-img">' +
      '<h3>' + apt.name + '</h3>' +
      '<p>' + apt.description + '</p>' +
      '<p><strong>Price:</strong> ₪' + apt.price + '</p>' +
      '<button>Add to Favorites</button>' +
      '<button onclick="location.href=\'rent.html?id=' + apt.listing_id + '\'">Rent</button>';

    listingsContainer.appendChild(card);
  });
}

document.getElementById("filter").addEventListener("click", function() {
  var minRating = parseInt(document.getElementById("slctMinRating").value);
  var minPrice = parseInt(document.getElementById("rngMinPrice").value);
  var maxPrice = parseInt(document.getElementById("rngMaxPrice").value);
  var selectedRooms = document.getElementById("slctRooms").value;

  var filtered = amsterdam.filter(function(apt) {
    return (
      apt.review_scores_rating / 20 >= minRating &&
      apt.price >= minPrice &&
      apt.price <= maxPrice &&
      (selectedRooms === "" || apt.bedrooms == selectedRooms)
    );
  });

  displayFilteredListings(filtered);
});

