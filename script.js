const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
//array store todos
let todos = [];

const todo = {
    id: Date.now(),
    name: "Buy Milk",
    completed: false
};
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);

});

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo); //add todo in todos array
        renderTodos(todos);
        todoInput.vlaue = '';

    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        const checked = item.completed ? 'checked' : null; //it will fill the element li
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }
        //fixed error here
        li.innerHTML = `<input type ="checkbox" class="checkbox" ${checked}>${item.name}<button class="delete-button">፩</button>`;
        todoItemsList.append(li);
    });

}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}
//getFromLocalStorage();
todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));

    }
});

function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}
getFromLocalStorage();
