// var aud = new Audio('./31.mp3')

// document.addEventListener('keydown', function(e){
//     if(e.code === 'KeyD'){
//         aud.currentTime = 0;
//         aud.play();
//     }
// })



document.addEventListener("keydown", function(e){
    let key = e.key.toUpperCase();

    let sounds = {
        A: "A.mp3",
        S: "S.mp3",
        D: "D.mp3",
        F: "F.mp3",
        G: "G.mp3",
        H: "H.mp3",
        J: "J.mp3",
        K: "K.mp3",
        L: "L.mp3"
    };

    if(sounds[key]){
        let audio = new Audio(sounds[key]);
        // audio.currentTime = 0;
        audio.play();
    }
});
