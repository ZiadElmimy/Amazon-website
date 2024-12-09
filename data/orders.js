let orders = JSON.parse(localStorage.getItem('orders')) ||[];

export function addOrder(order) {
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrders() {
    return JSON.parse(localStorage.getItem('orders'));
}