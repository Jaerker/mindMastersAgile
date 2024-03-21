import api from './api.js';
import { setupHamburger, checkIfAdmin } from './mainFunctions.js';

const oData= {
    editItemTemplate: {}, 
    listItemTemplate: {},
    popOverSectionRef: {},
    dashboardWrapperRef:{},
    ulRef: {}

}

window.addEventListener('load', async () => {

    oData.editItemTemplate = document.querySelector('.dashboard-details__edit-box').cloneNode(true);
    oData.listItemTemplate = document.querySelector('.dashboard-details__item').cloneNode(true);
    document.querySelector('.dashboard-details__item').remove();
    document.querySelector('.dashboard-details__edit-box').remove();

    oData.popOverSectionRef = document.querySelector('.popover-dialog');
    oData.dashboardWrapperRef = document.querySelector('.dashboard__wrapper');
    oData.ulRef = document.querySelector('#productsList');


    setupHamburger();
    checkIfAdmin();

    // setupUsers();
    setupProducts();

    //Product: 
    /**
     * {
     *      desc: description
     *      image: bilden
     *      longer_desc: längre beskrivning
     *      price: priset
     *      rating: kanske inte kunna röra?
     *      title: namn på kaffet
     * }
     */

    //User:
    /**
     *  {
     *      username:       användarnamn
     *      password:       lösenord (inte visa)
     *      email:          användarens emailadress
     *      profile_image:  profilbilden (kan inte ändras)
     *      role:           roll som användaren har
     *      
     *  }
     * 
     */

});

async function setupProducts(){
    const list = await api.product.list();
    
    document.querySelector('#newProduct').addEventListener('click', () => {
        setupEditDialog(oData.editItemTemplate);
    });


    list.forEach(item => {

        oData.ulRef.append(buildListItem(oData.listItemTemplate, item));

    });



}
async function setupUsers(){
    const list = await api.user.list();
    console.log(list);
}


function buildListItem(template, item){
    template.querySelector('.item__title').textContent = item.title;
    template.id = `listItem${item.id}`;

    template.querySelector('.item__price').textContent = item.price;

    template.querySelector('.item__description').textContent = item.desc;

    template.querySelector('.item__longer-description').textContent = item.longer_desc;

    template.querySelector('.item__button-for-open').addEventListener('click', (e) => {
            
        e.target.textContent = e.target.textContent === 'MINDRE INFO' ? 'MER INFO' :  'MINDRE INFO';
        e.target.parentElement.querySelector('.item__detailed-information').classList.toggle('item__detailed-information--hidden');
    });


    template.querySelector('.item__button-for-edit').addEventListener('click', () => {
        setupEditDialog(oData.editItemTemplate, item);

    });
    oData.listItemTemplate = oData.listItemTemplate.cloneNode(true);


    return template;
}

function setupEditDialog(template, item = null) {

    oData.popOverSectionRef.classList.toggle('popover-dialog--hidden');
    oData.dashboardWrapperRef.classList.toggle('dashboard__wrapper--inactive');

    template.id = !item ? `createItem` : `editItem${item.id}`;
    template.querySelector('#title').setAttribute('value', item?.title || '');
    template.querySelector('#price').setAttribute('value', item?.price ||'');
    template.querySelector('#desc').innerText = item?.desc || '';
    template.querySelector('#longerDesc').innerText = item?.longer_desc || '';
    oData.popOverSectionRef.append(template);

    oData.popOverSectionRef.querySelector('#goBackBtn').addEventListener('click', () => {
        oData.popOverSectionRef.classList.toggle('popover-dialog--hidden');
        oData.dashboardWrapperRef.classList.toggle('dashboard__wrapper--inactive');
        oData.editItemTemplate = document.querySelector('.dashboard-details__edit-box').cloneNode(true);
        document.querySelector('.dashboard-details__edit-box').remove();

    });

    oData.popOverSectionRef.querySelector('#submitBtn').addEventListener('click', async () => {
        if(template.id !== 'createItem'){
            const productToChange = await api.product.details(item.id);
            productToChange.title = template.querySelector('#title').value;
            productToChange.price = template.querySelector('#price').value;
            productToChange.desc = template.querySelector('#desc').value;
            productToChange.longer_desc = template.querySelector('#longerDesc').value;
            api.product.change(productToChange);
            const thisItem = document.querySelector(`#listItem${item.id}`);
            thisItem.querySelector('.item__title').innerText = productToChange.title;
            thisItem.querySelector('.item__price').innerText = productToChange.price;
            thisItem.querySelector('.item__description').innerText = productToChange.desc;
            thisItem.querySelector('.item__longer-description').innerText = productToChange.longer_desc;
        }
        else{
            const newProduct = {
                title:template.querySelector('#title').value, 
                price:template.querySelector('#price').value,
                desc:template.querySelector('#desc').value,
                longer_desc:template.querySelector('#longerDesc').value                
            };
            await api.product.add(newProduct);
            oData.ulRef.append(buildListItem(oData.listItemTemplate, newProduct));

        }



        oData.popOverSectionRef.classList.toggle('popover-dialog--hidden');
        oData.dashboardWrapperRef.classList.toggle('dashboard__wrapper--inactive');
        oData.editItemTemplate = document.querySelector('.dashboard-details__edit-box').cloneNode(true);
        document.querySelector('.dashboard-details__edit-box').remove();
    });

    if(template.id === 'createItem'){
        oData.popOverSectionRef.querySelector('#removeBtn').style.display = 'none';
    }
    else{
        oData.popOverSectionRef.querySelector('#removeBtn').style.display = 'block';
    }

    oData.popOverSectionRef.querySelector('#removeBtn').addEventListener('click', (e) => {
        e.preventDefault();
        api.product.remove(item.id);
        const productToRemove = document.querySelector(`#listItem${item.id}`);
        oData.popOverSectionRef.classList.toggle('popover-dialog--hidden');
        oData.dashboardWrapperRef.classList.toggle('dashboard__wrapper--inactive');
        oData.editItemTemplate = document.querySelector('.dashboard-details__edit-box').cloneNode(true);
        document.querySelector('.dashboard-details__edit-box').remove();
        productToRemove.remove();
    });
    
}