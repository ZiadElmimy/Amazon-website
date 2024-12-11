import {cart} from '../data/cart.js'

document.querySelector('.cart-quantity').innerHTML = cart.getCartQuantity();
renderTrakingPage();

function renderTrakingPage() {
    const url = new URL(window.location.href);
    const productName = url.searchParams.get('productName');
    const productImage = url.searchParams.get('productImage');
    const productQuantity = url.searchParams.get('quantity');
    const deliveryDate = url.searchParams.get('deliveryDate');

    console.log(`${productName}\n${productImage}\n${productQuantity}\n${deliveryDate}`);

    let html = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>
            
            <div class="delivery-date">
                Arriving on ${deliveryDate}
            </div>
            
            <div class="product-info">
                ${productName}
            </div>
            
            <div class="product-info">
                Quantity: ${productQuantity}
            </div>
            
            <img class="product-image" src="${productImage}">
            
            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>
            
            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>
    `;

    document.querySelector('.product-tracking').innerHTML = html;
}