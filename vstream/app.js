const videoCard = document.querySelector(".video");

let api_key = "AIzaSyD_A5kH-caZOsfC6HHP_VPbhpdHBSDBMt4";
let video_list = "https://www.googleapis.com/youtube/v3/videos?";
let channel_icon = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_list + new URLSearchParams({
  key: api_key,
  part: 'snippet',
  chart: 'mostPopular',
  maxResults: 200,
  regionCode: 'LK'
}))
.then(res => res.json())
.then(data => {
  data.items.forEach(item => {
    getChannelIcon(item);
  })

}).catch(err => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(channel_icon + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    id: video_data.snippet.channelId
  }))
  .then(res => res.json())
  .then(data => {
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
  })
}

const makeVideoCard = (data) => {
  videoCard.innerHTML += `
  <div class="card" onclick="location.href='https://www.youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" alt="img" class="img" width="300px" height="250px">
      <div class="content">
        <img src="${data.channelThumbnail}" alt="img" class="img-icon" width="60px" height="60px">
        <div class="description">
          <p>${data.snippet.title}</p>
          <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
      </div>
    </div>
  `;
}

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
  if(searchInput.value.length){
    location.href = searchLink + searchInput.value;
  }
});