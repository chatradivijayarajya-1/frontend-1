// Random names for explore page
const exploreNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James',
  'Isabella', 'Benjamin', 'Mia', 'Lucas', 'Charlotte', 'Mason', 'Amelia',
  'Ethan', 'Harper', 'Alexander', 'Evelyn', 'Michael'
];

// Random profile pictures from randomuser.me
const explorePics = Array.from({length: 20}, (_, i) => 
  `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 1}.jpg`
);

function renderExploreGrid() {
  const grid = document.getElementById('exploreGrid');
  grid.innerHTML = '';
  
  // Create 12 random accounts
  for (let i = 0; i < 12; i++) {
    const name = exploreNames[i];
    const profilePic = explorePics[i];
    
    const userDiv = document.createElement('div');
    userDiv.className = 'explore-account';
    userDiv.innerHTML = `
      <div class="explore-account-pic-wrapper">
        <img src="${profilePic}" class="explore-account-pic blurred" alt="${name}">
      </div>
      <div class="explore-account-info">
        <span class="explore-username">${name}</span>
        <button class="explore-follow-btn">Follow</button>
      </div>
    `;
    
    // Add click event for popup
    const profileImage = userDiv.querySelector('.explore-account-pic');
    profileImage.addEventListener('click', function(e) {
      if (profileImage.classList.contains('blurred')) {
        showFollowPopup();
      }
    });
    
    // Add click event for follow button
    const followBtn = userDiv.querySelector('.explore-follow-btn');
    followBtn.addEventListener('click', function() {
      profileImage.classList.remove('blurred');
      followBtn.textContent = 'Following';
      followBtn.disabled = true;
    });
    
    grid.appendChild(userDiv);
  }
}

function showFollowPopup() {
  let popup = document.getElementById('explorePopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'explorePopup';
    popup.className = 'explore-popup';
    popup.innerHTML = `
      <div class="explore-popup-content">
        <p>Follow to view the picture</p>
        <button id="closePopupBtn">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById('closePopupBtn').onclick = () => popup.remove();
  }
}

document.addEventListener('DOMContentLoaded', renderExploreGrid); 