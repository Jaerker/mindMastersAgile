import api from './api.js';
import { setupHamburger, checkIfAdmin } from './mainFunctions.js';
import setupLoader from './lazyLoader.js';

window.addEventListener('load', async () => {

    if (!api.user.getCurrentUser()) {
        location.href = '/login.html';
    }
   
    checkIfAdmin();

    setupHamburger();
    setupLoader();
    const profileImgRef = document.querySelector('#profileImg');
    const profileNameRef = document.querySelector('#profileName');
    const profileEmailRef = document.querySelector('#profileEmail');
    const currentProfile = await api.user.details(api.user.getCurrentUser());
    profileImgRef.setAttribute('src', currentProfile.profile_image);
    profileNameRef.textContent = currentProfile.username;
    profileEmailRef.textContent = currentProfile.email;

    const changeImgBtn = document.querySelector('#changeImg');

    //Knappen för att byta bild på användare
    changeImgBtn.addEventListener('click', async () => {
        const userToChange = await api.user.details(api.user.getCurrentUser()); //Hämta hem användaren som är inloggad
        const newProfileImage = api.profileImage.getRandom();                   //Slumpa fram en ny bild från API
        userToChange.profile_image = newProfileImage;                           //Ändra profilbilden för användaren i localStorage
        profileImgRef.setAttribute('src', newProfileImage);                     //Ändra bilden på hemsidan för profilen
        await api.user.change(userToChange);                                    //Skicka tillbaka ändringen på användaren
    });


    //Ändra lösenord
    const changePasswordBtn = document.querySelector('#changePassword');

    changePasswordBtn.addEventListener('click', async () => {

        const currentPassword = prompt('Skriv in din gamla lösenord.');             //Gamla lösenord
        const userToChange = await api.user.details(api.user.getCurrentUser());    //Hämtar info om inloggad användaren

        if (userToChange.password === currentPassword) {                           //Kollar om lösenord stämmer 
            const newPassword = prompt('Skriv in din nya lösenord.');              //Om gamla lösen ord stämer, man kan skriva nytt
            userToChange.password = newPassword;
            await api.user.change(userToChange);
        }
        else {
            alert('Fel lösenord!');
        }
    });


    document.querySelector('#logout').addEventListener('click', () => {
        api.user.logout();
        location.href = '/';
    });
    getOrderHistory();



});

//Hur ska ordern se ut från orderhistoriken? 
/**
 * {
 *      id: ORDERID
 *      username: Användarnamn
 *      timestamp: DATUM NÄR KÖPET GJORDES
 *      totalSum: TOTALA SUMMAN FÖR KÖPET
 * }
 */


function getOrderHistory() {

    const orderHistoryRef = document.querySelector('#orderHistory');
    const orderData = api.orderHistory.list();

    if (orderData.length <= 0) {
        orderHistoryRef.append(createOrderHistoryElement('Du har inte hunnit beställa något ser det ut som! Hoppa över till menyn och se vad som kan vara frestande för idag!', 'order-history__empty'));

    }
    else {
        orderData.forEach(data => {
            orderHistoryRef.append(createOrderHistoryElement(data, 'profile__list-item'));
        });
        orderHistoryRef.append(createOrderHistoryElement(api.orderHistory.getSum(), 'profile__list-item'));

    }






    /*
                        <div class="order-total">
                            <p class="order-id-bold">Totalt spenderat</p>
                            <p>1669 kr</p>
                    </div> 
    */



}
/**
 * 
 *                 <li class="profile__list-item">
                    <div class="id-and-date">
                        <p class="order-id-bold">#AB1123282323Z</p>
                        <p>20/03/06</p>
                    </div>
                    <div class="total-and-price">
                        <p>total ordersumma </p>
                        <p>443 kr</p>
                    </div>
                </li> 
 */

function createOrderHistoryElement(historyItem, classList = []) {
    const listElement = document.createElement('li');
    if (classList.length > 0) {
        listElement.classList.add(classList);
    }
    let sectionElement = document.createElement('section');
if(typeof(historyItem) === 'object'){


        sectionElement.classList.add('id-and-date');
        sectionElement.append(createListElement(historyItem.id, 'order-id-bold'), createListElement(historyItem.timestamp));
        listElement.append(sectionElement);

        sectionElement = document.createElement('section');
        sectionElement.classList.add('total-and-price');
        sectionElement.append(createListElement('Total ordersumma '), createListElement(`${historyItem.totalSum} kr`));
        listElement.append(sectionElement, document.createElement('br'), document.createElement('hr'));


    }
    else if (typeof (historyItem) === 'number') {
        sectionElement.classList.add('order-total');
        sectionElement.append(createListElement('Totalt spenderat', 'order-id-bold'), createListElement(`${historyItem} kr`));
        listElement.append(sectionElement);
    }
    else {

        sectionElement.append(createListElement(`${historyItem}`));
        listElement.append(sectionElement);


    }
    return listElement;


}
function createListElement(value, classList = []) {
    const element = document.createElement('p');
    if (classList.length !== 0) {
        element.classList.add(classList);
    }
    element.textContent = value;

    return element;


}
