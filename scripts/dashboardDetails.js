import api from './api.js';
import { setupHamburger } from './hamburger.js';


window.addEventListener('load', async () => {
    setupHamburger();


    document.querySelector('#showBtn').addEventListener('click', (e) => {
        console.log(e.target.parentElement.id);
        e.target.textContent = e.target.textContent === 'STÄNG' ? 'ÖPPNA' :  'STÄNG';
        document.querySelector(`#${e.target.parentElement.id}`).querySelector('.item__detailed-information').classList.toggle('item__detailed-information--hidden');
    })



    // setupUsers();
    setupProducts();

    //Product: 
    /**
     * {
     *      desc: description
     *      image: bilden
     *      longer_desc: längre beskrivning
     *      price: priset
     *      rating: kanske inte kunna röra?
     *      title: namn på kaffet
     * }
     */

    //User:
    /**
     *  {
     *      username:       användarnamn
     *      password:       lösenord (inte visa)
     *      email:          användarens emailadress
     *      profile_image:  profilbilden (kan inte ändras)
     *      role:           roll som användaren har
     *      
     *  }
     * 
     */

});

async function setupProducts(){
    const list = await api.product.list();
    console.log(list);
}
async function setupUsers(){
    const list = await api.user.list();
    console.log(list);
}