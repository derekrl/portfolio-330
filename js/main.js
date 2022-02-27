const links = [
    {
        label: "Week 1 - Local Storage",
        url: "week01/"
    },
    {
        label: "Week 2 - Basic JS | Arrays,Logic,Loops | Functions",
        url: "week02/"
    },
    {
        label: "Week 3 - Objects | DOM | Events",
        url: "week03/"
    },
    {
        label: "Week 4 - Forms | OOP | Modular JS",
        url: "week04/"
    },
    {
        label: 'Week 5 - Testing and Debugging',
        url: 'week05/'
    },
    {
        label: 'Week 6 - Todo Project',
        url: 'week06/todo-project/'
    },
    {
        label: 'Week 7 - Functional Programming | AJAX',
        url: 'week07/'
    },
    {
        label: 'Week 8 - Transforms and Transitions | Canvas, SVG, and Drag and Drop',
        url: 'week08/'
    }
]

let string = '';

function listAppend(item) {
    string = `<li><a href=${item.url}>${item.label}</a>`;
    document.getElementById('list').innerHTML += string;
}

links.forEach(listAppend);