const productApi = 'https://santosnr6.github.io/Data/airbeanproducts.json';
const userApi = 'https://santosnr6.github.io/Data/airbeanusers.json';

const apiRequest = {
    get: async (url) => await fetch(`${url}`).then(response => response.json()).catch(exception => {return {id:-1, error:exception}})
}

const localRequest = {
    get: (list) => localStorage.getItem(list),
    post:(list, data = []) => {},
    put: (list, data = []) => {},
    del: (list, data = []) => {},

}

const user = {
    /**
     * @returns returns a list of all users from localStorage
     */
    list: async () => {
        if(!localRequest.get(userApi)){
            return 'is null'
        }else{
            return 'is not null'
        }
    },
    /**
     * 
     * @param {{username: string, password: string, email: string }} user the users registration information
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    add:(user) => {},
    /**
     * Removes the current user from localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    remove:() => {},
    /**
     * Changes the current user from localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    change:() => {},
}

const product = {
    /**
     * @returns returns a list of all products from localStorage
     */
    list:() => {},
    /**
     * 
     * @param {number} productId id of product we want details about
     * @returns {{id:number, title:string, desc:string, price:number}} returns the product from localStorage
     * 
     */
    details:(productId) => {},
    /**
     * 
     * @param {{title: string, desc: string, price: number}} product the product we want to add to localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    add:(product) => {},
    /**
     * 
     * @param {number} productId the product we want to add to localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    remove:(productId) => {},
    /**
     * 
     * @param {{id: number, title: string, desc: string, price: number}} product the product we want to change in localStorage
     * @returns {boolean} TRUE if successful, FALSE if not.
     */
    change:(product) => {},
}

const api = {
    user,
    product,
    setup: () =>{
    }
}
export default api;
