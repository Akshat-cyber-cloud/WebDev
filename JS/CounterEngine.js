let min = 2;
let max = 7;

let count = min;
let direction = 1; // 1 - up & -1 down

setInterval(() => {
    count = count + direction;
    console.log(count);

    if(count === max){
        direction = -1;
    }

    if(count === min){
        direction = 1;
    }

},1000)