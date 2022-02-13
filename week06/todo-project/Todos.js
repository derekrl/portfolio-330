import { qs, onTouch } from './utilities.js';
import { readFromLS, writeToLS } from './ls.js'

export default class Todos {

    constructor(elementIn, keyIn) {
        this.parentElement = qs(elementIn);
        this.key = keyIn;
        this.todoList = getTodos(this.key);
        this.listTodos();
        onTouch('#filter-all', () => this.filterTodos('All'));
        onTouch('#filter-active', () => this.filterTodos('Active'));
        onTouch('#filter-complete', () => this.filterTodos('Completed'));
        onTouch('#task-submit', () => this.addTodo());
    };

    /** Add new Item to todo list */

    addTodo() {
        const input = qs('#task-input');
        if (!input.value) {
            input.placeholder = 'Type the description of the task here';
        } else {
            saveNewTodo(input.value, 'todo-list');
            input.value = '';
            input.placeholder = 'Add new task';
            this.listTodos();
        }
    };

    /** Redraw to-do list */

    listTodos() {
        renderTodoList(this.todoList, this.parentElement);
        Array.from(this.parentElement.children).forEach(row => {
            onTouch(`.task-row[data-timestamp='${row.dataset.timestamp}'] .task-checkbox`,
                () => this.completeTodo(row.dataset.timestamp));
            onTouch(`.task-row[data-timestamp='${row.dataset.timestamp}'] .task-remove`,
                () => this.removeTodo(row.dataset.timestamp));
        });
        this.updateCounter();
        this.filterTodos();
    }

    /**
     * Toggle completion status for todoList item
     * @param {number} ts 
     * Timestamp ID
     */

    completeTodo(ts) {
        let row = qs(`.task-row[data-timestamp='${ts}']`);
        let index = indexFromTimestamp(ts);
        // this.listTodos();
        switch (this.todoList[index].completed) {
            case true:
                this.todoList[index].completed = false;
                row.classList.remove('complete');
                row.classList.add('incomplete');
                break;
            case false:
                this.todoList[index].completed = true;
                row.classList.remove('incomplete');
                row.classList.add('complete');
                break;
        }
        saveTodo(this.key);
        this.updateCounter();
    }

    /**
     * Remove todoList item entry
     * @param {number} ts 
     * Timestamp ID
     */

    removeTodo(ts) {
        this.todoList.splice(indexFromTimestamp(ts), 1);
        // this.listTodos();
        this.parentElement.removeChild(qs(`.task-row[data-timestamp='${ts}']`));
        this.updateCounter();
        this.filterTodos();
        saveTodo(this.key);
    }

    /**
     * Modify displayed list to only match specified filter using CSS classes.  
     * @param {string=} filter
     * Optional: filter to apply (All|Active|Completed)
     */

    filterTodos(filter) {
        if (arguments.length === 0) {
            filter = this.parentElement.dataset.filter;
        } else {
            this.parentElement.dataset.filter = filter;
        }
        this.updateCounter();
    }

    // Keeping for reference
    /*
    filterTodos(filter) {
        if (arguments.length === 0) filter = qs('.filter-button.selected').innerText;
        let num = 0;
        qsAll('.task-row').forEach(row => row.classList.remove('hidden'));
        qsAll('.filter-button').forEach(row => row.classList.remove('selected'));
        switch (filter) {
            case 'All':
                qs('#filter-all').classList.add('selected');
                num = this.todoList.filter(item => item.completed == false).length;
                qs('#tasks-left').innerHTML = `<strong>${num}</strong> task${num === 1 ? '' : 's'} left`;
                break;
            case 'Active':
                qsAll('.task-row.complete').forEach(row => row.classList.add('hidden'));
                qs('#filter-active').classList.add('selected');
                num = this.todoList.filter(item => item.completed == false).length;
                qs('#tasks-left').innerHTML = `<strong>${num}</strong> task${num === 1 ? '' : 's'} left`;
                break;
            case 'Completed':
                qsAll('.task-row.incomplete').forEach(row => row.classList.add('hidden'));
                qs('#filter-complete').classList.add('selected');
                num = this.todoList.filter(item => item.completed == true).length;
                qs('#tasks-left').innerHTML = `<strong>${num}</strong> task${num === 1 ? '' : 's'} complete`;
                break;
        }
    }
    */

