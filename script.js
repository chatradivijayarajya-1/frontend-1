// Use global followers and closeFriends from data.js

const closeFriendUsernames = window.closeFriends.map(f => f.username);

function showNotCloseFriendPopup() {
  let popup = document.getElementById('notCloseFriendPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'notCloseFriendPopup';
    popup.className = 'explore-popup';
    popup.innerHTML = `
      <div class="explore-popup-content">
        <p>Only close friends can comment. You are not a close friend.</p>
        <button id="closeNotCFPopupBtn">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById('closeNotCFPopupBtn').onclick = () => popup.remove();
  }
}

// --- Feed Rendering ---
function renderFeed() {
  const feedSection = document.getElementById('feedSection');
  feedSection.innerHTML = '';

  // 1. Bhanu's post
  const bhanu = followers.find(f => f.username === 'bhanu');
  if (bhanu) {
    const isCloseFriend = closeFriendUsernames.includes(bhanu.username);
    const post = bhanu.posts[0];
    let likes = 1;
    const postDiv = document.createElement('div');
    postDiv.className = 'feed-post';
    postDiv.innerHTML = `
      <div class="feed-post-header">
        <img src="${bhanu.profilePic}" class="feed-post-profile-pic" alt="${bhanu.name}">
        <span class="feed-post-username">${bhanu.name}${isCloseFriend ? ' <span class=\'close-friend\'>★</span>' : ''}</span>
        <span class="feed-post-menu">...</span>
      </div>
      <div class="feed-post-image">
        <img src="${post.image}" alt="Post by ${bhanu.name}">
      </div>
      <div class="feed-post-actions">
        <span class="like-btn">♡</span> <span class="comment-action">💬</span> <span>✈️</span> <span style="float:right">🔖</span>
      </div>
      <div class="feed-post-info">
        <div class="feed-post-likes"><span class="like-count">${likes}</span> likes</div>
        <div class="feed-post-caption"><b>${bhanu.name}</b> ${post.caption}</div>
        <div class="feed-post-time">${post.time}</div>
      </div>
      <div class="feed-post-comments">
        <div class="comments-disabled">Comments are disabled for this post.</div>
      </div>
    `;
    // Like button logic
    let liked = false;
    const likeBtn = postDiv.querySelector('.like-btn');
    const likeCount = postDiv.querySelector('.like-count');
    likeBtn.onclick = function() {
      liked = !liked;
      likeBtn.textContent = liked ? '♥' : '♡';
      likeBtn.style.color = liked ? '#e1306c' : '';
      likeCount.textContent = liked ? likes + 1 : likes;
    };
    // Add popup on comment icon click (fix: use .comment-action if exists)
    const commentIcon = postDiv.querySelector('.comment-action');
    if (commentIcon) commentIcon.onclick = showNotCloseFriendPopup;
    if (!isCloseFriend) {
      const commentIcon = postDiv.querySelector('.comment-action');
      if (commentIcon) commentIcon.onclick = showNotCloseFriendPopup;
    }
    if (isCloseFriend) {
      postDiv.querySelector('.feed-post-add-comment').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input.value.trim()) {
          const commentDiv = document.createElement('div');
          commentDiv.innerHTML = `<b>meow</b> ${input.value}`;
          postDiv.querySelector('.feed-post-comments').appendChild(commentDiv);
          input.value = '';
        }
      });
    }
    feedSection.appendChild(postDiv);
  }

  // 2. Aria's post (highlight comment allowed)
  const aria = followers.find(f => f.username === 'aria');
  if (aria) {
    const isCloseFriend = closeFriendUsernames.includes(aria.username);
    const post = aria.posts[0];
    let likes = 2;
    const postDiv = document.createElement('div');
    postDiv.className = 'feed-post';
    postDiv.innerHTML = `
      <div class="feed-post-header">
        <img src="${aria.profilePic}" class="feed-post-profile-pic" alt="${aria.name}">
        <span class="feed-post-username">${aria.name}${isCloseFriend ? ' <span class=\'close-friend\'>★</span>' : ''}</span>
        <span class="feed-post-menu">...</span>
      </div>
      <div class="feed-post-image">
        <img src="${post.image}" alt="Post by ${aria.name}">
      </div>
      <div class="feed-post-actions">
        <span class="like-btn">♡</span> <span>💬</span> <span>✈️</span> <span style="float:right">🔖</span>
      </div>
      <div class="feed-post-info">
        <div class="feed-post-likes"><span class="like-count">${likes}</span> likes</div>
        <div class="feed-post-caption"><b>${aria.name}</b> ${post.caption}</div>
        <div class="feed-post-time">${post.time}</div>
        <div class="close-friend-highlight">You can comment because you are a close friend!</div>
      </div>
      <div class="feed-post-comments">
        <div><b>meow</b> Nice!</div><div><b>aruna</b> Love this!</div>
      </div>
      <form class="feed-post-add-comment"><input type="text" placeholder="Add a comment..." /><button type="submit">Post</button></form>
    `;
    // Like button logic
    let liked = false;
    const likeBtn = postDiv.querySelector('.like-btn');
    const likeCount = postDiv.querySelector('.like-count');
    likeBtn.onclick = function() {
      liked = !liked;
      likeBtn.textContent = liked ? '♥' : '♡';
      likeBtn.style.color = liked ? '#e1306c' : '';
      likeCount.textContent = liked ? likes + 1 : likes;
    };
    postDiv.querySelector('.feed-post-add-comment').addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input');
      if (input.value.trim()) {
        const commentDiv = document.createElement('div');
        commentDiv.innerHTML = `<b>meow</b> ${input.value}`;
        postDiv.querySelector('.feed-post-comments').appendChild(commentDiv);
        input.value = '';
      }
    });
    feedSection.appendChild(postDiv);
  }

  // 3-7. 5 more random posts (excluding Bhanu and Aria)
  const rest = followers.filter(f => f.username !== 'bhanu' && f.username !== 'aria');
  const randomIndexes = [];
  while (randomIndexes.length < 5 && randomIndexes.length < rest.length) {
    const idx = Math.floor(Math.random() * rest.length);
    if (!randomIndexes.includes(idx)) randomIndexes.push(idx);
  }
  randomIndexes.forEach(i => {
    const follower = rest[i];
    const isCloseFriend = closeFriendUsernames.includes(follower.username);
    const post = follower.posts[0];
    // Set likes to a random number between 1 and 5
    const likes = Math.floor(Math.random() * 5) + 1;
    const postDiv = document.createElement('div');
    postDiv.className = 'feed-post';
    postDiv.innerHTML = `
      <div class="feed-post-header">
        <img src="${follower.profilePic}" class="feed-post-profile-pic" alt="${follower.name}">
        <span class="feed-post-username">${follower.name}${isCloseFriend ? ' <span class=\'close-friend\'>★</span>' : ''}</span>
        <span class="feed-post-menu">...</span>
      </div>
      <div class="feed-post-image">
        <img src="${post.image}" alt="Post by ${follower.name}">
      </div>
      <div class="feed-post-actions">
        <span class="like-btn">♡</span> <span class="comment-action">💬</span> <span>✈️</span> <span style="float:right">🔖</span>
      </div>
      <div class="feed-post-info">
        <div class="feed-post-likes"><span class="like-count">${likes}</span> likes</div>
        <div class="feed-post-caption"><b>${follower.name}</b> ${post.caption}</div>
        <div class="feed-post-time">${post.time}</div>
      </div>
      <div class="feed-post-comments">
        <div class="comments-disabled">Comments are disabled for this post.</div>
      </div>
    `;
    // Like button logic
    let liked = false;
    const likeBtn = postDiv.querySelector('.like-btn');
    const likeCount = postDiv.querySelector('.like-count');
    likeBtn.onclick = function() {
      liked = !liked;
      likeBtn.textContent = liked ? '♥' : '♡';
      likeBtn.style.color = liked ? '#e1306c' : '';
      likeCount.textContent = liked ? likes + 1 : likes;
    };
    // Add popup on comment icon click (fix: use .comment-action if exists)
    const commentIcon = postDiv.querySelector('.comment-action');
    if (commentIcon) commentIcon.onclick = showNotCloseFriendPopup;
    if (!isCloseFriend) {
      const commentIcon = postDiv.querySelector('.comment-action');
      if (commentIcon) commentIcon.onclick = showNotCloseFriendPopup;
    }
    if (isCloseFriend) {
      postDiv.querySelector('.feed-post-add-comment').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input.value.trim()) {
          const commentDiv = document.createElement('div');
          commentDiv.innerHTML = `<b>meow</b> ${input.value}`;
          postDiv.querySelector('.feed-post-comments').appendChild(commentDiv);
          input.value = '';
        }
      });
    }
    feedSection.appendChild(postDiv);
  });
}

// Add 3 new mock accounts for suggestions
const extraSuggestions = [
  {
    name: 'Priya',
    profilePic: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    name: 'Alex',
    profilePic: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'Nina',
    profilePic: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
];

function renderSuggestions() {
  const suggestionsList = document.getElementById('suggestionsList');
  suggestionsList.innerHTML = '';
  // Combine followers and extraSuggestions
  const allSuggestions = [
    ...followers.map(f => ({ name: f.name, profilePic: f.profilePic })),
    ...extraSuggestions
  ];
  // Pick 3 random unique suggestions
  const suggestionIndexes = [];
  while (suggestionIndexes.length < 3) {
    const idx = Math.floor(Math.random() * allSuggestions.length);
    if (!suggestionIndexes.includes(idx)) suggestionIndexes.push(idx);
  }
  suggestionIndexes.forEach(i => {
    const sugg = allSuggestions[i];
    const div = document.createElement('div');
    div.className = 'sidebar-suggestion';
    div.innerHTML = `
      <img src="${sugg.profilePic}" class="sidebar-suggestion-pic" alt="${sugg.name}">
      <span><b>${sugg.name}</b><br><span style="font-size:12px;color:#888;">Suggestion for you</span></span>
      <a href="#" class="sidebar-follow">Follow</a>
    `;
    suggestionsList.appendChild(div);
  });
  // See all logic
  const seeAll = document.querySelector('.sidebar-suggestions-header a');
  if (seeAll) {
    seeAll.onclick = function(e) {
      e.preventDefault();
      showAllSuggestionsModal();
    };
  }
}

function showAllSuggestionsModal() {
  let modal = document.getElementById('allSuggestionsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'allSuggestionsModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" id="closeAllSuggestions">&times;</span>
        <h3>All Suggestions</h3>
        <div id="allSuggestionsList"></div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeAllSuggestions').onclick = () => modal.style.display = 'none';
    window.onclick = function(event) {
      if (event.target === modal) modal.style.display = 'none';
    };
  }
  // Render all 6 suggestions
  const allList = document.getElementById('allSuggestionsList');
  allList.innerHTML = '';
  const allSuggestions = [
    ...followers.map(f => ({ name: f.name, profilePic: f.profilePic })),
    ...extraSuggestions
  ];
  allSuggestions.forEach(sugg => {
    const div = document.createElement('div');
    div.className = 'sidebar-suggestion';
    div.innerHTML = `
      <img src="${sugg.profilePic}" class="sidebar-suggestion-pic" alt="${sugg.name}">
      <span><b>${sugg.name}</b><br><span style="font-size:12px;color:#888;">Suggestion for you</span></span>
      <a href="#" class="sidebar-follow">Follow</a>
    `;
    allList.appendChild(div);
  });
  modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  // Set sidebar profile pic
  const sidebarProfilePic = document.getElementById('sidebarProfilePic');
  if (sidebarProfilePic && window.myProfilePic) {
    sidebarProfilePic.src = window.myProfilePic;
  }
  renderFeed();
  renderSuggestions();
});