const links = [
    {
        label: "Week 1 - Local Storage",
        url: "week01/index.html"
    },
    {
        label: "Week 2 - Basic JS | Arrays,Logic,Loops | Functions",
        url: "week02/index.html"
    },
    {
        label: "Week 3 - Objects | DOM | Events",
        url: "week03/index.html"
    },
    {
        label: "Week 4 - Forms | OOP | Modular JS",
        url: "week04/index.html"
    },
    {
        label: 'Week 5 - Testing and Debugging',
        url: 'week05/index.html'
    }
]

string = "";

function listAppend(item) {
    string = "<li><a href=" + item.url + ">" + item.label + "</a>";
    document.getElementById("list").innerHTML += string;
}

links.forEach(listAppend);