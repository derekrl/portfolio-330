// document.forms.hero.herName.focus();

const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);


function makeHero(event) {
    event.preventDefault();
    const hero = {};
    hero.name = form.heroName.value; // text input
    hero.realName = form.realName.value;
    hero.powers = []; // checkbox input
    for (let i = 0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    }

    hero.category = form.category.value;
    hero.age = form.age.value;
    hero.city = form.city.value;
    // form.city.options[form.city.selectedIndex].text
    hero.origin = form.origin.value;

    // alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    alert(JSON.stringify(hero, null, 4)); // make it readable
    return hero;
}

// form.addEventListener('submit', validate, false);
// function validate(event) {
//     const firstLetter = form.heroName.value[0];
//     if (firstLetter.toUpperCase() === 'X') {
//         event.preventDefault();
//         alert('Your name is not allowed to start with X!');
//     }
// }


const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);
function validateInline() {
    heroName = this.value.toUpperCase();
    if (heroName.startsWith('X')) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}
form.heroName.addEventListener('keyup', validateInline, false);

function disableSubmit(event) {
    if (event.target.value === '') {
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
}
form.heroName.addEventListener('keyup', disableSubmit, false);
