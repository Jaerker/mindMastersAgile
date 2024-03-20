const productApi = 'https://santosnr6.github.io/Data/airbeanproducts.json';
const userApi = 'https://santosnr6.github.io/Data/airbeanusers.json';
const randomApi = (num) => `https://randomuser.me/api/portraits/men/${num}.jpg`;

const apiRequest = {
    get: async (url) => await fetch(`${url}`).then(response => response.json()).catch(exception => {return {error:exception}})
}

const localRequest = {
    get:  (item)       => JSON.parse(localStorage.getItem(item)),
    change: (item, data) => localStorage.setItem(item, JSON.stringify(data)),
    remove: (item) => localStorage.removeItem(item)
}

const user = {

    list: async () => {
        let data = localRequest.get('users');
        if(!data){
            const apiCall = await apiRequest.get(userApi);
            if(apiCall.error){
                return apiCall;
            }
            localRequest.change('users', apiCall.users);
            return localRequest.get('users');
        }
        return data;
    },

    details: async(username) => {
        try{
            const userList = await user.list();
            const chosenUser = userList.find(x => x.username === username);
            if(!chosenUser){
                console.log('Användaren finns inte')
                return false;
            }
            
            return chosenUser;
        }catch(e){
            console.log(e);
            return false;
        }   
    },

    add: async (userToAdd) => {
        try{
         
            const userList = await user.list();
            userToAdd.role = 'user';
            userList.push(userToAdd);
            localRequest.change('users', userList);

            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    /**
     * 
     * @param {string} username = the current user that logs in 
     */
    login: (username) => localRequest.change('currentUser', {username: username}),

    logout: () => localRequest.remove('currentUser'),

    getCurrentUser: () => localRequest.get('currentUser')?.username,

    /**
     * Changes the current user from localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    change: async (userToChange) => {
        try{
            const userList = await user.list();
            const oldUser = userList.find(x => x.username === userToChange.username);
            if(!oldUser){
                return false;
            }
            const newList = userList.filter(x => x.username !== userToChange.username);
            newList.push(userToChange);
            localRequest.change('users', newList);

            return true;
        }catch(e){
            return e;
        }
        
    },
}

const product = {
    /**
     * @returns returns a list of all products from localStorage
     */
    list: async () => {
        let data = localRequest.get('products');
        if(!data){
            const apiCall = await apiRequest.get(productApi);
            if(apiCall.error){
                return apiCall;
            }
            localRequest.change('products', apiCall.menu);
            return localRequest.get('products');
        }
        return data;
    },
    /**
     * 
     * @param {number} productId id of product we want details about
     * @returns {{id:number, title:string, desc:string, longer_desc:string, price:number}} returns the product from localStorage
     * 
     */
    details: async (productId) => {
        const menu = await product.list();
        return menu.find(x => x.id === productId) || false;
    },
    /**
     * 
     * @param {{title: string, desc: string, longer_desc:string, price: number}} product the product we want to add to localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    add: async (productToAdd) => {
        try{
         
            const list = await product.list();
            productToAdd.id = list[list.length-1].id+1;
            list.push(productToAdd);
            localRequest.change('products', list);

            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    /**
     * 
     * @param {number} productId the product we want to add to localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    remove: async (productId) => {
        try{
         
            const list = await product.list();
            if(!list.find(x => x.id === productId)){
                return false
            }
            localRequest.change('products', list.filter(x => x.id !== productId));

            return true;
        }catch(e){
            return false;
        }
    },
    /**
     * 
     * @param {{id: number, title: string, desc: string, price: number}} product the product we want to change in localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    change: async (productToChange) => {
        try{
            const list = await product.list();
            const oldProduct = list.find(x => x.id === productToChange.id);
            if(!oldProduct){
                return false;
            }
            let newList = list.filter(x => x.id !== productToChange.id);
            newList.push(productToChange);
            newList = newList.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
            
            localRequest.change('products', newList);

            return true;
        }catch(e){
            return e;
        }
    },
}

const orderHistory = {
    list: () => {
        
        const data = localRequest.get('orderHistory');
        if(!data){    
            localRequest.change('orderHistory', []);
            return localRequest.get('orderHistory');
        }
        if(user.getCurrentUser()){

            const results = data.filter(x => x.username === user.getCurrentUser());
            return results;

        }
        return data;
    },
    add: (orderToAdd) => {
        if(!orderToAdd){
            return false;
        }
        try{
         
            const list = orderHistory.list();
            list.push(orderToAdd);
            localRequest.change('orderHistory', list);
            return true;
        }catch(e){
            return e;
        }
    },
    getSum: () => {
        const data = orderHistory.list();

        if(!data || !user.getCurrentUser()){
            return 0;
        }
        let counter = 0;
        data.forEach(item => {counter += item.totalSum});

        return counter;

    }
}

const profileImage = {
    getRandom: () =>  randomApi(Math.floor(Math.random()*100))
}
//Hur ser cart ut?
/*
FÖRSLAG: 
[
    {
        id: PRODUCTID
        productInfo: KOPIA AV PRODUCT OBJEKT
        amount: ANTAL
    },
    {
        id: PRODUCTID
        productInfo: KOPIA AV PRODUCT OBJEKT
        amount: ANTAL
    }
] 
*/
const cart = {
    list: () => {
        const data = localRequest.get('cart');
        if(!data){    
            localRequest.change('cart', []);
            return localRequest.get('cart');
        }

        return data;
    },
    add: async (productId) => {
        if(productId || productId>=0){
            const list = cart.list();

            let found = false;
            list.forEach(element => {
                if(element.id === productId){
                    element.amount +=1;
                    found = true;
                }
            });
            if(!found){
                const productInfo = await product.details(productId);
                if(!productInfo){
                    return false;
                }
                list.push({id:productId, productInfo: productInfo, amount:1});
            }
            localRequest.change('cart', list);
            return true;
        }
        return false;
    },
    remove: (productId) => {
        let list = cart.list();
        let found = false;
        let emptyElement = -1;
        list.forEach(element => {
            if(element.id === productId){

                element.amount -=1;
                found = true;

                if(element.amount === 0){
                    emptyElement = element.id;
                }
            }

        });
        if(!found){
            return false;
        }
        if(emptyElement !== -1){
            list = list.filter(x => x.id !== emptyElement);
        }
        localRequest.change('cart', list);
        return true;

    },
    itemCounter: () => {
        const items = cart.list();
        if(items.length<=0){
            return 0;
        }
        else{
            let counter = 0;
            items.forEach(item => {
                counter +=item.amount;
            });
            return counter;
        }
    }
}

const api = {
    user,
    product,
    orderHistory,
    profileImage,
    cart
}


export default api;
