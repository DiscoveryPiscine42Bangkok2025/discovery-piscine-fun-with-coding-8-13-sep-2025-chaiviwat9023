document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('ft_list');
    const newButton = document.getElementById('newButton');

    function saveTodos() {
        const todos = [];
        const todoItems = todoList.querySelectorAll('.todo-item');
        todoItems.forEach(function(item) {
            todos.push(item.textContent);
        });
        document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;max-age=31536000";
    }

    function addTodo(text, shouldSave = true) {
        const newTodo = document.createElement('div');
        newTodo.className = 'todo-item';
        newTodo.textContent = text;
        
        newTodo.addEventListener('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                newTodo.remove();
                saveTodos();
            }
        });

        todoList.prepend(newTodo);
        if (shouldSave) {
            saveTodos();
        }
    }

    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));

        if (todoCookie) {
            try {
                const todos = JSON.parse(todoCookie.split('=')[1]);
                todos.reverse().forEach(function(todoText) {
                    addTodo(todoText, false);
                });
            } catch (e) {
                console.error("Error parsing todos from cookie:", e);
            }
        }
    }

    newButton.addEventListener('click', function() {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
        }
    });

    loadTodos();
});