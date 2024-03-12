'use strict';

console.log('Hello!');

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
        const userData = await fetchUserData('https://santosnr6.github.io/Data/airbeanusers.json');
        console.log(userData);
    } catch (error) {
        console.error('Fel vid hämtning av användare:', error);
    }
}

//anropar funktion och väntar till de ska vara i consolen
fetchDataAndLog();