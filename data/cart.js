const cart = [];

export function addProduct (button) {
    const cartQuantity = document.querySelector('.cart-quantity');
    const productQuantity = button.closest('.product-container').querySelector('.quantity-selector');
    const addedCheckmark = button.closest('.product-container').querySelector('.added-to-cart');

    addedCheckmark.classList.add('view-added');
    setTimeout(() => {addedCheckmark.classList.remove('view-added')}, 1000);

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