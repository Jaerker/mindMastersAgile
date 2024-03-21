`import api from './api.js'`;
const plusIcons = document.querySelectorAll('.fa-solid.fa-circle-plus');
const minusIcons = document.querySelectorAll('.fa-solid.fa-circle-minus');
const totalPriceElement = document.getElementById('totalHeading');

// Function to update total price
function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.orderPage__order-list').forEach(item => {
        const quantity = parseInt(item.querySelector('.order__quantity > #quantity').textContent);
        const priceText = item.querySelector('.orderPage__order-list > p').textContent;
        const price = parseFloat(priceText.replace('kr', ''));
        total += quantity * price;
    });
    totalPriceElement.textContent = `Total...................... ${total.toFixed(2)} kr`;
}

// Add event listeners to plus icons
plusIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const quantityElement = icon.parentElement.querySelector('#quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateTotalPrice();
    });
});

// Add event listeners to minus icons
minusIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const quantityElement = icon.parentElement.querySelector('#quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;
            updateTotalPrice();
        }
    });
});

// Initial calculation of total price
updateTotalPrice();