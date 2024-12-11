import {getOrders} from "../data/orders.js";
import {loadProductsUsingFetch, products} from "../data/products.js";
import {cart} from "../data/cart.js";

let html = '';
const gridElement = document.querySelector('.orders-grid');

const cartQuantity = document.querySelector('.cart-quantity');
cartQuantity.innerHTML = cart.getCartQuantity();

loadProductsUsingFetch().then(() => {
    html = generateOrdersGrid();
    gridElement.innerHTML = html;

    const buyAgainElements = document.querySelectorAll('.buy-again-button');
    buyAgainElements.forEach((element) => {
        element.addEventListener('click', (e) => {
            const id = element.closest('.product-details').dataset.productId;
            const name = element.closest('.product-details').dataset.productName;

            cart.storeProduct(id, name, 1);
            cartQuantity.innerHTML = cart.getCartQuantity();
        });
    });
});

function getDate(date) {
    let dateString = new Date(date)
    const options = {month: 'long', day: 'numeric'};
    dateString = dateString.toLocaleDateString('en-US', options);

    return dateString;
}

function generateOrdersGrid() {
    let gridHTML = '';

    const orders = getOrders();

    orders.forEach((order) => {
        let orderProducts = '';
        let existing;

        const orderItems = order.products;

        orderItems.forEach(orderItem => {
            products.forEach(product => {
                if(orderItem.productId === product.id) {
                    existing = product;
                }
            });

            if(existing) {
                orderProducts += `
                    <div class="product-image-container">
                      <img src=${existing.image} alt="product image">
                    </div>

                    <div class="product-details" data-product-id='${existing.id}' data-product-name='${existing.name}'>
                      <div class="product-name">
                        ${existing.name}
                      </div>
                      <div class="product-delivery-date">
                        Arriving on: ${getDate(orderItem.estimatedDeliveryTime)}
                      </div>
                      <div class="product-quantity">
                        Quantity: ${orderItem.quantity}
                      </div>
                      <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                      </button>
                    </div>

                    <div class="product-actions">
                      <a href="tracking.html?productName=${existing.name}&productImage=${existing.image}&quantity=${orderItem.quantity}&deliveryDate=${getDate(orderItem.estimatedDeliveryTime)}">
                        <button class="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                        `;
            }
        });

        gridHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(Math.round(order.totalCostCents) / 100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderProducts}
          </div>
        </div>
        `;
    });
    return gridHTML;
}