import api from './api.js';
import { checkIfAdmin } from './adminFunctions.js';

const oData = {
    menuIsHidden: false
}

window.addEventListener('load', async () => {

    //Dessa är här om man inte har någon info i localStorage, så man uppdaterar den korrekt!
    // await api.user.list();
    // await api.product.list();
    // api.orderHistory.list();

    const currentUser = await api.user.details(api.user.getCurrentUser());
    checkIfAdmin();


    const loader = document.querySelector('.loader');
        loader.classList.add('loader-hidden'); // Ta bort punkten från "loader-hidden"
        loader.addEventListener('transitionend', () => { // Ta bort punkten efter "transitionend" och använd ett argument för att hantera händelsen
            loader.remove(); // Ta bort citatet runt 'loader' och använd variabeln direkt
        });


    document.querySelector('#menuHamburger').addEventListener('click', () => {
        const imgRef = document.querySelector('#menuHamburger');

        imgRef.classList.toggle('menu-hamburger--open');
        imgRef.classList.toggle('menu-hamburger--closed');
        document.querySelector('#navMenu').classList.toggle('menu--hidden');
        // Förutsätter att 'oData' är definierat någonstans
        oData.menuIsHidden = !oData.menuIsHidden;
    });
});


// Vänta på att DOM ska laddas och kör sedan fetchUserloginData-funktionen
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM laddad');
    await fetchUserloginData();
});

// Definiera en array för att lagra användare med användarnamn och lösenord
const users = [];

// Funktion för att hämta användardata från API
async function fetchUserData(url) {
    try {
        // Gör ett HTTP GET-anrop till den angivna URL:en
        const response = await fetch(url);
        // Omvandla den hämtade datan till JSON-format
        return await response.json();
    } catch (error) {
        // Logga ett felmeddelande om något går fel vid hämtning av användardata
        console.error('Fel vid hämtning av användardata:', error);
        // Returnera null om ett fel uppstår
        return null;
    }
}

// Funktion för att hämta användaruppgifter och lagra dem i 'users'-arrayen
async function fetchUserloginData() {
    // Ange URL:n för användardata-API:et
    const url = 'https://santosnr6.github.io/Data/airbeanusers.json';
    // Hämta användardata från den angivna URL:en
    const userData = await fetchUserData(url);

    // Om användardata hämtas korrekt och innehåller användare
    if (userData && userData.users && userData.users.length > 0) {
        // Loopa igenom varje användare och lägg till användarnamn och lösenord i 'users'-arrayen
        userData.users.forEach(user => {
            users.push({ username: user.username, password: user.password });
        });
        // Logga antalet användare och deras uppgifter
        console.log('Användare från api:', users);
        console.log("Användare från api samt local storage:", await api.user.list()); //Loggar både default users från api samt users sparade på local storage
    } else {
        // Om det uppstår ett fel vid hämtning av användardata, visa ett felmeddelande för användaren
        const loginMessage = document.getElementById('login-message');
        loginMessage.textContent = 'Fel vid hämtning av användardata. Vänligen försök igen senare.';
        loginMessage.classList.add('error-message');
    }
}

// Lägg till en händelselyssnare för knappen 'login-submit'
document.getElementById('login-submit').addEventListener('click', function (event) {
    // Förhindra standardformulärhantering när knappen klickas
    event.preventDefault();
    // Anropa logIn-funktionen för inloggning
    logIn();
});

// Funktion för inloggning
async function logIn() {
    // Hämta användarnamn och lösenord från formuläret
    const usernameInput = document.getElementById('login-username').value;
    const passwordInput = document.getElementById('login-password').value;
    // Hämta referenser till meddelandetext, innehållsram och bakgrundsbild
    const loginMessage = document.getElementById('login-message');
    const contentWrapper = document.querySelector('.content-wrapper');
    const backgroundImage = document.querySelector('.background-image');

    try {
        // Fetch the entire user list, including API users and local storage users
        const userList = await api.user.list();

        // Loop through the user list to find a match
        for (const user of userList) {
            if (user.username === usernameInput && user.password === passwordInput) {
                // If username and password match, perform login action
                api.user.login(usernameInput);
                location.href = '/profile.html';
                return;
            }
        }

        // If no match is found, display error message
        loginMessage.textContent = 'Incorrect username or password.';
        loginMessage.classList.add('error-message');
    } catch (error) {
        // Handle errors if fetching user list fails
        console.error('Error fetching user list:', error);
        loginMessage.textContent = 'Failed to fetch user list. Please try again later.';
        loginMessage.classList.add('error-message');
    }
}