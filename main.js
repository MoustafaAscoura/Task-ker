const fonts = {
    'anton': "'Anton', sans-serif",
    'cabin': "'Cabin', sans-serif",
    'fasthand': "'Fasthand', cursive"};

// Formatting
if (!(window.localStorage.getItem('fontfamily'))) {
    window.localStorage['fontfamily'] = document.getElementById("font-family").value;
}
if (!(window.localStorage.getItem('fontcolor'))) {
    window.localStorage['fontcolor'] = document.getElementById("font-color").value;
}
if (!(window.localStorage.getItem('fontsize'))) {
    window.localStorage['fontsize'] = document.getElementById("font-size").value;
}
document.getElementById("font-family").value = window.localStorage['fontfamily']; 
document.getElementById("font-size").value = window.localStorage['fontsize'];
document.getElementById("font-color").value = window.localStorage['fontcolor']; 

function upDateValues () {
    window.localStorage['fontfamily'] = document.getElementById("font-family").value;
    document.getElementById("font-family").value = window.localStorage['fontfamily']; 
    window.localStorage['fontcolor'] = document.getElementById("font-color").value;
    document.getElementById("font-color").value = window.localStorage['fontcolor']; 
    window.localStorage['fontsize'] = document.getElementById("font-size").value;
    document.getElementById("font-size").value = window.localStorage['fontsize'];

    document.querySelectorAll("#task-show > div > p").forEach((p) => {
        p.style.fontFamily = fonts[window.localStorage['fontfamily']];
        p.style.color = window.localStorage['fontcolor'];
        p.style.fontSize = window.localStorage['fontsize'] + "px";
    });
};

document.querySelectorAll(".font-option").forEach((item) => {
    item.addEventListener('click', (event) => {
        upDateValues();
    });
});



// Adding Tasks
function addTask (text, old=false) {
    if (text == "") {return};
    let newdiv = document.createElement("div");
    newdiv.className = "task";
    let p = document.createElement("p");
    p.innerHTML = text;

    let b = document.createElement("button");
    b.innerHTML = "Delete";
    b.classList.add("orange", "delete");
    b.setAttribute("type", "button");
    b.addEventListener('click' ,(event) => {
        let tasks = localStorage.tasks.split("|**|");
        tasks.splice(tasks.indexOf(text),1);
        event.target.parentElement.remove();
        localStorage.tasks = tasks.join("|**|");
    });

    newdiv.append(p,b);
    document.getElementById("task-show").appendChild(newdiv);
    if (old == false) {
        if (!(localStorage.tasks)) {
            localStorage.tasks = new Array()
        }
        localStorage.tasks += "|**|" + text;
    };
    

}

//Adding Saved Tasks
function deleteTasks () {
    document.querySelector("#task-show").remove();
    let temp = document.createElement("div");
    temp.setAttribute("id", "task-show");
    document.querySelector("#task-input").after(temp);
}

deleteTasks();

if (localStorage.tasks) {
    localStorage.tasks.split("|**|").forEach(addTask);
}
//Button Functions
document.querySelector("#task-input input").addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        document.querySelector("#task-input button").click();
    }
});
document.querySelector("#task-input button").addEventListener('click',(event) => {
    let bar = document.querySelector("#task-input input");
    let val = bar.value;
    bar.value = "";
    if (val != "") {
        addTask(val, false);
        upDateValues();
    }

    bar.style.width = "70%";
    bar.parentElement.lastElementChild.style.display = "block";
});

document.querySelectorAll("#task-input button")[1].addEventListener('click',(event) => {
    if (window.confirm('Delete All Tasks?')){
        localStorage.tasks = "";
        deleteTasks();
    };
});

upDateValues();
