// استخراج اسم الفيديو من الرابط
function getVideoName(url) {
  return url.split("/").pop().split(".")[0];
}

// استخراج صورة مصغرة من الفيديو
function generateThumbnail(videoUrl) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = 1;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 180;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/png"));
    });
  });
}

// عرض الفيديوهات
async function renderVideos(list) {
  const container = document.getElementById("videos");
  container.innerHTML = "";

  for (let vid of list) {
    const name = getVideoName(vid.url);
    const thumb = await generateThumbnail(vid.url);

    const div = document.createElement("div");
    div.className = "video-card";

    div.innerHTML = `
      <img src="${thumb}">
      <p>${name}</p>
    `;

    div.onclick = () => {
      window.location.href = `watch.html?video=${encodeURIComponent(vid.url)}`;
    };

    container.appendChild(div);
  }
}

// البحث
function setupSearch() {
  const input = document.getElementById("search");

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();

    const filtered = videos.filter(v =>
      getVideoName(v.url).toLowerCase().includes(value)
    );

    renderVideos(filtered);
  });
}

// تشغيل الفيديو في صفحة المشاهدة
function loadVideoPlayer() {
  const params = new URLSearchParams(window.location.search);
  const videoUrl = params.get("video");

  if (videoUrl) {
    const video = document.getElementById("player");
    const link = document.getElementById("videoLink");

    video.src = videoUrl;
    link.value = window.location.href;
  }
}

// تشغيل حسب الصفحة
if (document.getElementById("videos")) {
  renderVideos(videos);
  setupSearch();
}

if (document.getElementById("player")) {
  loadVideoPlayer();
}