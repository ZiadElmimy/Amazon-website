import { cart, getCartQuantity, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

console.log(cart);

// Render the checkout page for the first time
let html = '';
generateCheckout();
document.querySelector('.order-summary').innerHTML = html;
renderCartQuantity();

// Delete a specific cart item for the checkout stage
document.querySelectorAll('.delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.closest('.cart-item-container').dataset.productId;
        let container = link.closest('.cart-item-container');

        removeFromCart(productId);
        container.remove();
        renderCartQuantity();
    });
});

document.querySelectorAll('.delivery-option').forEach((option) => {
    let deliveryId;
    let productId = option.closest('.cart-item-container').dataset.productId;
    let deliveryOptionDate = option.dataset.deliveryDate;
    option.addEventListener('click', () => {
        deliveryId = option.dataset.deliveryOptionId;
        console.log(`in the checkout page ${deliveryId}`);
        updateDeliveryOption(productId, deliveryId);

        option.closest('.cart-item-container').querySelector('.delivery-date')
            .innerHTML = `Delivery date: ${deliveryOptionDate}`;
    });
})

// Function to render the cart quantity
function renderCartQuantity() {
    document.querySelector('.items-quantity').innerHTML = `${getCartQuantity()} items`;
}

// Function to generate the whole checkout page
function generateCheckout() {
    let productContainer = '';
    let existing = '';

    const today = dayjs();
    const delayTime = today.add(7, 'days');
    const dateString = delayTime.format('dddd, MMM DD');

    cart.forEach((cartItem) => {
        products.forEach((item) => {
            if(item.id === cartItem.productId) {
                existing = item;
            }
        });

        productContainer = `<div class="cart-item-container cart-item-container-${cartItem.productId}" 
            data-product-id="${cartItem.productId}"
            data-delivery-option-id="${cartItem.deliveryId}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${existing.image} alt="product image">

              <div class="cart-item-details">
                <div class="product-name">
                  ${cartItem.productName}
                </div>
                <div class="product-price">
                  $${(existing.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-link">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${renderDeliveryOptions(cartItem)}
              </div>
            </div>
          </div>`;

        html += productContainer;
    });
}

// Function to render the delivery options for each product
function renderDeliveryOptions(cartItem) {
    let deliveryStructure = '';
    let deliveryOption = '';

    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const delayTime = today.add(option.deliveryDays, 'days');
        const dateString = delayTime.format('dddd, MMM DD');

        const deliveryPrice = option.priceCents === 0? 'Free' : `$${(option.priceCents / 100).toFixed(2)} -`;
        const isCkecked = cartItem.deliveryId === option.id;

        deliveryOption = `
                <div class="delivery-option" data-delivery-option-id="${option.id}"
                data-delivery-date="${dateString}">
                  <input type="radio" ${isCkecked? 'checked' : ''} class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryPrice} Shipping
                    </div>
                  </div>
                </div>`;

        deliveryStructure += deliveryOption;
    });

    console.log(deliveryStructure);
    return deliveryStructure;
}
