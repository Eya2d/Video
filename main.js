// main.js

// استخراج اسم الفيديو من الرابط
function getVideoName(url) {
    const fileName = url.split('/').pop();
    const nameWithoutExt = fileName.replace('.mp4', '');
    return nameWithoutExt;
}

// استخراج رابط الصورة المصغرة (للمثال نستخدم خدمة خارجية، لكن يمكن تعديلها حسب احتياجك)
// ملاحظة: استخراج صورة حقيقية من ملف MP4 يحتاج إلى معالجة من الخادم.
// هنا سنستخدم رابط وهمي مع اسم الفيديو، أو يمكنك رفع صورة لكل فيديو.
function getThumbnailUrl(videoUrl, videoName) {
    // في التطبيق الحقيقي، يمكن استدعاء API لاستخراج لقطة من الفيديو.
    // لكن للعرض: سنستخدم خدمة placeholder أو صورة افتراضية.
    return `https://img.youtube.com/vi/${btoa(videoName)}/0.jpg`; // مجرد مثال توضيحي
    // الحل الأفضل: استخدام واجهة خلفية تقوم باستخراج الإطار الأول من الفيديو.
    // لكن هنا سنعرض صورة افتراضية.
}

// عرض الفيديوهات في الصفحة الرئيسية
function displayVideos(videos) {
    const videosContainer = document.getElementById('videosContainer');
    if (!videosContainer) return;
    
    videosContainer.innerHTML = '';
    
    videos.forEach(video => {
        const videoName = getVideoName(video.url);
        const thumbnailUrl = getThumbnailUrl(video.url, videoName);
        
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.alt = videoName;
        img.loading = 'lazy';
        
        const title = document.createElement('h3');
        title.textContent = videoName;
        
        videoCard.appendChild(img);
        videoCard.appendChild(title);
        
        // عند النقر على البطاقة، نذهب لصفحة العرض مع تمرير الرابط
        videoCard.addEventListener('click', () => {
            window.location.href = `player.html?video=${encodeURIComponent(video.url)}`;
        });
        
        videosContainer.appendChild(videoCard);
    });
}

// فلترة الفيديوهات حسب البحث
function filterVideos(searchTerm) {
    const filtered = videosData.filter(video => {
        const name = getVideoName(video.url);
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    displayVideos(filtered);
}

// تهيئة الصفحة الرئيسية
function initHomePage() {
    displayVideos(videosData);
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterVideos(e.target.value);
        });
    }
}

// تهيئة صفحة المشغل
function initPlayerPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const shareLinkInput = document.getElementById('shareLink');
    const copyBtn = document.getElementById('copyBtn');
    
    if (!videoUrl) {
        document.body.innerHTML = '<h1>خطأ: لم يتم تحديد فيديو</h1><a href="index.html">العودة للرئيسية</a>';
        return;
    }
    
    const videoName = getVideoName(videoUrl);
    
    if (videoPlayer) {
        videoPlayer.src = videoUrl;
        videoPlayer.controls = true;
    }
    
    if (videoTitle) {
        videoTitle.textContent = videoName;
    }
    
    // عرض رابط المشاركة (الرابط الحالي)
    if (shareLinkInput) {
        shareLinkInput.value = window.location.href;
    }
    
    // نسخ الرابط
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            shareLinkInput.select();
            document.execCommand('copy');
            alert('تم نسخ الرابط بنجاح!');
        });
    }
}

// تشغيل التهيئة المناسبة حسب الصفحة
if (document.getElementById('videosContainer')) {
    initHomePage();
} else if (document.getElementById('videoPlayer')) {
    initPlayerPage();
}
