import { cart, getCartQuantity, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Function to generate and render the entire checkout page
function generateCheckoutPage() {
    let html = '';

    // Generate HTML for all cart items
    cart.forEach((cartItem) => {
        html += generateHTML(cartItem);
    });

    // Update the cart items container
    document.querySelector('.order-summary').innerHTML = html;

    // Update the number of items in the cart
    document.querySelector('.items-quantity').innerHTML = `${getCartQuantity()} items`;

    // Add event listeners for delete links
    document.querySelectorAll('.delete-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            updateCart(); // Re-render the cart and update the quantity
        });
    });
}

// Function to generate HTML for a single cart item
function generateHTML(cartItem) {
    let exists;
    let quantity = 0;

    products.forEach((product) => {
        if (cartItem.productId === product.id) {
            exists = product;
            quantity = cartItem.quantity;
        }
    });

    const deliveryOptionId = cartItem.deliveryId;
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if (deliveryOptionId === option.id) {
            deliveryOption = option;
        }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMM DD');

    return `
        <div class="cart-item-container">
            <div class="delivery-date">Delivery date: ${dateString}</div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${exists.image}" alt="product image">
                <div class="cart-item-details">
                    <div class="product-name">${exists.name}</div>
                    <div class="product-price">$${(exists.priceCents / 100).toFixed(2)}</div>
                    <div class="product-quantity">
                        <span>Quantity: <span class="quantity-label">${quantity}</span></span>
                        <span class="update-quantity-link link-primary">Update</span>
                        <span class="delete-quantity-link link-primary" data-product-id="${exists.id}">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${generateDeliveryOption(exists, cartItem)}
                </div>
            </div>
        </div>`;
}

// Function to generate the delivery options for each item in the cart
function generateDeliveryOption(exists, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMM DD');
        const price = deliveryOption.priceCents === 0? 'Free' : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

        const isCkecked = deliveryOption.id === cartItem.deliveryId? 'checked' : '';
        html += `<div class="delivery-option">
                        <input type="radio" ${isCkecked} class="delivery-option-input" name="delivery-option-1 ${exists.id}">
                        <div>
                            <div class="delivery-option-date">${dateString}</div>
                            <div class="delivery-option-price">${price} Shipping</div>
                        </div>
                    </div>`
    });

    return html;
}

// Function to update the cart display
function updateCart() {
    generateCheckoutPage();
}

// Initial render on page load
generateCheckoutPage();
