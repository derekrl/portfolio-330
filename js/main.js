const links = [
    {
        label: "Week 1 - Local Storage",
        url: "week01/index.html"
    },
    {
        label: "Week 2 - Basic JS | Arrays,Logic,Loops | Functions",
        url: "week02/index.html"
    }
]

// todo: nest within array so there can be more than one page per week
// Week 2: Link 1 | Link 2

string = "";

function listAppend(item) {
    string = "<li><a href=" + item.url + ">" + item.label + "</a>";
    document.getElementById("list").innerHTML += string;
}

links.forEach(listAppend);