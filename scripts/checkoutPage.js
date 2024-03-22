import api from './api.js';
import { setupHamburger, checkIfAdmin, setupCheckoutList } from './mainFunctions.js';
import setupLoader from './lazyLoader.js';

window.addEventListener('load', async () => {

    //Dessa är här om man inte har någon info i localStorage, så man uppdaterar den korrekt!
    // await api.user.list();
    // await api.product.list();
    // api.orderHistory.list();

    const currentUser = await api.user.details(api.user.getCurrentUser());
    checkIfAdmin();
    setupHamburger();
    setupLoader();


    console.log(currentUser);
    const listItemTemplate = document.querySelector('.order__list-item-section').cloneNode(true);
    document.querySelector('.order__list-item-section').remove();

    setupCheckoutList(listItemTemplate);

    document.querySelector('#loginBtn').style.display = currentUser ? 'none' : 'block';
    document.querySelector('#name').value = currentUser ? currentUser.username : '';
    document.querySelector('#name').disabled = currentUser ? true : false;
    document.querySelector('#loginBtn').addEventListener('click', () => {
        location.href = '/login.html';
    });

    document.querySelector('#checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();

        let newId = '';

        const idGenerator = '0123456789abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < 13; i++) {

            newId += idGenerator[Math.floor(Math.random() * idGenerator.length)];

        }
        const date = new Date();
        const orderTime = `${date.getYear().toString().slice(1)}/${date.getMonth().toString().length === 1 ? '0' + date.getMonth() : date.getMonth()}/${date.getDate()}`
        
        api.orderHistory.add({id: newId, timestamp:orderTime, username: document.querySelector('#name').value, totalSum: document.querySelector('#totalPrice').textContent});
        api.cart.clear();

        location.href = '/status.html';
    });


});


