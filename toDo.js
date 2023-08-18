const refs = {
    list: document.querySelector(".listTodo"),
    input: document.querySelector("#task-input"),
    form: document.querySelector("#form")
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
        alert("enter something")
        return
    }
    console.log('submit text:', text)
    saveTodo(text);
    // evt.target.elements[0].value = "";
    evt.target.reset();
    refs.list.innerHTML = createTodo(todoList);
};

function saveTodo(text) {
    const todo = {
        value: text,
        checked: false,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    }
    todoList.push(todo)
    localStorage.setItem("todos", JSON.stringify(todoList))
    console.log('todoList:', todoList)
}

// function createTodo(text) {
//     const todoTemplate = `
//         <li>${text}
//             <button type="button" class="editBtn">edit</button>
//             <button type="button" class="delateBtn">delete</button>
//         </li>`
//     refs.list.insertAdjacentHTML('beforeend', todoTemplate)

// }

function createTodo(todos) {
    refs.list.innerHTML = "";
    return todos.map((el, index) => {
        return `
        <li class="item" id=${index}>${el.value}
        
          <div class="wrapIcon">
            <button type="button" class="editBtn">
                <svg class="icon-edit">
                   <use href="./icon.svg#pencil2"></use>
                </svg>
            </button>
            <button type="button" class="delateBtn">
               <svg class="icon-delete">
                   <use href="./icon.svg#bin"></use>
               </svg>
            </button>
            </div>
        </li>`
    }).join("")

};

function delateTodo(evt) {
    const deleteButton = evt.target.closest(".delateBtn")?.classList[0];
    const itemID = Number(evt.target.closest(".item").id);
    // console.log('itemID', Number(itemID))
    if (!deleteButton) {
        return
    }

    todoList = todoList.filter((_, index) => index !== itemID)
    localStorage.setItem("todos", JSON.stringify(todoList))
    refs.list.innerHTML = createTodo(todoList);
}

function editTodo(evt) {
    const editButton = evt.target.closest(".editBtn")?.classList[0]

    if (!editButton) {
        return
    };
    const editId = evt.target.closest(".item").id;
    console.log('evt.target:', evt.target.closest(".item").textContent)
    // refs.input.value = evt.target.closest(".item").textContent
}


// function onInputChange(evt) {
//     let inputValue = evt.target.value
//     console.log('inputValue', inputValue)
// }