var reels = [
    {
        user: "Sarah",
        dp: "https://i.pravatar.cc/150?img=11",
        caption: "Exploring the beauty of life ✨",
        video: 'Videos/1.mp4'
    },
    {
        user: "Rohit",
        dp: "https://i.pravatar.cc/150?img=15",
        caption: "Chasing sunsets 🌅",
        video: "Videos/2.mp4"
    },
    {
        user: "Emily",
        dp: "https://i.pravatar.cc/150?img=32",
        caption: "A day in my aesthetic world 🌸",
        video: "Videos/3.mp4"
    },
    {
        user: "David",
        dp: "https://i.pravatar.cc/150?img=55",
        caption: "Coding + Coffee ☕",
        video: "Videos/4.mp4"
    },
    {
        user: "Aarav",
        dp: "https://i.pravatar.cc/150?img=47",
        caption: "Roadtrip diaries 🚗",
        video: "Videos/5.mp4"
    },
    {
        user: "Meera",
        dp: "https://i.pravatar.cc/150?img=60",
        caption: "Vibes only ✨",
        video: "Videos/6.mp4"
    }
];

function renderReels() {
    let html = "";

    reels.forEach(r => {
        html += `
        <div class="reel">
            <video src="${r.video}" autoplay loop muted></video>
            <div class="bottom">
                <div class="user">
                    <img src="${r.dp}">
                    <h2>${r.user}</h2>
                    <button>Follow</button>
                </div>
                <h3>${r.caption}</h3>
            </div>

            <div class="right">
                <div><i class="ri-heart-line"></i><h6>120</h6></div>
                <div><i class="ri-message-line"></i><h6>40</h6></div>
                <div><i class="ri-send-plane-fill"></i><h6>10</h6></div>
                <div><i class="ri-more-2-line"></i></div>
            </div>
        </div>`;
    });

    document.querySelector(".allreels").innerHTML = html;
}

renderReels();
