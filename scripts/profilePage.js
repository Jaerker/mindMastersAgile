import api from './api.js';

window.addEventListener('load', async () => {
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




});
