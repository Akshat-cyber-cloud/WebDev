const prm = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
        // reject();
    }, 3000);
})

prm.then(function () {          // If Successful
    console.log("HEYHEYHEY");
})

prm.catch(function () {        // otherwise this
    console.log("SHIIIIT");
})


// async await

function getNum() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.floor(Math.random * 10);
            if (num < 5) {
                resolve(ttrue);
            } else {
                reject(false);
            }
        },3000)
    });
}

async function abcd() {
    let c = await getNum();
    console.log(c);
}