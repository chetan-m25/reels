const reels = [
  {
    isMuted: true,
    username: "travel_with_arya",
    likeCount: 8657,
    isLiked: false,
    commentCount: 45,
    caption: "Vibes that last forever! ✨",
    video: "./reels/video1.mp4",
    shareCount: 12,
    isFollowed: true,
    userprofile: "https://images.pexels.com/photos/5916087/pexels-photo-5916087.jpeg"
  },
  {
    isMuted: false,
    username: "fashion_wave",
    likeCount: 6894,
    isLiked: true,
    commentCount: 33,
    caption: "Unforgettable moments! 😍",
    video: "./reels/video2.mp4",
    shareCount: 20,
    isFollowed: false,
    userprofile: "https://images.pexels.com/photos/3310422/pexels-photo-3310422.jpeg"
  },
  {
    isMuted: false,
    username: "tech_byte",
    likeCount: 5900,
    isLiked: false,
    commentCount: 78,
    caption: "Moments that take your breath away! 🌄",
    video: "./reels/video3.mp4",
    shareCount: 40,
    isFollowed: true,
    userprofile: "https://images.pexels.com/photos/5240546/pexels-photo-5240546.jpeg"
  },
  {
    isMuted: false,
    username: "nature_focus",
    likeCount: 9239,
    isLiked: true,
    commentCount: 510,
    caption: "Always saying yes to new adventures!",
    video: "./reels/video4.mp4",
    shareCount: 120,
    isFollowed: false,
    userprofile: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg"
  },
  {
    isMuted: false,
    username: "dance_fever",
    likeCount: 7492,
    isLiked: false,
    commentCount: 140,
    caption: "No Excuses! 💃🕺",
    video: "./reels/video5.mp4",
    shareCount: 55,
    isFollowed: false,
    userprofile: "https://images.pexels.com/photos/1450116/pexels-photo-1450116.jpeg"
  },
  {
    isMuted: false,
    username: "foodie_crush",
    likeCount: 8120,
    isLiked: false,
    commentCount: 98,
    caption: "Flavors that hit different 😋🔥",
    video: "./reels/video6.mp4",
    shareCount: 34,
    isFollowed: true,
    userprofile: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
  },
  {
    isMuted: false,
    username: "urban_rider",
    likeCount: 10543,
    isLiked: true,
    commentCount: 210,
    caption: "Speed + Freedom = Bliss 🏍️",
    video: "./reels/video7.mp4",
    shareCount: 67,
    isFollowed: false,
    userprofile: "https://images.pexels.com/photos/1769353/pexels-photo-1769353.jpeg"
  },
  {
    isMuted: false,
    username: "cinematic_view",
    likeCount: 9990,
    isLiked: false,
    commentCount: 320,
    caption: "Feels like a movie 🎬",
    video: "./reels/video8.mp4",
    shareCount: 76,
    isFollowed: true,
    userprofile: "https://images.pexels.com/photos/7135201/pexels-photo-7135201.jpeg"
  },
  {
    isMuted: false,
    username: "pet_paradise",
    likeCount: 13789,
    isLiked: true,
    commentCount: 402,
    caption: "Too cute to handle 🐶❤️",
    video: "./reels/video9.mp4",
    shareCount: 90,
    isFollowed: false,
    userprofile: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg"
  },
  {
    isMuted: false,
    username: "dance_hub",
    likeCount: 6548,
    isLiked: false,
    commentCount: 187,
    caption: "Dance like nobody's watching!",
    video: "./reels/video10.mp4",
    shareCount: 29,
    isFollowed: true,
    userprofile: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
  },
];

const allReels = document.querySelector('.all-reels')
let observer = null

// Store references to elements for quick updates
const refs = {
  reelsEls: [],       // .reel element
  videos: [],         // video elements
  muteBtns: [],       // mute container elements
  likeContainers: [], // like containers (for id & icon)
  likeCounts: [],     // like count <h6>
  followBtns: [],     // follow buttons
  playOverlays: []    // overlay elements for play/pause feedback
}

