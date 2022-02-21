if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready ();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-remove");
    for (var i = 0; i < removeCartItemButtons. length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i =0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        button.addEventListener('click', addToCart);
    }

    var addToCartButtons = document.getElementsByClassName('menu-item-button');
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase);
}

function purchase() {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var button = event.target;
    button.parentElement.parentElement.remove();
    updateCartTotal();
}

function changeQuantity(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCart(event){
    var button = event.target;
    var menuItem = button.parentElement.parentElement;
    var title = menuItem.getElementsByClassName("menu-item-title")[0].innerText;
    var price = menuItem.getElementsByClassName("menu-item-price-order")[0].innerText;
    var imgSrc = menuItem.getElementsByClassName("menu-item-image")[0].src;
    addItemToCart(title, price, imgSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added');
            return;
        }
    }
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQuantity); 
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        console.log("hello");
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];


        var price = parseInt(priceElement.innerText.replace('THB', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = "THB " + total;
}


const url = "http://api.openweathermap.org/data/2.5/weather?q=" + "Bangkok" + "&units=metric" + "&APPID=d3068e3e914bcf6b7ac1d4454bb8f605";
fetch(url)
    .then(function(response) {
    return response.json();
    })
    .then(function(json) {
    let results = "";
    results = '<div class="weather">'
    results += '<h4>Weather in ' + json.name + "</h4>";
    // for (let i = 0; i < json.weather.length; i++) {
    //     results += '<img class ="center" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" width="5vw" height="5vh" />';
    // }
    results += '<h4>' + json.main.temp + " &deg;C</h4>"
    results += '<h4> Feels Like: '
    results += json.main.feels_like
    results += ' &deg;C</h4>';
    results += '<h4> Humidity ' + json.main.humidity + '%</h4>';
    document.getElementById("weatherResults").innerHTML = results;
    results += '</div>';
});

// const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=d3068e3e914bcf6b7ac1d4454bb8f605";
// fetch(url2)
//     .then(function(response) {
//     return response.json();
//     })
//     .then(function(json) {
//     let forecast = '<div class="container">';
//     for (let i=0; i < 39; i++) {
//         forecast += '<div class="col">';
//         forecast += '<h3 class="date">' + moment(json.list[i].dt_txt).format('L') + "</h3>";
//         forecast += '<h3 class="time">' + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</h3>";
//         forecast += '<p class="temperature">Temperature: ' + json.list[i].main.temp + " &deg;F</p>";
//         forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
//         forecast += "<p> Wind: " + json.list[i].wind.speed + "mps</p>";
//         forecast += '</div>';
//     }
//     document.getElementById("forecastResults1").innerHTML = forecast;
//     forecast = forecast + '</div>';

// });