var arr = [
    {
        dp: "https://plus.unsplash.com/premium_photo-1757322537445-892532434841?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",story : "https://images.unsplash.com/photo-1762803842029-5e34663d98be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        dp: "https://images.unsplash.com/photo-1762803841011-e42a172fc0ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story: "https://images.unsplash.com/photo-1619602505331-3e800a88db31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        dp: "https://images.unsplash.com/photo-1762421670361-974d54d7b5c3?q=80&w=2004&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story: "https://images.unsplash.com/photo-1762893021980-b6accb9b94d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        dp: "https://images.unsplash.com/photo-1762526212509-e8fff5e86c33?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story: "https://images.unsplash.com/photo-1652079129755-97b606e144ad?q=80&w=747&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

var storiyan = document.querySelector('#stories')
var clutter = "";
arr.forEach(function(elem, index){
    clutter += `
    <div class="story">
    <img id = "${index}"  src = "${elem.dp}" alt = ""> 
    </div>`;
})
storiyan.innerHTML = clutter;

storiyan.addEventListener("click", function(dets){
    // console.log(arr[dets.target.id].story);
    document.querySelector('#full-screen').style.display = "block";
    document.querySelector('#full-screen').style.backgroundImage = 
    `url(${arr[dets.target.id].story})`

    setTimeout(function(){
        document.querySelector('#full-screen').style.display = "none";
    }, 2000)
});