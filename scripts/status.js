// Funktion för att starta timer
function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;

    // Uppdatera timer varje sekund
    const intervalId = setInterval(function () {
        // Beräkna minuter och sekunder
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        // Lägg till ledande noll om minuter eller sekunder är mindre än 10
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Uppdatera texten för timer
        display.textContent = minutes + ":" + seconds;

        // Hämta referens till bilden
        let droneImg = document.querySelector('.droneImg');
        let deliveyMsg = document.querySelector('.deliveyMsg');
        let StatusOrderNmr = document.querySelector('.StatusOrderNmr')
        

        // Minska tiden
        if (--timer < 0) {
            clearInterval(intervalId);
            // När tiden når 0, flytta till sidan med klassnamnet "profilePage"
            window.location.href = "./profile.html"; // Ändra webbadressen till den nya sidan
        } else if (timer === duration - 1) {
            // Lägg till klassen för animation när timern startar
            droneImg.classList.add('startAnimation');
            deliveyMsg.innerHTML = 'Din bestälning är på väg!';
            StatusOrderNmr.innerHTML = `Ordernummer : #12DV23F`;
        }
    }, 1000); // Timer uppdateras varje sekund (1000 millisekunder)
}

// När DOM har laddats
document.addEventListener("DOMContentLoaded", function () {
    // Hämta referenser till knappen och timer-elementet
    const button = document.getElementById('statusButton');
    const display = document.getElementById('estimatedTime');

    // Lägg till eventlyssnare för knappen
    button.addEventListener('click', function () {
        // Starta timer med 3 minuter (180 sekunder)
        startTimer(13, display);
    });
});
