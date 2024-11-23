export let cart = JSON.parse(localStorage.getItem('cartProducts')) || [];

export function addProduct (button) {
    const productQuantity = button.closest('.product-container').querySelector('.quantity-selector');
    const addedCheckmark = button.closest('.product-container').querySelector('.added-to-cart');
    const cartQuantity = document.querySelector('.cart-quantity');

    addedCheckmark.classList.add('view-added');
    setTimeout(() => {addedCheckmark.classList.remove('view-added')}, 1000);

    const itemId = button.dataset.productId;
    const itemName = button.dataset.productName;
    let existItem;
    let product = {productId: itemId, productName: itemName, quantity: Number(productQuantity.value)};

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

    localStorage.setItem('cartProducts', JSON.stringify(cart));
    cartQuantity.innerHTML = `${getCartQuantity()}`;

    console.log(cart)
}

export function getCartQuantity() {
    let totalQuantity = 0;
    cart.forEach((item) => totalQuantity += item.quantity);

    return totalQuantity;
}