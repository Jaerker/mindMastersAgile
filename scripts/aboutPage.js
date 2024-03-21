import api from './api.js';
import {setupHamburger, setupCart, checkIfAdmin} from './mainFunctions.js';
import setupLoader from './lazyLoader.js';

window.addEventListener('load', async () => {
    const currentUser = await api.user.details(api.user.getCurrentUser());
    checkIfAdmin();
    setupHamburger();
    setupLoader();
    setupCart();
});