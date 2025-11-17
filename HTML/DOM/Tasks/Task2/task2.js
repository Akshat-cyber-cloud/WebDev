
var box = document.querySelector('#box');
var btn = document.querySelector('#btn');

btn.addEventListener("click", function(){
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);

    box.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
})