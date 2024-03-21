import api from "./api.js";

export const oData = {
    menuIsHidden: false,
    listItemTemplate: {}
}

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

export const setupHamburger = () => {
    document.querySelector('#menuHamburger').addEventListener('click', () => {
        const imgRef = document.querySelector('#menuHamburger');
    
        imgRef.classList.toggle('menu-hamburger--open');
        imgRef.classList.toggle('menu-hamburger--closed');
        document.querySelector('#navMenu').classList.toggle('menu--hidden');
        // Förutsätter att 'oData' är definierat någonstans
        oData.menuIsHidden = !oData.menuIsHidden;
    });
}

export const setupCart = async () => {
    oData.listItemTemplate = document.querySelector('.orderPage__order-list').cloneNode(true);
    // document.querySelector('.orderPage__order-list').remove();
    document.querySelector('#cartAmountTop').textContent = api.cart.itemCounter();


    const ulRef = document.querySelector('#ulForCart');
    const cart = api.cart.list();
    cart.forEach(item => {
        oData.listItemTemplate.id = item.id;
        oData.listItemTemplate.querySelector('.product-quantity').textContent = item.amount;
        oData.listItemTemplate.querySelector('.orderPage__sub-heading').textContent = item.productInfo.title;
        
        console.group(item);
    })

    const cartDialogSectionRef = document.querySelector('#cartDialog');
    document.querySelector('#cartBtn').addEventListener('click', () => {
        cartDialogSectionRef.classList.toggle('cart-dialog--hidden');
    });
}

export const updateCart = () => {

}
