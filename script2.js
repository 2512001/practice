document.addEventListener('DOMContentLoaded', function () {
    let input = document.getElementById("taskInput");
    let btn = document.getElementById("addTaskBtn");
    let taskList = document.getElementById("taskList");
    let deleteBtn = document.getElementById("delete");

    btn.addEventListener("click", function () {
        if (input.value.trim() !== "") {
            let list = document.createElement("li");

            let timeSpan = document.createElement("span");
            timeSpan.classList.add("time");
            timeSpan.innerText = getCurrentTime();

            let taskSpan = document.createElement("span");
            taskSpan.classList.add("task");
            taskSpan.innerText = input.value.trim();

            let statusSpan = document.createElement("span");
            statusSpan.classList.add("task-status", "pending");
            statusSpan.innerText = "Pending";
            statusSpan.onclick = function () {
                toggleStatus(statusSpan);
            };

            let btn2 = document.createElement("button");
            btn2.innerHTML = "delete";
            btn2.classList.add("delete");

            list.appendChild(timeSpan);
            list.appendChild(taskSpan);
            list.appendChild(statusSpan);
            list.appendChild(btn2);
            taskList.appendChild(list);

            deleteBtn.style.display = "inline-block";
            input.value = ""; // Clear input after adding task
        }
    });

    // Event delegation for dynamically created delete buttons and status
    taskList.addEventListener("click", function (event) {
        const targetElement = event.target;

        if (targetElement.classList.contains("delete")) {
            let par = targetElement.parentElement;
            par.remove();
        } else if (targetElement.classList.contains("task-status")) {
            toggleStatus(targetElement);
        }
    });

    deleteBtn.addEventListener('click', function () {
        let ul = document.getElementById("taskList");

        // Remove all tasks in the list
        ul.innerHTML = "";

        // Hide the delete button if no tasks left
        deleteBtn.style.display = "none";
    });

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        return time;
    }

    function toggleStatus(statusSpan) {
        if (statusSpan.classList.contains("pending")) {
            statusSpan.classList.remove("pending");
            statusSpan.classList.add("completed");
            statusSpan.innerText = "Completed";
        } else {
            statusSpan.classList.remove("completed");
            statusSpan.classList.add("pending");
            statusSpan.innerText = "Pending";
        }
    }
});
