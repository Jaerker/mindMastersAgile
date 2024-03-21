import api from "./api.js";

export const oData = {
    menuIsHidden: false,
    listItemTemplate: {},
    emptyCartListTemplate: {}
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
        oData.menuIsHidden = !oData.menuIsHidden;
    });
}
const addCartListItem = (item) => {
    const newItem = oData.listItemTemplate.cloneNode(true);

    newItem.id = `cartItem${item.id}`;
    newItem.querySelector('.product-quantity').textContent = item.amount;
    newItem.querySelector('.orderPage__sub-heading').textContent = item.productInfo.title;
    newItem.querySelector('.order-price').textContent = item.productInfo.price;

    newItem.querySelector('.order__remove-btn').addEventListener('click', () => {
        api.cart.remove(item.id);
        updateCart(newItem, -1);


    });
    newItem.querySelector('.order__add-btn').addEventListener('click', async () => {

        await api.cart.add(item.id).then(() => {
            updateCart(newItem, 1);
        });
    });
    return newItem;
}
const removeCartListItem = (itemId) => {
    document.querySelector(`#${itemId}`).remove();

}

export const setupCart = async () => {
    document.querySelector('#cartAmountTop').textContent = api.cart.itemCounter();

    document.querySelector('#totalAmount').textContent = getTotalAmount(api.cart.list());
    
    document.querySelector('#orderBtn').disabled = api.cart.itemCounter() === 0;
    document.querySelector('#orderBtn').addEventListener('click', () => {
        
        location.href = api.user.getCurrentUser() ? '/status.html' : '/login.html';
    });

    oData.emptyCartListTemplate = document.querySelector('.orderPage__empty-cart').cloneNode(true);
    oData.listItemTemplate = document.querySelector('.orderPage__order-list').cloneNode(true);
    document.querySelector('.orderPage__order-list').remove();
    if(api.cart.list().length > 0){

        document.querySelector('.orderPage__empty-cart').remove();
    }

    document.querySelector('#emptyTrash').addEventListener('click', () => {
        api.cart.list().forEach(item => {
            removeCartListItem(`cartItem${item.id}`);
            updateCart();
        });
        
        api.cart.clear();
        
    });


    const ulRef = document.querySelector('#ulForCart');
    const cart = api.cart.list();
    cart.forEach(item => {

        ulRef.append(addCartListItem(item));
        
    });


    const cartDialogSectionRef = document.querySelector('#cartDialog');
    document.querySelector('#cartBtn').addEventListener('click', () => {
        cartDialogSectionRef.classList.toggle('cart-dialog--hidden');
    });
}



export const updateCart = (itemToUpdate, amount) => {
    document.querySelector('#orderBtn').disabled = api.cart.itemCounter() === 0;
        
    if(itemToUpdate){
        let newAmount = Number(itemToUpdate.querySelector('.product-quantity').textContent);
        newAmount += amount;

        itemToUpdate.querySelector('.product-quantity').textContent = newAmount;
        document.querySelector('#cartAmountTop').textContent = api.cart.itemCounter();

        if (newAmount === 0){
            removeCartListItem(itemToUpdate.id);
        }


    }
    const ulRef = document.querySelector('#ulForCart');

    if(itemToUpdate && amount){

        if(api.cart.itemCounter() === 1 && amount === 1){
            const emptyCart = document.querySelector('.orderPage__empty-cart');
            emptyCart.remove();
            
        }else if(api.cart.itemCounter() === 0 && amount === -1){
            ulRef.append(oData.emptyCartListTemplate);
        }
    
        document.querySelector('#totalAmount').textContent = getTotalAmount(api.cart.list());
    
    
    }
    else{
        ulRef.append(oData.emptyCartListTemplate);
        document.querySelector('#totalAmount').textContent = '0';
        document.querySelector('#orderBtn').disabled = true;
        document.querySelector('#cartAmountTop').textContent = '0';
    }



}

const setupProductListItemElement = (item, itemTemplate) => {
    itemTemplate.querySelector('.products__coffee-title').textContent = item.title.length > 15 ? `${item.title.slice(0,15)}...` : item.title;
    itemTemplate.querySelector('.product-price').textContent = item.price;
    itemTemplate.querySelector('.products__coffee-description').textContent = item.desc;

    itemTemplate.querySelector('.plus-btn').addEventListener('click', async () => {
        let checkIfNew = api.cart.list().find(x => x.id === item.id);


        await api.cart.add(item.id).then(async () =>{
            if(!checkIfNew){
                const ulRef = document.querySelector('#ulForCart');

                let newItem = api.cart.list().find(x => x.id === item.id);
                newItem.amount =0;
                newItem = addCartListItem(newItem)
                ulRef.append(newItem);
                updateCart(newItem, 1);
            }
            else{
                document.querySelector(`#cartItem${item.id}`).querySelector('.product-quantity').textContent = Number(document.querySelector(`#cartItem${item.id}`).querySelector('.product-quantity').textContent)+1;
            }
            document.querySelector('#cartAmountTop').textContent = api.cart.itemCounter();
    document.querySelector('#totalAmount').textContent = getTotalAmount(api.cart.list());
            

        });
    });

    
    return itemTemplate;
}
export const setupProductList = async (rootElement) => {
    const productsSectionRef = document.querySelector('#productsList');
    const productList = await api.product.list();

    productList.forEach(item => {
        productsSectionRef.append(setupProductListItemElement(item, rootElement.querySelector('.products__item').cloneNode(true)));
    });
}


function getTotalAmount(cart) {
    let amount = 0;
    if(cart.length === 0){
        return '0';
    }
    cart.forEach(item => {
        amount += item.productInfo.price * item.amount;
    });
    return amount;

}
