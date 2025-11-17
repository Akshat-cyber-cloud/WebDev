
var arr = [
    {
        team: 'Royal Challengers Bengaluru',
        captain: 'Virat Kohli',
        primary: 'red',
        secondry: 'grey',
        trophy: 0,
    },

    {
        team: 'Chennai Super Kings',
        captain: 'MS Dhonoi',
        primary: 'yellow',
        secondry: 'orange',
        trophy: 4,
        image: 'https://imgs.search.brave.com/W5jsHrnNi0ANVT0dT1omvB-HuukYmJGTOSVEZ48Gxbo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy82/MjdkMDdlYThhNjMy/Y2E5OTY0NzdlODEu/cG5n'
    },

    {
        team: 'Mumbai Indians',
        captain: 'Rohit Sharma',
        primary: 'blue',
        secondry: 'cyan',
        trophy: 3
    },

    {
        team: 'Kolkata Knight Riders',
        captain: 'Shreyas Iyer',
        primary: 'purple',
        secondry: 'gold',
        trophy: 0
    },

    {
        team: 'Rajasthan Royals',
        captain: 'Sanju Samson',
        primary: 'pink',
        secondry: 'blue',
        trophy: 2
    }
];

var box = document.querySelector('#box');
var box1 = document.querySelector('#box1');
var main = document.querySelector('main');

var btn = document.querySelector('#btn');

btn.addEventListener("click", function () {
    var store = Math.floor(Math.random() * arr.length);
    box.innerHTML = `${arr[store].team}`;
    box1.innerHTML = `Team won ${arr[store].trophy} Trophy`;
    main.style.background = `url(${arr[store].image})`
    main.style.backgroundSize = "cover";
    main.style.backgroundPosition = "center";
    main.style.backgroundRepeat = "no-repeat";
    box.style.backgroundColor = `${arr[store].secondry}`
})