// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const checkbox = document.querySelector(".fa-circle-thin");
const pencil=document.querySelector(".fa-pencil");
// const app=require("express");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// var editTask = function () {
//     console.log("Edit Task...");
//     console.log("Change 'edit' to 'save'");

//     var listItem = this.parentNode;

//     var editInput = listItem.querySelector("input[type=text]");
//     var label = listItem.querySelector("label");
//     var containsClass = listItem.classList.contains("editMode");
//     //If class of the parent is .editmode
//     if (containsClass) {
//         //switch to .editmode
//         //label becomes the inputs value.
//         label.innerText = editInput.value;
//     } else {
//         editInput.value = label.innerText;
//     }

//     //toggle .editmode on the parent.
//     listItem.classList.toggle("editMode");
// };

// Show todays date
const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    <i class="fa fa-pencil" job="edit" id="${id}"></i>
                  </li>
                `;     

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function(even) {
    if (even.key === "Enter") {
        const toDo = input.value;

        // if the input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function editTask(e) {
    // editId = taskId;
    // isEditTask = true;
    // taskInput.value = textName;
    // taskInput.focus();
    // taskInput.classList.add("active");
    var item=e.target.innerHTML;
    var itemInput = document.createElement("input");
    itemInput.value=item;
    itemInput.classList.add('edit');
    itemInput.addEventListener(e.keypress==="Enter", addToDo);
    e.target.parentNode.prepend(itemInput);
    e.target.remove();   
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    } else if(elementJob == "edit"){
        editTask(element);
    }

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// app.listen(3000, function(){
//     console.log("listening on port 3000");
// })

checkbox.addEventListener("click", function() {
    var Items = document.querySelectorAll(".item");
    var totalItems = Items.length();
    var doneItems
    var perc = Math.floor((doneItems / totalItems) * 100);
    const length_val = (document.getElementsByClassName(
        "progress"
    ).style.width = `
    <div id="pg-bar">
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar" role="progressbar" style="width: ${perc}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        `);
})


pencil.addEventListener('click', editTask

);
