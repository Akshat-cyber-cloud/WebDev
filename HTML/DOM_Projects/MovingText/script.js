const para = document.querySelector("p");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const text = para.innerText;
let interval;
let index = 0;

para.addEventListener("mouseenter", () => {
    clearInterval(interval);

    interval = setInterval(() => {
        const str = text.split('').map((char,i) => {
            if(i < index) return text[i];
            return characters.split("")[Math.floor(Math.random() * characters.length)]
        }).join("");

        para.innerText = str;
        index++;

        if(index > text.length) clearInterval(interval);
    }, 80);
});

para.addEventListener("mouseleave", () => {
    clearInterval(interval);
    para.innerText = text;
});
