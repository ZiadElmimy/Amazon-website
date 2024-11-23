import {cart, getCartQuantity} from '../data/cart.js'
import {products} from '../data/products.js'

console.log(cart)

let html = '';
cart.forEach((cartItem) => generateHTML(cartItem));
document.querySelector('.order-summary').innerHTML = html;

document.querySelector('.items-quantity').innerHTML = `${getCartQuantity()} items`;

function generateHTML (cartItem) {
    let exists;
    let quantity = 0;
    products.forEach((product) => {
        if(cartItem.productId === product.id) {
            exists = product;
            quantity = cartItem.quantity;
        }
    });

    console.log('the item exists in products array');

    let htmlElement = `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${exists.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${exists.name}
                </div>
                <div class="product-price">
                  $${(exists.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1 ${exists.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1 ${exists.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1 ${exists.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

    html += htmlElement;
}
