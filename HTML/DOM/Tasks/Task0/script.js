var h2 = document.querySelector('h2');

var inc = document.getElementById('inc');
var reset = document.getElementById('reset');
var dec = document.getElementById('dec');

var val = 0;

inc.addEventListener('click',function(){
    val++;
    h2.innerHTML = val;
})

dec.addEventListener('click',function(){
    if(val > 0){
        val--;
    }
    h2.innerHTML = val;
})

reset.addEventListener('click', function(){
    val = 0;
    h2.innerHTML = val;
})
