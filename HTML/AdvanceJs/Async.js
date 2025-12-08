// Callback Hell

function abcd(fn){
    fn(function(fn2){
        fn2(function(fn3){
            fn3();
        });
    });
}

abcd(function(fn1){
    fn1(function(fn2){
        fn2(function(){
            console.log("Hello")
        })
    });
})


// Practicacl Implemntation

function getMedicineFromStore(address, cb){
    setTimeout(() => {
        cb({lat: 4534, lang:3432 });
    }, 3000);
}

getMedicineFromStore("kamla nagar", function cb(details){
    console.log(details);
})


