function openFeatures() {
    var allElems = document.querySelectorAll('.elem');
    var allFullElems = document.querySelectorAll('.fullElem');
    var allFullElemsBack = document.querySelectorAll('.fullElem .back');

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullElems[elem.id].classList.add('active');

            if (elem.id === '3') {
                const quoteText = document.querySelector('.motivation-quote p');
                const quoteAuthor = document.querySelector('.motivation-author h3');

                quoteText.textContent = "Loading...";
                quoteAuthor.textContent = "";

                fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/random&timestamp=' + new Date().getTime())
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            quoteText.textContent = `"${data[0].q}"`;
                            quoteAuthor.textContent = `- ${data[0].a}`;
                        }
                    })
                    .catch(err => {
                        console.error("Error fetching quote:", err);
                        quoteText.textContent = "\"The only way to do great work is to love what you do.\"";
                        quoteAuthor.textContent = "- Steve Jobs";
                    });
            }
        })
    })

    allFullElemsBack.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullElems[back.id].classList.remove('active');
        })
    })
}
openFeatures();


function todoList() {
    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let taskCheckbox = document.querySelector('.addTask form #check')

    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log("List is empty");
    }


    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask));
        let allTask = document.querySelector('.allTask')
        console.log(allTask);

        let sum = ''

        currentTask.forEach(function (elem, idx) {
            // console.log(elem.details);
            sum += `<div class="task">
        <h5>${elem.task} <span class = ${elem.imp}>imp</span></h5>
        <button id = ${idx} >Mark as Completed</button>
    </div>`
        })

        allTask.innerHTML = sum;
    }

    renderTask();



    form.addEventListener('submit', function (dets) {
        dets.preventDefault();

        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            })

        renderTask();
        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckbox.checked = false
    })


    document.querySelector('.allTask').addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            let index = e.target.id;
            currentTask.splice(index, 1);
            renderTask();
        }
    });
}

todoList();

function dailyPlanner() {

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};


    var dayPlanner = document.querySelector('.day-planner');

    var hours = Array.from({ length: 18 }, function (elem, idx) {
        return `${6 + idx}:00 - ${7 + idx}:00`;
    })

    var wholeDaySum = ''

    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || '';
        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input type="text" id = ${idx} placeholder="..." value = "${savedData}">
                </div>`
    })

    dayPlanner.innerHTML = wholeDaySum;
    var dayPlannerInput = document.querySelectorAll('.day-planner input');

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
        })
    })
}

dailyPlanner();