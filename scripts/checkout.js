import { cart, getCartQuantity, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';

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

    return `
        <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>
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
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="delivery-option-1 ${exists.id}">
                        <div>
                            <div class="delivery-option-date">Tuesday, June 21</div>
                            <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-1 ${exists.id}">
                        <div>
                            <div class="delivery-option-date">Wednesday, June 15</div>
                            <div class="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-1 ${exists.id}">
                        <div>
                            <div class="delivery-option-date">Monday, June 13</div>
                            <div class="delivery-option-price">$9.99 - Shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

// Function to update the cart display
function updateCart() {
    generateCheckoutPage();
}

// Initial render on page load
generateCheckoutPage();
