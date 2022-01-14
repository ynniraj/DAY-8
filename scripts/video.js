let { videoId, snippet } = JSON.parse(localStorage.getItem("youtubeVideo"));

let videoDiv = document.getElementById("display");
function showData(data) {
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.height = "400";
    iframe.width = "100%";
    iframe.setAttribute("allowfullscreen", "true");
    console.log(snippet);

    let title = document.createElement("p");
    title.innerText = snippet.title;
    let publish = document.createElement("p");
    publish.innerText = snippet.publishTime;
    let channel = document.createElement("p");
    channel.innerText = snippet.channelTitle;
    let dec = document.createElement("p");
    dec.innerText = snippet.description;
    var hr = document.createElement("hr");
    hr.setAttribute("class", "hr");

    var iconsVid = document.createElement("div");
    iconsVid.setAttribute("class", "iconsVid");

    var like = document.createElement("span");
    like.innerHTML = `<i class="far fa-thumbs-up"></i>Like`;
    var dislike = document.createElement("span");
    dislike.innerHTML = `<i class="far fa-thumbs-down"></i>Dislike`;
    var share = document.createElement("span");
    share.innerHTML = `<i class="fas fa-share"></i>Share`;
    var more = document.createElement("span");
    more.innerHTML = `<i class="fas fa-ellipsis-h"></i>More`;

    iconsVid.append(like, dislike, share, more);
    videoDiv.append(iframe, title, publish, channel, iconsVid, hr, dec);
}

showData();

const recc = document.getElementById("recc");
async function searchVideo() {
    try {
        let video_query = document.getElementById("video").value;
        let response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${snippet.title}&regionCode=IN&type=video&type=channel&key=AIzaSyCnuOGuunVmorG5VpeEKXK2nufzxpMqyjI`
        );

        let data = await response.json();

        let videos = data.items;
        appendVideos(videos);
        console.log(videos);
    } catch (er) {
        console.log("er:", er);
    }
}

const appendVideos = (videos) => {
    recc.innerHTML = null;
    videos.forEach(({ snippet }) => {
        console.log(snippet);

        let div = document.createElement("div");
        div.setAttribute("class", "rightnav");
        let div2 = document.createElement("div");

        let title = document.createElement("p");
        title.innerText = snippet.title;
        let channelname = document.createElement("h5");
        channelname.innerText = snippet.channelTitle;
        let thub = document.createElement("img");
        thub.src = snippet.thumbnails.medium.url;

        let dataSend = {
            snippet,
            videoId,
        };

        div2.append(title, channelname);
        div.append(thub, div2);
        recc.append(div);
    });
};
searchVideo();

document.querySelector(".logo").addEventListener("click", function () {
    window.location.href = "index.html"
})


let loginDatas = JSON.parse(localStorage.getItem("userData"));
if (loginDatas != null) {
    getUser();
}
async function getUser() {
    let api = `https://masai-api-mocker.herokuapp.com/user/${loginDatas.username}`;

    let response = await fetch(api, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginDatas.token}`,
        },
    });
    let data = await response.json();
    let appendUser = document.getElementById("username");
    username.innerText = data.username
    console.log(data);
}


document.addEventListener("DOMContentLoaded", () => {
    let recentImg = localStorage.getItem("recentImg")
    if (recentImg) {
        document.getElementById("imgPrev").setAttribute("src", recentImg)
        document.getElementById("imgPrev").style.width = "700%"
    }
})