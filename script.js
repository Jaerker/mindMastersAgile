const oData = {
    menuIsHidden: false
}

window.addEventListener('load', () => {
    document.querySelector('#menuHamburger').addEventListener('click', ()=>{
        const imgRef = document.querySelector('#menuHamburger');
        
        imgRef.classList.toggle('menu-hamburger--open');
        imgRef.classList.toggle('menu-hamburger--closed');
        document.querySelector('#navMenu').classList.toggle('menu--hidden');
        oData.menuIsHidden = !oData.menuIsHidden;
    });
});
