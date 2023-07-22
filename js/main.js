//Referencia del header
const header = document.querySelector(".header");

//Referencia de la seccion de todos
const todos = document.querySelector(".todos");

//Referencia de los botones
const addButton = document.querySelector(".add-btn");
// checkBtn = document.querySelector(".check"),
// editBtn = document.querySelector(".edit"),
// deleteBtn = document.querySelector(".delete");

//Escucha de eventos del DOM delegados
document.addEventListener("click", (e) => {
    if (e.target.matches(".add-btn")) {
        crearTarea();
    }
});

//Crear la seccion de añadir tareas
function crearTarea() {
    const fragment = document.createDocumentFragment();

    const title = document.createElement("h1");
    const taskName = document.createElement("div");
    const button = document.createElement("button");
    const input = document.createElement("input");

    const addTaskButton = document.createElement("button");
    const iPlus = document.createElement("i");

    addTaskButton.classList.add("add-btn");
    addTaskButton.textContent = "Add Task ";
    iPlus.classList.add("fas");
    iPlus.classList.add("fa-plus");
    addTaskButton.appendChild(iPlus);

    title.textContent = "TODO List";
    taskName.classList.add("task-name");
    button.classList.add("add");
    button.textContent = "Añadir";
    input.placeholder = "Escriba la tarea";

    taskName.appendChild(title);
    taskName.appendChild(input);
    taskName.appendChild(button);
    fragment.appendChild(taskName);

    header.innerHTML = "";
    header.appendChild(fragment);

    //Escuchar click para añadir eventos
    button.addEventListener("click", () => {
        let task = input.value;
        renderTask(task);

        header.innerHTML = "";
        header.appendChild(title);
        header.appendChild(addTaskButton);
    });
}

//Crear en pantalla una nueva tarea a realizar
function renderTask(value) {
    const fragment = document.createDocumentFragment();
    const divTodo = document.createElement("div");
    const divChangeBtn = document.createElement("div");
    const checkBtn = document.createElement("button");
    const taskText = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const iCheck = document.createElement("i");
    const iEdit = document.createElement("i");
    const iDelete = document.createElement("i");

    divTodo.classList.add("todo");
    divChangeBtn.classList.add("change-buttons");
    checkBtn.classList.add("check");
    editBtn.classList.add("edit");
    deleteBtn.classList.add("delete");
    iCheck.classList.add("fas");
    iCheck.classList.add("fa-check");
    iEdit.classList.add("fas");
    iEdit.classList.add("fa-edit");
    iDelete.classList.add("fas");
    iDelete.classList.add("fa-trash");

    taskText.textContent = `${value}`;
    checkBtn.addEventListener("click", (e) => {
        let styles = checkBtn.getAttribute("style");
        if (!styles) {
            checkBtn.style.backgroundColor = "lightgreen";
            checkBtn.style.border = "none";
        } else if (styles !== null) {
            checkBtn.removeAttribute("style");
        }
    });
    editBtn.addEventListener("click", (e) => {
        let textoHermano = editBtn.parentElement.previousElementSibling;
        let tareaAbuela = editBtn.parentElement.parentElement;

        const taskName = document.createElement("div");
        const button = document.createElement("button");
        const input = document.createElement("input");

        taskName.classList.add("task-name");
        button.classList.add("add");
        button.textContent = "Listo";
        input.placeholder = "Escriba la tarea";
        input.value = taskText.textContent;

        taskName.appendChild(input);
        taskName.appendChild(button);

        tareaAbuela.replaceChild(taskName, textoHermano);
        editBtn.style.visibility = "hidden";

        button.addEventListener("click", (e) => {
            let textNuevo = input.value;
            taskText.textContent = textNuevo;

            tareaAbuela.replaceChild(taskText, taskName);
            editBtn.style.visibility = "initial";
        });
    });
    deleteBtn.addEventListener("click", (e) => {
        let tareaAbuela = deleteBtn.parentElement.parentElement;
        todos.removeChild(tareaAbuela);
    });

    deleteBtn.appendChild(iDelete);
    editBtn.appendChild(iEdit);
    checkBtn.appendChild(iCheck);
    divChangeBtn.appendChild(editBtn);
    divChangeBtn.appendChild(deleteBtn);
    divTodo.appendChild(checkBtn);
    divTodo.appendChild(taskText);
    divTodo.appendChild(divChangeBtn);

    fragment.appendChild(divTodo);
    todos.appendChild(fragment);
}
