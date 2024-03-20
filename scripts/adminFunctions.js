import api from "./api.js";

export const checkIfAdmin = async () => {
    const user = await api.user.details(api.user.getCurrentUser());
    if(user.role === 'admin'){
        const menuListRef = document.querySelector('#menuList');

        const listItemElement = document.createElement('li');
        const anchorElement = document.createElement('a');

        listItemElement.classList.add('menu__choice');
        anchorElement.classList.add('menu__link');
        anchorElement.href = './dashboard.html';
        anchorElement.textContent = 'Dashboard';
        listItemElement.append(anchorElement);
        menuListRef.append(listItemElement);
    }
}