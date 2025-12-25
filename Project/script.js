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

function pomodoroTimer() {

    let interval = null;
    let totalSeconds = 25 * 60;

    let start = document.querySelector('.pomo-timer .start-timer');
    let pause = document.querySelector('.pomo-timer .pause-timer');
    let reset = document.querySelector('.pomo-timer .reset-timer');
    let timer = document.querySelector('.pomo-timer h1');
    let message = document.querySelector('.pomo-message');
    let workSession = true;

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        if (interval !== null || totalSeconds <= 0) return;

        message.innerHTML = "";

        interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                interval = null;

                timer.innerHTML = "00:00";
                message.innerHTML = "🎉 Congrats on completing 25 minutes of study!";
                return;
            }

            totalSeconds--;
            updateTimer();
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(interval);
        interval = null;
    }

    function resetTimer() {
        clearInterval(interval);
        interval = null;
        totalSeconds = 25 * 60;
        updateTimer();
        message.innerHTML = "";
    }


    updateTimer();

    start.addEventListener('click', startTimer);
    pause.addEventListener('click', pauseTimer);
    reset.addEventListener('click', resetTimer);
}

pomodoroTimer();

let apiKey = process.env.WEATHER_API_KEY;
// let apiKey = "f2481a7bd81e4dc2b61135152252412";
var city = "Phagwara";


let header1Time = document.querySelector('.header1 h1');
let header1Date = document.querySelector('.header1 h2');
let header2Temp = document.querySelector('.header2 h2');
let header2Condition = document.querySelector('.header2 h4');
let precipitaion = document.querySelector('.header2 .precipitation');
let humidity = document.querySelector('.header2 .humidity');
let wind = document.querySelector('.header2 .wind');
var data = null;

async function weatherAPICall() {
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    var data = await response.json();
    // console.log(data.current.temp_c)

    header2Temp.innerHTML = `${Math.floor(data.current.temp_c)} °C`;
    header2Condition.innerHTML = `${data.current.condition.text}`
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`
    precipitaion.innerHTML = `Heat Index: ${data.current.heatindex_c}%`
}

weatherAPICall();

var date = null
function timeDate() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date = new Date();
    var todayDay = daysOfWeek[date.getDay()];
    var todayHours = date.getHours();
    var todayMinutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthsOfYear[date.getMonth()];
    var year = date.getFullYear();


    header1Date.innerHTML = `${tarik} ${month}, ${year}`


    if (todayHours > 12) {
        header1Time.innerHTML = `${todayDay}, ${String(todayHours - 12).padStart('2', '0')} : ${String(todayMinutes).padStart('2', '0')} : ${String(seconds).padStart('2', '0')} PM`
    } else {
        header1Time.innerHTML = `${todayDay}, ${String(todayHours).padStart('2', '0')} : ${String(todayMinutes).padStart('2', '0')} : ${String(seconds).padStart('2', '0')} AM`
    }
}

setInterval(() => {
    timeDate()
}, 1000)


function dailyGoals() {
    const goalInput = document.getElementById('goal-input');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalsList = document.querySelector('.goals-list');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');

    let goals = JSON.parse(localStorage.getItem('dailyGoals')) || [];

    function saveGoals() {
        localStorage.setItem('dailyGoals', JSON.stringify(goals));
        updateProgress();
    }

    function updateProgress() {
        if (goals.length === 0) {
            progressBarFill.style.width = '0%';
            progressText.textContent = '0% Completed';
            return;
        }

        const completedCount = goals.filter(g => g.completed).length;
        const percentage = Math.round((completedCount / goals.length) * 100);

        progressBarFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Completed`;
    }

    function renderGoals() {
        goalsList.innerHTML = '';
        goals.forEach((goal, index) => {
            const goalItem = document.createElement('div');
            goalItem.className = `goal-item ${goal.completed ? 'completed' : ''}`;

            goalItem.innerHTML = `
                <div class="goal-left">
                    <input type="checkbox" class="goal-checkbox" ${goal.completed ? 'checked' : ''}>
                    <span class="goal-text">${goal.text}</span>
                </div>
                <button class="delete-goal-btn" title="Delete Goal">&times;</button>
            `;

            // Event Listeners
            const checkbox = goalItem.querySelector('.goal-checkbox');
            checkbox.addEventListener('change', () => {
                goals[index].completed = checkbox.checked;
                saveGoals();
                renderGoals();
            });

            const deleteBtn = goalItem.querySelector('.delete-goal-btn');
            deleteBtn.addEventListener('click', () => {
                goals.splice(index, 1);
                saveGoals();
                renderGoals();
            });

            goalsList.appendChild(goalItem);
        });
        updateProgress();
    }

    function addGoal() {
        const text = goalInput.value.trim();
        if (text) {
            goals.push({ text: text, completed: false });
            goalInput.value = '';
            saveGoals();
            renderGoals();
        }
    }

    addGoalBtn.addEventListener('click', addGoal);
    goalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addGoal();
    });

    // Initial render
    renderGoals();
}

dailyGoals();
