
/** LocalStorageService namespace
 * @namespace
 */
export const LocalStorageService = {
    /**Store data in local storage by key
    * @param {string} key - The key.
    * @param {Object} key - The stored data.
    */
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        //this.setState({ hits: result.hits });
    },
    /**Clear all data from local storage
    */
    clear: () => {
        localStorage.clear();
    },
    /**Remove data by key from local storage
    * @param {string} key - The data's key in local storage.
    */
    remove: (key) => {
        localStorage.removeItem(key);
    },
    /**Get data by key from local storage
    * @param {string} key - The data's key in local storage.
    * @returns {Object} - The stored data by particular key 
    */
    get: (key) => {
        var data = localStorage.getItem(key);
        return JSON.parse(data);
    }
}
