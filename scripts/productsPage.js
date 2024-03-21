
import setupLoader from './lazyLoader.js';
import {setupHamburger, setupCart, checkIfAdmin, setupProductList} from './mainFunctions.js';



window.addEventListener('load', async () => {
    setupHamburger();
    checkIfAdmin();
    setupCart();
    setupLoader();
    const productsListRef = document.querySelector('#productsList').cloneNode(true);
    document.querySelector('.products__item').remove();
    await setupProductList(productsListRef);



    



});