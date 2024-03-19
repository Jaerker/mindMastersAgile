



const setupLoader = () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden'); // Ta bort punkten från "loader-hidden"
    loader.addEventListener('transitionend', () => { // Ta bort punkten efter "transitionend" och använd ett argument för att hantera händelsen
        document.body.removeChild(loader); // Ta bort citatet runt 'loader' och använd variabeln direkt
    });
}

export default setupLoader;