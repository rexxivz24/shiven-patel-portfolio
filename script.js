// Navigation drawer
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}

// YouTube page: edit this list to add your own videos.
// Replace videoId with the ID from a YouTube URL (the part after v=).
const videos = [
  { videoId: 'NiYtQ4LGhMg', title: 'The Science of Luck', description: 'How To Get Lucky Fast.' },
  { videoId: '37ONaBYDrxI', title: '5 Skills to get rich online -2025', description: 'Skill One NEED.' },
  { videoId: '7_9oPbBAshY', title: 'How To Actually Be Disciplined (Consistently)', description: 'unproductive life and how to overcame it just by a reward and self discipline.' },
  { videoId: 'F5h5DYMpduc', title: '7 Productivity HACKS That Changed my Life', description: 'shape your life and grow in better way.' },
  { videoId: 'RYQVqYb89kM', title: 'This Circle Changed My Life', description: ' The circle of life which includes 3 different major cores of well-being.' },
];
const ytList = document.getElementById('ytList');
const ytPlayer = document.getElementById('ytPlayer');
const ytTitle = document.getElementById('ytTitle');
const ytDescription = document.getElementById('ytDescription');
if (ytList && ytPlayer && ytTitle && ytDescription) {
  ytList.innerHTML = videos.map((video, index) => `
    <article class="yt-item ${index === 0 ? 'active' : ''}" data-index="${index}" tabindex="0" role="button" aria-label="Play ${video.title}">
      <div class="yt-thumb"><img src="https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg" alt="Thumbnail for ${video.title}"></div>
      <div><h3>${video.title}</h3><p>Shiven · Video</p></div>
    </article>`).join('');
  ytList.querySelectorAll('.yt-item').forEach(item => {
    const choose = () => {
      const video = videos[Number(item.dataset.index)];
      ytPlayer.src = `https://www.youtube.com/embed/${video.videoId}?rel=0`;
      ytTitle.textContent = video.title;
      ytDescription.textContent = video.description;
      ytList.querySelectorAll('.yt-item').forEach(row => row.classList.remove('active'));
      item.classList.add('active');
      if (window.innerWidth < 850) ytPlayer.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    item.addEventListener('click', choose);
    item.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(); }});
  });
}

// Reveal subtle page elements as they enter the viewport.
const revealCandidates = document.querySelectorAll('.venture-card, .project-row, .now-item, .gallery-grid .photo-slot');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('seen'); revealObserver.unobserve(entry.target); }
  }), {threshold: 0.12});
  revealCandidates.forEach(element => revealObserver.observe(element));
}
