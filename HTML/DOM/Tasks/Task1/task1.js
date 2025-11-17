var h2 = document.querySelector('h2');
var btn = document.querySelector('#btn1');
var flag = 0;

btn.addEventListener("click",function(){
    if(flag == 0){
        h2.innerHTML = 'U dont have keys';
        btn.innerHTML = 'Get Keys'
        flag = 1;
    }else{
        h2.innerHTML = 'Wnna Ride?';
        btn.innerHTML = 'Lets Ride'
        flag = 0;
    }
})