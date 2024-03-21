import setupLoader from './lazyLoader.js';
import {setupHamburger, setupCart, checkIfAdmin} from './mainFunctions.js';

const oData = {
    listTemplate: {}
}

window.addEventListener('load', () => {
    setupHamburger();
    checkIfAdmin();
    setupCart();
    setupLoader();

    // oData.listTemplate = document.querySelector('.dashboard-details__edit-box').cloneNode(true);
    // oData.listItemTemplate = document.querySelector('.dashboard-details__item').cloneNode(true);
    // document.querySelector('.dashboard-details__item').remove();
   


});

function setupListElement(){

}