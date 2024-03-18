
export const oData = {
    menuIsHidden: false
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

