// Add event listeners to all arrow-up images
const arrowUpButtons = document.querySelectorAll('.arrow-up');
arrowUpButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quantityElement = button.nextElementSibling; // Get the next sibling, which is the quantity element (p tag)
        let quantity = parseInt(quantityElement.textContent); // Parse the current quantity
        quantity++; // Increment the quantity
        quantityElement.textContent = quantity; // Update the quantity displayed
    });
});

// Add event listeners to all arrow-down images
const arrowDownButtons = document.querySelectorAll('.arrow-down');
arrowDownButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quantityElement = button.previousElementSibling; // Get the previous sibling, which is the quantity element (p tag)
        let quantity = parseInt(quantityElement.textContent); // Parse the current quantity
        if (quantity > 0) { // Check if quantity is greater than 0 to avoid negative values
            quantity--; // Decrement the quantity
            quantityElement.textContent = quantity; // Update the quantity displayed
        }
    });
});