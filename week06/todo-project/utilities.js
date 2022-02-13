/**
 * Do a querySelector lookup
 * @param {string} Selector
 * The selector passed to querySelector
 * @return {element}
 * The matching element or null if not found
 */

export function qs(selector) {
    return document.querySelector(selector);
}

/**
 * Do a querySelectorAll lookup
 * @param {string} Selector
 * The selector passed to querySelectorAll
 * @return {element}
 * The matching elements or null if not found
 */

export function qsAll(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add a touchend event listener to an element for mobile
 * with a click event fallback for desktops
 * @param {string} elementSelector
 * The selector for the element to attack the listener to
 * @param {function} callback
 * The callback function to run
 */

export function onTouch(elementSelector, callback) {
    if (/Mobile/i.test(window.navigator.userAgent)) {
        qs(elementSelector).addEventListener('touchend', callback);
    } else {
        qs(elementSelector).addEventListener('mouseup', callback);
    }

}
