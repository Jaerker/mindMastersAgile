import api from './scripts/api.js';

window.addEventListener('load', async () => {
    const value = await api.user.list();
    console.log(value);
})
