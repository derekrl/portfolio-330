x = 6;
window.x // 6
window.x === x; // true

// generally don't use window object in references

// except:
if (x) { } // error if false
if (window.x) { } // false if false

// window.alert('returns undefined');
// window.confirm('returns true or false');
// window.prompt('returns string or null');

window.navigator.userAgent
window.location.href
// window.location.href = 'https://example.com' // redirect
window.location.protocol
window.location.host // url and port number
window.location.hostname // just url
window.location.port
window.location.pathname
window.location.search // anything following ? delimiter
window.location.hash // #
window.location.origin // where current page originated, read only

if (window.locationMethods) {
    window.location.reload()
    window.location.assign('https://example.com')
    window.location.replace() // like assign, but doesn't store previous to history
    window.location.toString()
}

if (window.browserhistoryMethods) {
    window.history.length
    window.history.go(1) // forward
    window.history.go(0) // reload current
    window.history.go(-1) // back
    window.history.forward()
    window.history.back()
}

if (window.popups) {
    const popup = window.open('https://zombo.com', 'Welcome', 'width=400,height=400,resizable=yes');
    popup.close();
    window.moveTo(0, 0); // will move the window to the top-left corner of the screen
    window.resizeTo(600, 400);
}

if (window.screenInformation) {
    window.screen.height
    window.screen.width
    window.screen.availHeight
    window.screen.availWidth
    window.screen.colorDepth
}

if (window.documentObject) {
    document.write('Hello, world!');
    document.write('<h1>Hello, world!</h1>');

    // can use in html itself, but generally not good idea
    // <h1> <script>document.write("Hello, world!")</script> </h1>
}

if (window.cookies) {
    // add to cookie jar
    document.cookie = 'Name=Superman';
    document.cookie = 'hero=true';
    document.cookie = 'city=Metropolis';

    // change
    document.cookie = 'name=Batman'
    document.cookie = 'city=Gotham'

    // read
    console.log(document.cookie);

    const cookies = document.cookie.split("; ");
    for (crumb of cookies) {
        const [key, value] = crumb.split("=");
        console.log(`The value of ${key} is ${value}`);
    }

    const expiryDate = new Date();
    const tomorrow = expiryDate.getTime() + 1000 * 60 * 60 * 24;
    expiryDate.setTime(tomorrow);
    document.cookie = `name=Batman; expires=${expiryDate.toUTCString()}`;

    // alt: use number of seconds
    document.cookie = 'name=Batman; max-age=86400' // 86400 secs = 1 day

    // set domain
    document.cookie = 'name=Batman; path=/'
    document.cookie = 'name=Batman; domain=sitepoint.com';

    // only transmitted over https
    document.cookie = 'name=Batman; secure';

    // remove a cookie
    document.cookie = 'name=Batman; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

if (window.timingFunctions) {
    // measure in milliseconds, 1000ms = 1s
    window.setTimeout( () => alert("Time's Up!"), 3000);
    // timeouts return reference IDs for
    window.clearTimeout(4);
    // returns undefined whether it works or not

    function chant(){ console.log('Beetlejuice'); }
    const summon = window.setInterval(chant,1000);
    // eventually:
    window.clearInterval(summon);
}
