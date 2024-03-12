const productApi = 'https://santosnr6.github.io/Data/airbeanproducts.json';
const userApi = 'https://santosnr6.github.io/Data/airbeanusers.json';

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

    add: async (userToAdd) => {
        try{
         
            const userList = await user.list();
            userToAdd.role = 'user';
            userList.push(userToAdd);
            localRequest.change('users', userList);

            return true;
        }catch(e){
            return e;
        }
    },
    /**
     * 
     * @param {string} username = the current user that logs in 
     */
    login: (username) => localRequest.change('currentUser', {username: username}),

    logout: () => localRequest.remove('currentUser'),

    getCurrentUser: () => localRequest.get('currentUser').username,

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
     * @returns {{id:number, title:string, desc:string, price:number}} returns the product from localStorage
     * 
     */
    details: async (productId) => {
        const menu = await product.list();
        return menu.find(x => x.id === productId);
    },
    /**
     * 
     * @param {{title: string, desc: string, price: number}} product the product we want to add to localStorage
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

const api = {
    user,
    product
}


export default api;
