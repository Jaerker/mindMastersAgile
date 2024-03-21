import api from './api.js';
import {setupHamburger, checkIfAdmin} from './mainFunctions.js';
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



});

