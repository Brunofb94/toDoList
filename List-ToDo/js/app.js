// CODE EXPLAINED channel


//select the element
const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");
const inputt = document.getElementById("input")

//Classes names

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

// VARIABLES
let LIST,
    id;
// get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    //loadList(LIST);
} else {
    LIST = [];
    id = 0;

}


//load items to the user's interface
loadList = (array) => {
        array.forEach(function(item) {
            addToDo(item.name, item.id, item.done, item.trash);
        });
    }
    //clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

//Show  todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function

addToDo = (toDo, id, done, trash) => {
    if (trash) { return; }

    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";

    const item = `
            <li class="item">
                    <i class="fa fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" >${toDo}</p>
                    <i class="fa fa-trash-o de " job="delete" id="${id}"></i>
            </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


//add an item to the list user
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        console.log("oi");
        const toDo = inputt.value;
        if (toDo) {

            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;

        }
        inputt.value = "";

    }

})


addToDo(" Drink Coffee");

//complete to do

completeToDo = (element) => {

    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove to do 

removeTodo = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynacally

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
        localStorage.setItem("TODO", JSON.stringify(LIST));
    } else if (elementJob == "delete") {
        removeTodo(element);
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }

})