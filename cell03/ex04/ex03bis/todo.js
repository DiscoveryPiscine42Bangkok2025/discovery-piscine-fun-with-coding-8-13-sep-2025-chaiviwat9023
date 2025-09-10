$(function() {
    const $todoList = $('#ft_list');

    function saveTodos() {
        const todos = [];
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;max-age=86400";
    }

    function addTodo(text, shouldSave = true) {
        const $newTodo = $('<div></div>').addClass('todo-item').text(text);
        $todoList.prepend($newTodo);
        
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

    $('#newButton').on('click', function() {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
        }
    });

    $todoList.on('click', '.todo-item', function() {
        if (confirm('Do you want to remove this TO DO?')) {
            $(this).remove();
            saveTodos();
        }
    });

    loadTodos();
});
