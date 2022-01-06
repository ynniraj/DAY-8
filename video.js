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
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=${snippet.title}&regionCode=IN&type=video&type=channel&key=AIzaSyCK-xjDI99YafTQ38KLncrvEaRz-m3Wjas`
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
    videos.forEach(({ snippet, id: { videoId } }) => {
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

document.getElementById("img").addEventListener("click", function () {
    window.location.href = "youtube.html"
})