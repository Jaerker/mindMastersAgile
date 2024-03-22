import api from "./api.js";

function startTimer(duration, display) {
    let timer = duration;

    // Uppdatera timer varje sekund
    const intervalId = setInterval(function () {
        // Beräkna minuter och sekunder
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        // Lägg till ledande noll om minuter eller sekunder är mindre än 10
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Uppdatera texten för timer
        display.textContent = minutes + ":" + seconds;

        // Hämta referens till bilden
        let droneImg = document.querySelector('.droneImg');
        let deliveyMsg = document.querySelector('.deliveyMsg');
        let StatusOrderNmr = document.querySelector('.StatusOrderNmr')

        const latestOrder = api.orderHistory.latestOrder();
        console.log(latestOrder);
        // Lägg till klassen för animation när timern startar
        if (timer === duration) {
            droneImg.classList.add('startAnimation');
            deliveyMsg.innerHTML = 'Din beställning är på väg!';
            StatusOrderNmr.innerHTML = `Ordernummer : #okoah1499db`;    
        }

        // Minska tiden
        if (--timer < 0) {
            clearInterval(intervalId);
            // När tiden når 0, flytta till sidan med klassnamnet "profilePage"
            window.location.href = "./profile.html"; // Ändra webbadressen till den nya sidan
        }
    }, 1000); // Timer uppdateras varje sekund (1000 millisekunder)
}


// När DOM har laddats
document.addEventListener("DOMContentLoaded", function () {
    // Hämta referenser till knappen och timer-elementet


    const display = document.getElementById('estimatedTime');
    setInterval(function () {
        startTimer(780, display);
    }, 4000);
});
const button = document.getElementById('statusButton');
button.addEventListener('click', function () {
    window.location.href = "./profile.html";
});