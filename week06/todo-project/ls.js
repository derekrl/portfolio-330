/**  
 * Read a value from local storage and parse it as JSON
 * @param {string} key
 * The key under which the value is stored under in LS
 * @return {array} 
 * The value as an array of objects
 **/

export function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Write an array of objects to local storage under the provided key
 * @param {string} key
 * The key under which the value is stored under in LS
 * @param {array} data
 * The information to be stored as an array objects. Must be serialized
 */

export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
