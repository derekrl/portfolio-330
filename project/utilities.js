// query selectors?

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
 * Add a touchend event listener to an element for mobile
 * with a click event fallback for desktops
 * @param {string} elementSelector
 * The selector for the element to attach the listener to
 * @param {function} callback
 * The callback function to run
 */

export function selectorListener(type, elementSelector, callback) {
    elementListener(type, qs(elementSelector), callback);

    /*
    if (/Mobile/i.test(window.navigator.userAgent)) {
        qs(elementSelector).addEventListener('touchend', callback);
    } else {
        qs(elementSelector).addEventListener('mouseup', callback);
    }
    */
}

/**
 * Add a touchend event listener to an element for mobile
 * with a click event fallback for desktops
 * @param {HTMLElement} element
 * The element to attach the listener to
 * @param {function} callback
 * The callback function to run
 */

export function elementListener(type, element, callback) {

    if (type === 'click') {
        if (/Mobile/i.test(window.navigator.userAgent)) {
            element.addEventListener('touchend', callback);
        } else {
            element.addEventListener('mouseup', callback);
        }
    }

    if (type === 'contextmenu') {
        if (/Mobile/i.test(window.navigator.userAgent)) {
            return false;
        } else {
            element.addEventListener('contextmenu', callback);
        }
    }

    if (type === 'dblclick') {
        element.addEventListener('dblclick', callback);
    }

    if (type === 'mousemove') {
        element.addEventListener('mousemove', callback);
    }

}
