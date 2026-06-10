let posts = JSON.parse(localStorage.getItem("posts")) || [];

document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});

function createPost() {

    let username =
        document.getElementById("username").value.trim();

    let input =
        document.getElementById("postInput");

    let text = input.value.trim();

    if(username === ""){
        alert("Please enter your name!");
        return;
    }

    if(text === ""){
        alert("Please write something!");
        return;
    }

    posts.unshift({
        user: username,
        text: text,
        likes: 0,
        time: new Date().toLocaleString()
    });

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    document.getElementById("username").value = "";
    document.getElementById("postInput").value = "";

    loadPosts();
}

function loadPosts() {

    let container =
        document.getElementById("posts");

    container.innerHTML = "";

    posts.forEach((post, index) => {

        let div = document.createElement("div");

        div.classList.add("post");

        div.innerHTML = `
            <h3>${post.user}</h3>

            <small>${post.time}</small>

            <p>${post.text}</p>

            <button onclick="likePost(${index})">
                ❤️ ${post.likes}
            </button>

            <button onclick="deletePost(${index})">
                🗑️ Delete
            </button>
        `;

        container.appendChild(div);
    });
}

function likePost(index) {

    posts[index].likes++;

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    loadPosts();
}

function deletePost(index) {

    posts.splice(index, 1);

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    loadPosts();
}