    /** Update tasks remaining counter */

    updateCounter() {
        let num = 0;
        switch (this.parentElement.dataset.filter) {
            case 'All':
            case 'Active':
                num = this.todoList.filter(item => item.completed == false).length;
                qs('#tasks-left').innerHTML = `<strong>${num}</strong> task${num === 1 ? '' : 's'} left`;
                break;
            case 'Completed':
                num = this.todoList.filter(item => item.completed == true).length;
                qs('#tasks-left').innerHTML = `<strong>${num}</strong> task${num === 1 ? '' : 's'} complete`;
                break;
        }
    }

};

/**
 * Build a todo object, add it to the todoList, and save the new list to local storage
 * @param {string} key
 * The key under which the value is stured under in LS
 * @param {string} task
 * The text of the task to be saved
 */

function saveNewTodo(task, key) {
    const listItem = {
        id: new Date().getTime(),
        content: task,
        completed: false
    }
    Todos.todoList.push(listItem);
    // Todos.listTodos();
    writeToLS(key, Todos.todoList);
}

/**
 * Save todoList to local storage
 * @param {string} key
 * The key under which the value is stored under in LS
 */

function saveTodo(key) {
    writeToLS(key, Todos.todoList);
}

/**
 * Check the contents of todoList, a local variable containing a list of ToDos.
 * If it is null then pull the list of todos from localstorage, update the
 * local variable, and return it
 * @param {string} key
 * The key under which the value is stored under in LS
 * @return {array}
 * The value as an array of objects
 */

function getTodos(key) {
    // console.log(readFromLS(key));
    if (!Todos.todoList) Todos.todoList = readFromLS(key)
    if (!Todos.todoList) {
        const defaultItems = [{
            id: new Date().getTime(),
            content: 'Enter your tasks below',
            completed: false
        },
        {
            id: new Date().getTime() + 1,
            content: 'One at a time',
            completed: false
        },
        {
            id: new Date().getTime() + 2,
            content: 'And complete them!',
            completed: true
        }]
        Todos.todoList = defaultItems;
    }
    return Todos.todoList;
}

/** 
 * foreach todo in list, build an li element for the todo,
 * and append it to the element
 * @param {array} list
 * The list of tasks the render the HTML
 * @param {element} element
 * The DOM element to insert our list elements into.
 */

function renderTodoList(list, element) {
    element.innerHTML = '';
    list.forEach(item => {
        let newElement = renderListItem(item);
        element.appendChild(newElement);
    })
}

/**
 * Parse todoList entry into HTML for renderTodoList
 * @param {object} item 
 * todoList entry object to parse into HTML
 * @returns {element}
 * HTML element
 */

function renderListItem(item) {
    const element = document.createElement('li')
    element.classList.add('task-row');
    element.classList.add(`${item.completed ? "complete" : "incomplete"}`)
    element.dataset.timestamp = item.id;
    element.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${item.completed ? "checked" : ""}>
    <p>${item.content}</p>
    <span class="task-remove">&#x2716;</span>
    `;
    return element;
}

/**
 * Takes a timestamp ID and searches todoList for the matching entry
 * @param {number} timestamp 
 * The ID to search todoList for
 * @returns {number}
 * The matching array index, or null if not found
 */

function indexFromTimestamp(timestamp) {
    return Todos.todoList.findIndex(element => { return element.id == timestamp; })
}

/**
 * Takes an array index and returns the matching todoList timestamp ID
 * @param {number} index
 * The array index
 * @returns {number}
 * The matching ID, or null if not found
 */

function timestampFromIndex(index) {
    return Todos.todoList[index].id;
}
