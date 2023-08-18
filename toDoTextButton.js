const refs = {
    list: document.querySelector(".listTodo"),
    input: document.querySelector("#task-input"),
    form: document.querySelector("#form"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.list.addEventListener("click", delateTodo)
refs.list.addEventListener("click", editTodo)

// refs.input.addEventListener("input", onInputChange)


let todoList = JSON.parse(localStorage.getItem("todos")) || [];

refs.list.innerHTML = createTodo(todoList);
// refs.list.insertAdjacentHTML('beforeend', createTodo(todoList));

function onFormSubmit(evt) {
    evt.preventDefault();
    const text = evt.target.elements[0].value

    if (text.trim() === "") {
        return alert("enter something")

    }

    let unicTodo = true;

    todoList.some(todo => {
        if (todo.text.trim() === text.trim()) {
            unicTodo = false
            evt.target.reset();
            return alert(`${todo.text} alredy exist !`)
        }

    })

    if (unicTodo) {
        // console.log('submit text:', text)
        saveTodo(text);
        // evt.target.elements[0].value = "";
        evt.target.reset();
        refs.list.innerHTML = createTodo(todoList);
    }
};

function saveTodo(text) {
    const todo = {
        text,
        checked: false,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    }
    todoList.push(todo)
    localStorage.setItem("todos", JSON.stringify(todoList))
    // console.log('todoList:', todoList)
}


function createTodo(todos) {
    refs.list.innerHTML = "";

    return todos.map((el) => {
        return `
        <li class="item" id=${el?.color} >
            <input class="editInput" id=${el?.color} value="${el?.text}" disabled />
          <div class="wrapIcon">
            <button type="button" class="editBtn">Edit</button>
            <button type="button" class="delateBtn">Delete</button>
            </div>
        </li>`
    }).join("")

};

function delateTodo(evt) {

    const deleteButton = evt.target.closest(".delateBtn")?.classList[0];
    const itemID = evt.target.closest(".item")?.id;

    if (!deleteButton) {
        return
    }

    todoList = todoList.filter((el) => el.color !== itemID)
    localStorage.setItem("todos", JSON.stringify(todoList))
    refs.list.innerHTML = createTodo(todoList);
}

function editTodo(evt) {

    const editButton = evt.target.closest(".editBtn")?.className === "editBtn";

    if (editButton) {

        const item = evt.target.closest(".item")
        const editInput = item.querySelector(".editInput")
        const editButton = item.querySelector(".editBtn");

        if (editButton.innerText === "Edit") {
            editInput.removeAttribute("disabled");
            editInput.focus();
            editButton.innerText = "Save";
        } else {
            editInput.setAttribute("disabled", "disabled");
            editButton.innerText = "Edit";

            todoList = todoList.map(todo => {
                if (todo.color === editInput.id) {
                    return {
                        ...todo,
                        text: editInput.value
                    }
                }
                return todo

            })
            localStorage.setItem("todos", JSON.stringify(todoList));

        }

    }

}