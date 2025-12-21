const menu = document.getElementById("contextMenu");

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.style.display = "block";
    menu.style.left = `${e.pageX}px`;
    menu.style.right = `${e.pageY}px`;
});

document.addEventListener('click', () => {
    menu.style.display = "none";
})

fullBtn.addEventListener('click', () => {
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        document.exitFullscreen();
    }
})
