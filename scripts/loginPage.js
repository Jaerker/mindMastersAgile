import api from './api.js';
import setupLoader from "./lazyLoader.js";
import {setupHamburger} from './mainFunctions.js';

// Definiera en array för att lagra användare med användarnamn och lösenord
let users = [];
export { users };

// Vänta på att DOM ska laddas och kör sedan fetchUserloginData-funktionen
document.addEventListener('DOMContentLoaded', async () => {

    setupLoader();
    setupHamburger();
    users = await api.user.list(); //hämtar alla användare
    
    
});



// // Funktion för att hämta användardata från API
// async function fetchUserData(url) {
//     try {
//         // Gör ett HTTP GET-anrop till den angivna URL:en
//         const response = await fetch(url);
//         // Omvandla den hämtade datan till JSON-format
//         return await response.json();
//     } catch (error) {
//         // Logga ett felmeddelande om något går fel vid hämtning av användardata
//         console.error('Fel vid hämtning av användardata:', error);
//         // Returnera null om ett fel uppstår
//         return null;
//     }
// }

// // Funktion för att hämta användaruppgifter och lagra dem i 'users'-arrayen
// async function fetchUserloginData() {
//     // Ange URL:n för användardata-API:et
//     const url = 'https://santosnr6.github.io/Data/airbeanusers.json';
//     // Hämta användardata från den angivna URL:en
//     const userData = await fetchUserData(url);

//     // Om användardata hämtas korrekt och innehåller användare
//     if (userData && userData.users && userData.users.length > 0) {
//         // Loopa igenom varje användare och lägg till användarnamn och lösenord i 'users'-arrayen
//         userData.users.forEach(user => {
//             users.push({ username: user.username, password: user.password });
//         });
//         // Logga antalet användare och deras uppgifter
//         console.log('Användare:', users);
//     } else {
//         // Om det uppstår ett fel vid hämtning av användardata, visa ett felmeddelande för användaren
//         const loginMessage = document.getElementById('login-message');
//         loginMessage.textContent = 'Fel vid hämtning av användardata. Vänligen försök igen senare.';
//         loginMessage.classList.add('error-message');
//     }
// }

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

    // Fetch the latest user list from the API
    users = await api.user.list();

    // Loopa igenom varje användare i 'users'-arrayen
    for (const user of users) {
        // Om användarnamn och lösenord matchar en användare i arrayen
        if (user.username === usernameInput && user.password === passwordInput) {
            // Dölj innehållsrutan och bakgrundsbilden när inloggningen lyckas

            api.user.login(usernameInput);
            location.href = '/profile.html';
            return;
        }

    }

    // Om inloggningen misslyckas, visa ett felmeddelande för användaren
    alert('Inloggning misslyckades. \n Kontrollera användarnamn och lösenord: ' + usernameInput);
}