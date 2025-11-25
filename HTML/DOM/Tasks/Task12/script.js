const images = [
    "https://picsum.photos/600/300?1",
    "https://picsum.photos/600/300?2",
    "https://picsum.photos/600/300?3",
    "https://picsum.photos/600/300?4"
];

let index = 0;

const slide = document.getElementById("slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function updateImage(){
    slide.src = images[index];
}

next.addEventListener('click',function(){
    index = (index + 1) % images.length;
    updateImage();
})

prev.addEventListener('click',function(){
    index = (index - 1 + images.length) % images.length;
    updateImage();
})