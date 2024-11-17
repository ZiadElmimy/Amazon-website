import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let htmlCode = '';
products.forEach((product) => generateHTML(product));

document.querySelector('.products-grid').innerHTML = htmlCode;

function generateHTML(product) {
    let html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}">
            Add to Cart
          </button>
        </div>`;

    htmlCode += html;
}

document.querySelectorAll('.add-to-cart-button').forEach((button) => addProductToCart(button));

function addProductToCart (button) {
    button.addEventListener('click', () => addProduct(button))
}

function addProduct (button) {
    const cartQuantity = document.querySelector('.cart-quantity');
    const productQuantity = button.closest('.product-container').querySelector('.quantity-selector');
    const addedIndicator = button.closest('.product-container').querySelector('.added-to-cart');

    addedIndicator.classList.add('view-added');
    setTimeout(() => {addedIndicator.classList.remove('view-added')}, 1000);

    const itemId = button.dataset.productId;
    const itemName = button.dataset.productName;
    let existItem;
    let product = {productId: itemId, productName: itemName, quantity: Number(productQuantity.value)};
    let totalQuantity = 0;

    cart.forEach ((item) => {
        if (itemId === item.productId) {
            existItem = item;
        }
    });

    if (existItem) {
        existItem.quantity += product.quantity;
    } else {
        cart.push(product)
    }

    cart.forEach((item) => totalQuantity += item.quantity);
    cartQuantity.innerHTML = `${totalQuantity}`;

    console.log(cart)
}