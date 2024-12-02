import {cart} from '../data/cart.js';
import {products, getProduct} from '../data/products.js';
import {deliveryOptions, calculateDeliveryDay, getDeliveryOption} from '../data/deliveryOptions.js';


// Render the checkout page for the first time
let html = '';
generateCheckout();
document.querySelector('.order-summary').innerHTML = html;
renderCartQuantity();
renderPaymentSummary();

// Delete a specific cart item for the checkout stage
document.querySelectorAll('.delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.closest('.cart-item-container').dataset.productId;
        let container = link.closest('.cart-item-container');

        cart.removeFromCart(productId);
        container.remove();
        renderCartQuantity();

        renderPaymentSummary();
    });
});

// update the delivery option for the product
document.querySelectorAll('.delivery-option').forEach((option) => {
    let deliveryId;
    let productId = option.closest('.cart-item-container').dataset.productId;
    let deliveryOptionDate = option.dataset.deliveryDate;
    option.addEventListener('click', () => {
        deliveryId = option.dataset.deliveryOptionId;
        cart.updateDeliveryOption(productId, deliveryId);

        option.closest('.cart-item-container').querySelector('.delivery-date')
            .innerHTML = `Delivery date: ${deliveryOptionDate}`;

        renderPaymentSummary();
    });
})

// Function to render the cart quantity
function renderCartQuantity() {
    document.querySelector('.items-quantity').innerHTML = `${cart.getCartQuantity()} items`;
}

// Function to generate the whole checkout page
function generateCheckout() {
    let productContainer = '';
    let existing = '';

    cart.cartProducts.forEach((cartItem) => {
        products.forEach((item) => {
            if(item.id === cartItem.productId) {
                existing = item;
            }
        });

        productContainer = `<div class="cart-item-container cart-item-container-${cartItem.productId}" 
            data-product-id="${cartItem.productId}"
            data-delivery-option-id="${cartItem.deliveryId}">
            <div class="delivery-date">
            Delivery date: ${calculateDeliveryDay(cartItem.deliveryId)}
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
        const date = calculateDeliveryDay(option.id);

        const deliveryPrice = option.priceCents === 0? 'Free' : `$${(option.priceCents / 100).toFixed(2)} -`;
        const isCkecked = cartItem.deliveryId === option.id;

        deliveryOption = `
                <div class="delivery-option" data-delivery-option-id="${option.id}"
                data-delivery-date="${date}">
                  <input type="radio" ${isCkecked? 'checked' : ''} class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${date}
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryPrice} Shipping
                    </div>
                  </div>
                </div>`;

        deliveryStructure += deliveryOption;
    });

    return deliveryStructure;
}

// Function to render the payment summary
function renderPaymentSummary() {
    const paymentSummary = document.querySelector('.payment-summary');

    let productsCost = 0;
    let shippingCost = 0;
    let paymentHTML = '';

    cart.cartProducts.forEach((cartItem) => {
        const product = getProduct(cartItem);

        productsCost += product.priceCents * cartItem.quantity;
        shippingCost += getDeliveryOption(cartItem.deliveryId).priceCents;
    })

    const totalBeforeTax = productsCost + shippingCost;
    const estimatedTax = totalBeforeTax * 0.1;
    const totalCost = totalBeforeTax + estimatedTax;

    paymentHTML = ` 
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.getCartQuantity()}):</div>
            <div class="payment-summary-money">$${(productsCost / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingCost / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(estimatedTax / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCost / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`

    paymentSummary.innerHTML = paymentHTML;
}