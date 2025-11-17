var btn  = document.querySelector('button');
var main = document.querySelector('main');

var arr = ["Stay hungry, stay foolish.", "Trust the process.", "Dream big. Start small.", "Focus on the good.", "Make it happen.", "Small steps matter.", "Do it with passion."];

btn.addEventListener('click', function(){
    // var div = document.createElement('div');

    // var x = Math.random() * 100;
    // var y = Math.random() * 100;
    // var a = Math.floor(Math.random() * 256);
    // var b = Math.floor(Math.random() * 256);
    // var c = Math.floor(Math.random() * 256);
    // var r = Math.floor(Math.random()* 360);

    // div.style.height = '50px'
    // div.style.width = '50px'
    // div.style.position = 'absolute'
    // div.style.left = x+'%';
    // div.style.top = y + '%';
    // div.style.rotate = r + 'deg';
    // div.style.backgroundColor = `rgb(${a}, ${b}, ${c})`

    // main.appendChild(div)

    // console.log(div);

    var h1 = document.createElement('h1');
    var x = Math.random() * 100;
    var y = Math.random() * 100;
    var r = Math.floor(Math.random()* 360);

    var a = Math.floor(Math.random() * arr.length)

    h1.innerHTML = arr[a];
    h1.style.position = 'absolute'
    h1.style.left = x +'%';
    h1.style.top = y +'%';
    h1.style.rotate = r +'deg';

    main.appendChild(h1);
})