class Cart {
    localStorageKey = 'cartProducts';
    cartProducts = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    storeProduct(productId, productName, productQuantity) {
        let existItem;

        productQuantity = Number(productQuantity.value) || 1;
        let product = {productId: productId, productName: productName, quantity: productQuantity, deliveryId: '1'};

        this.cartProducts.forEach ((item) => {
            if (productId === item.productId) {
                existItem = item;
            }
        });

        if (existItem) {
            existItem.quantity += product.quantity;
        } else {
            this.cartProducts.push(product)
        }

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartProducts));
    }
    addProduct(button) {
        const productQuantity = button.closest('.product-container').querySelector('.quantity-selector');
        const addedCheckmark = button.closest('.product-container').querySelector('.added-to-cart');
        const cartQuantity = document.querySelector('.cart-quantity');

        addedCheckmark.classList.add('view-added');
        setTimeout(() => {addedCheckmark.classList.remove('view-added')}, 1000);

        const itemId = button.dataset.productId;
        const itemName = button.dataset.productName;

        this.storeProduct(itemId, itemName, productQuantity);
        cartQuantity.innerHTML = `${this.getCartQuantity()}`;

        console.log(this.cartProducts)
    }

    getCartQuantity() {
        let totalQuantity = 0;
        this.cartProducts.forEach((item) => totalQuantity += item.quantity);

        return totalQuantity;
    }

    removeFromCart(productId) {
        let newCart = [];
        this.cartProducts.forEach((item) => {
            if(item.productId !== productId) {
                newCart.push(item);
            }
        });
        this.cartProducts = newCart;
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartProducts));
        console.log(this.cartProducts);
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let existing;

        this.cartProducts.forEach ((item) => {
            if (productId === item.productId) {
                existing = item;
                existing.deliveryId = deliveryOptionId;
            }

        });

        this.cartProducts.forEach ((item) => {
            if(item.productId === existing.productId) {
                item.deliveryId = existing.deliveryId;
            }
        })

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartProducts));
    }
}

export const cart = new Cart();