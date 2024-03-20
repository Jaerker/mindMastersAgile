import api from './api.js';
import { setupHamburger } from './hamburger.js';
import setupLoader from './lazyLoader.js';

window.addEventListener('load', async () => {
    setupHamburger();
    setupLoader();

    const currentUser = await api.user.details(api.user.getCurrentUser());

    if(currentUser.role !== 'admin'){
        location.href = '/';
    }

    document.querySelector('#currentUser').textContent = currentUser.username;
    document.querySelector('#profileImg').src = currentUser.profile_image;

});

