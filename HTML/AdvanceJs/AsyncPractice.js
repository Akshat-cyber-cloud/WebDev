function getUser(username, cb){
    console.log("1st Step")
    setTimeout(() => {
        cb({id: 1, username: "Akshat"});
    }, 1000)
}

function getUserPosts(userId, cb){
    console.log("2nd Step")
    setTimeout(() => {
        cb(["Post A", "Post B", "Post C"]);
    }, 1000)
}

function getPostComment(post, cb){
    console.log("3rd Step")
    setTimeout(() => {
        cb(["Nice!", "Great"]);
    }, 1000)
}


getUser("Akshat", function(user){
    console.log("User: ", user.username);

    getUserPosts(user.id, function (posts){
        console.log("Posts: ", posts);

        const firstPost = posts[0];

        getPostComment(firstPost, function(comments){
            console.log("Comments are: ", comments);
        })
    })
})