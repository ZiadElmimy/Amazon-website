import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

// Function to get the delivery day
export function calculateDeliveryDay(deliveryId) {
    let deliveryDelay = 0;

    deliveryOptions.forEach((option) => {
        if(option.id === deliveryId) {
            deliveryDelay = option.deliveryDays;
        }
    });

    const today = dayjs();
    const delayTime = today.add(deliveryDelay, 'days');

    return delayTime.format('dddd, MMM DD');
}

// Function to get the delivery option
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}