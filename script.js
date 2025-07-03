const videos = [
  { title: "hnalpha2", file: "media/hnalpha2.mp4" }
];

const videoListEl = document.getElementById("videoList");
const videoPlayer = document.getElementById("videoPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
let currentIndex = -1;
let isPlaying = false;

function loadVideoList() {
  videoListEl.innerHTML = "";
  videos.forEach((vid, idx) => {
    const li = document.createElement("li");
    li.textContent = vid.title;
    li.dataset.index = idx;
    li.addEventListener("click", () => selectVideo(idx));
    videoListEl.appendChild(li);
  });
}

function updateActiveVideo() {
  [...videoListEl.children].forEach(li => li.classList.remove("active"));
  if (currentIndex >= 0) videoListEl.children[currentIndex].classList.add("active");
}

function scrollToActive() {
  const activeLi = videoListEl.querySelector("li.active");
  if (activeLi) {
    activeLi.scrollIntoView({ behavior: "smooth", inline: "center" });
  }
}

function selectVideo(index) {
  if (index === currentIndex) return;
  currentIndex = index;
  const vid = videos[index];
  videoPlayer.src = vid.file;
  videoPlayer.play();
  isPlaying = true;
  updateActiveVideo();
  scrollToActive();
  playPauseBtn.textContent = "⏸️";
}

function togglePlayPause() {
  if (currentIndex === -1) return;
  if (isPlaying) {
    videoPlayer.pause();
    playPauseBtn.textContent = "▶️";
  } else {
    videoPlayer.play();
    playPauseBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}

playPauseBtn.addEventListener("click", togglePlayPause);

loadVideoList();
videoPlayer.addEventListener("ended", () => {
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
});