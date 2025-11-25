// var user = 'Aks';

// var btn = document.querySelector('button');
// var h1 = document.querySelector('h1');

// btn.addEventListener('click', function(){
//     setTimeout(function(){
//         h1.innerHTML = `Hello I am ${user}`;
//     },2000)
// })



// var a = 1;

// var int  = setInterval(function(){
//     console.log(a++);
// },1000)


// setTimeout(() => {
//     clearInterval(int);
// },5000)

var grow = 0;
var btn = document.querySelector('button');
var h2 = document.querySelector('h2');
var inner = document.querySelector('.inner');

btn.addEventListener('click', function(){
    btn.style.pointerEvents = 'none'

    var int = setInterval(() => {
        grow++;
        h2.innerHTML = `${grow} %`;
        inner.style.width = grow + '%'
    },30);

    setTimeout(() => {
        clearInterval(int);
        btn.innerHTML = 'Downloaded'
        btn.style.opacity = 0.5
    },3000);
})
