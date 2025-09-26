// DOM Elements
const fontFamilySelect = document.getElementById('fontFamily');
const fontSizeInput = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const textColorInput = document.getElementById('textColor');
const bgColorInput = document.getElementById('bgColor');

// Default settings
const defaultSettings = {
    fontFamily: 'Roboto',
    fontSize: '16',
    textColor: '#262626',
    bgColor: '#fafafa'
};

// Load settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('profileSettings')) || defaultSettings;
    
    // Apply settings to inputs
    fontFamilySelect.value = settings.fontFamily;
    fontSizeInput.value = settings.fontSize;
    fontSizeValue.textContent = `${settings.fontSize}px`;
    textColorInput.value = settings.textColor;
    bgColorInput.value = settings.bgColor;
    
    // Apply settings to profile
    applySettings(settings);
}

// Save settings to localStorage
function saveSettings(settings) {
    localStorage.setItem('profileSettings', JSON.stringify(settings));
}

// Apply settings to the profile
function applySettings(settings) {
    const profileSection = document.querySelector('.profile-section');
    const customizationPanel = document.querySelector('.customization-panel');
    const username = document.querySelector('.username');
    
    // Apply font family, font size, and text color ONLY to username
    if (username) {
        username.style.fontFamily = settings.fontFamily;
        username.style.fontSize = `${settings.fontSize}px`;
        username.style.color = settings.textColor;
    }
    
    // Apply background color to profile-hover-box (remove gradient)
    const hoverBox = document.querySelector('.profile-hover-box');
    if (hoverBox) {
        hoverBox.style.background = settings.bgColor;
    }
}

// Event Listeners
fontFamilySelect.addEventListener('change', (e) => {
    const settings = {
        fontFamily: e.target.value,
        fontSize: fontSizeInput.value,
        textColor: textColorInput.value,
        bgColor: bgColorInput.value
    };
    saveSettings(settings);
    applySettings(settings);
});

fontSizeInput.addEventListener('input', (e) => {
    fontSizeValue.textContent = `${e.target.value}px`;
    const settings = {
        fontFamily: fontFamilySelect.value,
        fontSize: e.target.value,
        textColor: textColorInput.value,
        bgColor: bgColorInput.value
    };
    saveSettings(settings);
    applySettings(settings);
});

textColorInput.addEventListener('input', (e) => {
    const settings = {
        fontFamily: fontFamilySelect.value,
        fontSize: fontSizeInput.value,
        textColor: e.target.value,
        bgColor: bgColorInput.value
    };
    saveSettings(settings);
    applySettings(settings);
});

bgColorInput.addEventListener('input', (e) => {
    const settings = {
        fontFamily: fontFamilySelect.value,
        fontSize: fontSizeInput.value,
        textColor: textColorInput.value,
        bgColor: e.target.value
    };
    saveSettings(settings);
    applySettings(settings);
});

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    // Set profile pic and username
    document.getElementById('myProfilePic').src = window.myProfilePic;
    document.getElementById('myUsername').textContent = window.myUsername;
    // Update followers and following count
    const stats = document.querySelector('.profile-stats');
    if (stats) {
        stats.innerHTML = `<span><strong>${window.myPosts.length}</strong> posts</span>
            <span><strong id="followersCount" class="clickable">${window.followers.length}</strong> followers</span>
            <span><strong id="followingCount" class="clickable">${window.following.length}</strong> following</span>`;
    }
    // Render close friends
    const cfList = document.getElementById('closeFriendsList');
    if (cfList && window.closeFriends) {
        cfList.innerHTML = window.closeFriends.map(f => `
            <div class="close-friend-item">
                <img src="${f.profilePic}" alt="${f.name}" class="close-friend-pic">
                <div class="user-info">
                    <span class="user-name">${f.name}</span>
                    <span class="user-username">@${f.username}</span>
                </div>
            </div>
        `).join('');
    }
    // Modal logic
    const followersModal = document.getElementById('followersModal');
    const followingModal = document.getElementById('followingModal');
    document.getElementById('followersCount').onclick = () => {
        renderUserList('followersList', window.followers);
        followersModal.style.display = 'block';
    };
    document.getElementById('followingCount').onclick = () => {
        renderUserList('followingList', window.following);
        followingModal.style.display = 'block';
    };
    document.getElementById('closeFollowersModal').onclick = () => followersModal.style.display = 'none';
    document.getElementById('closeFollowingModal').onclick = () => followingModal.style.display = 'none';
    window.onclick = function(event) {
        if (event.target === followersModal) followersModal.style.display = 'none';
        if (event.target === followingModal) followingModal.style.display = 'none';
    };
    // Render my posts (load from localStorage if available)
    let posts = window.myPosts || [];
    const localPosts = JSON.parse(localStorage.getItem('myPosts'));
    if (localPosts && Array.isArray(localPosts)) {
        posts = [...localPosts, ...posts];
    }
    // Update posts count in stats
    if (stats) {
        stats.innerHTML = `<span><strong>${posts.length}</strong> posts</span>
            <span><strong id="followersCount" class="clickable">${window.followers.length}</strong> followers</span>
            <span><strong id="followingCount" class="clickable">${window.following.length}</strong> following</span>`;
    }
    const myPostsList = document.getElementById('myPostsList');
    if (myPostsList) {
        myPostsList.innerHTML = posts.map(post => `
            <div class="my-post-item">
                <img src="${post.image}" alt="My post" class="my-post-img">
                <div class="my-post-caption">${post.caption}</div>
                <div class="my-post-likes">0 likes</div>
                <div class="my-post-time">${post.time}</div>
            </div>
        `).join('');
    }
});

function renderUserList(listId, users) {
    const list = document.getElementById(listId);
    list.innerHTML = users.map(u => `
        <div class="close-friend-item">
            <img src="${u.profilePic}" alt="${u.name}" class="close-friend-pic">
            <div class="user-info">
                <span class="user-name">${u.name}</span>
                <span class="user-username">@${u.username}</span>
            </div>
            <button class="follow-btn" data-username="${u.username}">Follow</button>
        </div>
    `).join('');

    // Add click handlers for follow buttons
    list.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.classList.add('following');
                // Add to following list if not already there
                if (!window.following.find(u => u.username === username)) {
                    const user = window.followers.find(u => u.username === username);
                    if (user) window.following.push(user);
                }
            } else {
                this.textContent = 'Follow';
                this.classList.remove('following');
                // Remove from following list
                window.following = window.following.filter(u => u.username !== username);
            }
            // Update following count
            document.getElementById('followingCount').textContent = window.following.length;
        });
    });
} 