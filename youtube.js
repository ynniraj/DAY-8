
const displayData = document.getElementById("displayData");
searchVideo();
async function searchVideo() {
    try {
        let video_query = document.getElementById("video").value;
        let response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=${video_query}&regionCode=IN&type=video&type=channel&key=AIzaSyCK-xjDI99YafTQ38KLncrvEaRz-m3Wjas`
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
    videos.forEach(({ snippet, id: { videoId } }) => {
        // let {
        //   id: { videoId },
        // } = elem;
        console.log(snippet);
        //let v_Id = elem.id.videoId;
        let div = document.createElement("div");

        // let iframe = document.createElement("iframe");
        // iframe.src = `https://www.youtube.com/embed/${videoId}`;
        // iframe.height = "200";
        // iframe.width = "400";
        // iframe.setAttribute("allowfullscreen", "true");
        //  console.log(videoId);
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

        div.onclick = () => {
            showVideo(dataSend);
        };

        div.append(thub, title, channelname);
        displayData.append(div);
    });
};

function showVideo(data) {
    localStorage.setItem("youtubeVideo", JSON.stringify(data));
    window.location.href = "video.html";
}
