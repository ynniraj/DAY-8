const displayData = document.getElementById("displayData");
searchVideo();
async function searchVideo() {
    try {
        let video_query = document.getElementById("video").value;
        let response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyCnuOGuunVmorG5VpeEKXK2nufzxpMqyjI&part=snippet&maxResults=10&part=statistics`
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
    displayData.innerHTML = null;
    videos.forEach(({ snippet, statistics, id: { videoId } }) => {
        // let {
        //   id: { videoId },
        // } = elem;
        console.log(snippet);
        console.log(statistics);
        //let v_Id = elem.id.videoId;
        let div = document.createElement("div");
        div.setAttribute("class", "menu");

        let title = document.createElement("p");
        title.innerText = snippet.title;

        let div2 = document.createElement("div");
        let channelname = document.createElement("h5");
        channelname.innerText = snippet.channelTitle;
        let thub = document.createElement("img");
        thub.src = snippet.thumbnails.medium.url;

        let viewCount = document.createElement("p");
        viewCount.innerText = statistics.viewCount + "K" + " Views";
        let dataSend = {
            snippet,
            videoId,
        };

        div.onclick = () => {
            showVideo(dataSend);
        };
        div.append(thub, div2);
        div2.append(title, channelname, viewCount);
        displayData.append(div);
    });
};

function showVideo(data) {
    localStorage.setItem("youtubeVideo", JSON.stringify(data));
    window.location.href = "video.html";
}

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
    username.innerText = data.username;
    console.log(data);
}

document.addEventListener("DOMContentLoaded", () => {
    let recentImg = localStorage.getItem("recentImg");
    if (recentImg) {
        document.getElementById("imgPrev").setAttribute("src", recentImg);
        document.getElementById("imgPrev").style.width = "36%";
    }
});

document.querySelector(".logo").addEventListener("click", function () {
    window.location.href = "index.html";
});