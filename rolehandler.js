'use strict';


// funktion för att hämta från URL-Jaspers
async function fetchUserData() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/airbeanusers.json');
        const userData = await response.json();
        return userData;
    }
    catch (error) {
        console.error('Fel vid hämtning av användare:', error);
    }
}

fetchUserData();


//funktion att hämta data och läsa i consolen
async function fetchDataAndLog() {
    try {
        const userData = await fetchUserData();
        let data = getUserRole('jesper123', userData);
        // console.log(userData);
    } catch (error) {
        console.error('Fel vid hämtning av användare:', error);
    }
}

//anropar funktion och väntar på när de ska vara i consolen
fetchDataAndLog();


// //funktion för att hämta aktiv användaren
// function getActiveUser(userData) {
//     // console.log(typeof userData);
//     console.log(userData);
//     try {
//         return userData.users.find(user => user.isActive);
//     } catch (error) {
//         console.error('Fel vid hämtning av aktiva användaren:', error);
//     }
// }



//funktion för att hämta användarens role
function getUserRole(username, userData) {

    try {
        const user = userData.users.find(user => user.username === username);
        if (user) {
            return user.role;
        } else {
            return 'Användaren finns inte!';
        }
    } catch (error) {
        console.error('Fiel vid hämtning av användarens role!');
    }
}



// //funktion för att hämta beskrivning role (samma sak som uppe)
// function getRoleDescription(username) {
//     try {
//         const userRole = getUserRole(username, userRole);
//         switch (user.role) {
//             case 'admin':
//                 return 'Administrator';
//             case 'user':
//                 return 'Användaren';
//             default:
//                 return 'Unknow';
//         }
//     } catch (error) {
//         console.error('Fel vid att hämta role:', error);
//     }

// }
