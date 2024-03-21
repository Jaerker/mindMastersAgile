import api from './api.js';
import {setupHamburger, setupCart, checkIfAdmin} from './mainFunctions.js';


window.addEventListener('load', async () => {

    //Dessa är här om man inte har någon info i localStorage, så man uppdaterar den korrekt!
    // await api.user.list();
    // await api.product.list();
    // api.orderHistory.list();

    const currentUser = await api.user.details(api.user.getCurrentUser());
    checkIfAdmin();
    setupHamburger();

    const loader = document.querySelector('.loader');
        loader.classList.add('loader-hidden'); // Ta bort punkten från "loader-hidden"
        loader.addEventListener('transitionend', () => { // Ta bort punkten efter "transitionend" och använd ett argument för att hantera händelsen
            loader.remove(); // Ta bort citatet runt 'loader' och använd variabeln direkt
        });



});