function createSingleReel(elem, idx) {
  const reel = document.createElement('div')
  reel.className = 'reel'
  reel.dataset.idx = idx

  const video = document.createElement('video')
  video.autoplay = true
  video.loop = true
  video.src = elem.video || ''
  video.muted = !!elem.isMuted
  video.playsInline = true         // mobile friendly
  video.preload = 'metadata'      // minimal preloading

  // Play/pause overlay (briefly shown when user toggles)
  const playOverlay = document.createElement('div')
  playOverlay.className = 'play-overlay'
  playOverlay.style.pointerEvents = 'none'
  playOverlay.style.zIndex = '9'
  playOverlay.innerHTML = '<i class="ri-play-circle-line" style="font-size:72px;color:rgba(255,255,255,0.95)"></i>'

  const mute = document.createElement('div')
  mute.className = 'mute'
  mute.id = idx
  mute.innerHTML = elem.isMuted ? '<i class="ri-volume-mute-fill"></i>' : '<i class="ri-volume-up-line"></i>'

  const bottom = document.createElement('div')
  bottom.className = 'bottom'
  bottom.innerHTML = `
    <div class="user">
      <img src="${elem.userprofile}" alt="">
      <h4>${elem.username}</h4>
      <button id="${idx}" class="follow">${elem.isFollowed ? 'Unfollow' : 'Follow'}</button>
    </div>
    <h3>${elem.caption}</h3>
  `

  const right = document.createElement('div')
  right.className = 'right'
  right.innerHTML = `
    <div id="${idx}" class="like">
      <h4 class="like-icon">${elem.isLiked ? '<i class="love ri-heart-3-fill"></i>' : '<i class="ri-heart-3-line"></i>'}</h4>
      <h6>${elem.likeCount}</h6>
    </div>
    <div class="comment">
      <h4 class="comment-icon"><i class="ri-chat-3-line"></i></h4>
      <h6>${elem.commentCount}</h6>
    </div>
    <div class="share">
      <h4 class="share-icon"><i class="ri-share-forward-line"></i></h4>
      <h6>${elem.shareCount}</h6>
    </div>
    <div class="menu">
      <h4 class="menu-icon"><i class="ri-more-2-fill"></i></h4>
    </div>
  `

  // Append in the same order (video first)
  reel.appendChild(video)
  reel.appendChild(playOverlay)
  reel.appendChild(mute)
  reel.appendChild(bottom)
  reel.appendChild(right)

  // Save refs
  refs.reelsEls[idx] = reel
  refs.videos[idx] = video
  refs.muteBtns[idx] = mute
  refs.likeContainers[idx] = right.querySelector('.like')
  refs.likeCounts[idx] = refs.likeContainers[idx].querySelector('h6')
  refs.followBtns[idx] = bottom.querySelector('.follow')
  refs.playOverlays[idx] = playOverlay

  // Play/pause on tap (like reels/shorts)
  video.addEventListener('click', (ev) => {
    // toggle play / pause
    if (video.paused) {
      video.play().catch(() => { /* ignore play errors */ })
      // show pause icon briefly
      playOverlay.innerHTML = '<i class="ri-pause-circle-line" style="font-size:72px;color:rgba(255,255,255,0.95)"></i>'
      playOverlay.classList.add('show')
      setTimeout(()=> playOverlay.classList.remove('show'), 380)
    } else {
      video.pause()
      // show play icon briefly
      playOverlay.innerHTML = '<i class="ri-play-circle-line" style="font-size:72px;color:rgba(255,255,255,0.95)"></i>'
      playOverlay.classList.add('show')
      setTimeout(()=> playOverlay.classList.remove('show'), 380)
    }
  })

  // When a video starts playing because of observer, hide overlay
  video.addEventListener('play', () => {
    playOverlay.classList.remove('show')
  })

  // When video is paused by observer, show tiny play hint (optional)
  video.addEventListener('pause', () => {
    // no persistent overlay — leave it hidden, user can tap to show
    playOverlay.classList.remove('show')
  })

  return reel
}

// Render once
function renderAllOnce() {
  const fragment = document.createDocumentFragment()
  reels.forEach((r, i) => {
    const reelEl = createSingleReel(r, i)
    fragment.appendChild(reelEl)
  })
  allReels.appendChild(fragment)
  initObserver()
}

renderAllOnce()

/* Event handling (delegated) - updates model and specific DOM nodes only */
allReels.addEventListener('click', (e) => {
  // like (clicked anywhere inside .like)
  const likeEl = e.target.closest('.like')
  if (likeEl) {
    const idx = Number(likeEl.id)
    if (!reels[idx].isLiked) {
      reels[idx].likeCount++
      reels[idx].isLiked = true
    } else {
      reels[idx].likeCount--
      reels[idx].isLiked = false
    }
    // Update only the like icon and count
    const iconContainer = likeEl.querySelector('.like-icon')
    iconContainer.innerHTML = reels[idx].isLiked ? '<i class="love ri-heart-3-fill"></i>' : '<i class="ri-heart-3-line"></i>'
    const countNode = likeEl.querySelector('h6')
    countNode.textContent = reels[idx].likeCount
    return
  }

  // follow button
  const followEl = e.target.closest('.follow')
  if (followEl) {
    const idx = Number(followEl.id)
    reels[idx].isFollowed = !reels[idx].isFollowed
    // Update button text only
    refs.followBtns[idx].textContent = reels[idx].isFollowed ? 'Unfollow' : 'Follow'
    return
  }

  // mute toggle
  const muteEl = e.target.closest('.mute')
  if (muteEl) {
    const idx = Number(muteEl.id)
    reels[idx].isMuted = !reels[idx].isMuted
    // Update mute icon and video's muted property
    refs.muteBtns[idx].innerHTML = reels[idx].isMuted ? '<i class="ri-volume-mute-fill"></i>' : '<i class="ri-volume-up-line"></i>'
    refs.videos[idx].muted = !!reels[idx].isMuted
    return
  }
})

/* ---------------------------
  IntersectionObserver logic (single init)
  - plays the most-visible reel
  - sets muted based on model
  - pauses & mutes others
----------------------------*/
function initObserver() {
  if (observer) observer.disconnect()

  const reelEls = document.querySelectorAll('.reel')
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.5, 0.75, 1.0]
  }

  observer = new IntersectionObserver((entries) => {
    let visible = entries.filter(e => e.isIntersecting)
    if (visible.length === 0) {
      // none visible -> mute & pause all
      refs.videos.forEach((v, i) => {
        v.pause()
        v.muted = true
        // ensure overlay hidden
        refs.playOverlays[i] && refs.playOverlays[i].classList.remove('show')
      })
      return
    }

    visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    const topEntry = visible[0]
    const topIdx = Number(topEntry.target.dataset.idx)

    refs.videos.forEach((vid, i) => {
      if (i === topIdx) {
        vid.play().catch(()=>{})
        // follow model: if model says isMuted true -> keep muted, else unmute
        vid.muted = !!reels[topIdx].isMuted
        // hide overlay when playing
        refs.playOverlays[i] && refs.playOverlays[i].classList.remove('show')
      } else {
        vid.pause()
        vid.muted = true
        // hide overlay for non-active reels
        refs.playOverlays[i] && refs.playOverlays[i].classList.remove('show')
      }
    })
  }, options)

  reelEls.forEach(el => observer.observe(el))
}
