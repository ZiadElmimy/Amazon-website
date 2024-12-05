import {cart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
    let html = '';
    products.forEach((product) => html += generateHTML(product));

    document.querySelector('.cart-quantity').innerHTML = cart.getCartQuantity();
    document.querySelector('.products-grid').innerHTML = html;

    function generateHTML(product) {
        return `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}" alt="product image">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${product.getStarsImageUrl()} alt="rating of the product">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
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
          
          <div>${product.extraInfo()}</div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" alt="checkmark icon">
            Added
          </div>
          <button class="add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}">
            Add to Cart
          </button>
        </div>`;
    }

    document.querySelectorAll('.add-to-cart-button').forEach((button) => addProductToCart(button));

    function addProductToCart(button) {
        button.addEventListener('click', () => cart.addProduct(button))
    }
}