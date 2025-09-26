// Common data for all pages

const myProfilePic = 'images/Screenshot 2025-05-10 005230.png';
const myUsername = 'MEOW';

const followerPics = [
  'images/Screenshot 2025-05-10 005234.png',
  'images/Screenshot 2025-05-10 005239.png',
  'images/Screenshot 2025-05-10 005245.png',
  'images/Screenshot 2025-05-10 005255.png',
  'images/Screenshot 2025-05-10 005303.png',
  'images/Screenshot 2025-05-10 005934.png',
  'images/Screenshot 2025-05-10 005937.png',
  'images/Screenshot 2025-05-10 005943.png',
  'images/Screenshot 2025-05-10 005948.png',
  'images/Screenshot 2025-05-10 005952.png',
];

const followerNames = [
  'Aria', 'Jignesh', 'Bhanu', 'Meowthika', 'Larry', 'Sophie', 'Kai', 'Mina', 'Chandna', 'Luna'
];

const naturePics = [
  'nature/Screenshot 2025-05-10 011850.png',
  'nature/Screenshot 2025-05-10 011855.png',
  'nature/Screenshot 2025-05-10 011858.png',
  'nature/Screenshot 2025-05-10 011904.png',
  'nature/Screenshot 2025-05-10 011935.png',
  'nature/Screenshot 2025-05-10 011941.png',
  'nature/Screenshot 2025-05-10 011948.png',
  'nature/Screenshot 2025-05-10 011955.png',
];

// Add posts to followers (1 post each, cycling through naturePics)
const followers = followerNames.map((name, i) => ({
  name,
  username: name.toLowerCase(),
  profilePic: followerPics[i],
  posts: [
    {
      image: naturePics[i % naturePics.length],
      caption: `A beautiful view by ${name}`,
      likes: Math.floor(Math.random() * 1000) + 100,
      time: `${Math.floor(Math.random() * 12) + 1} HOURS AGO`
    }
  ]
}));

// 3 close friends (by index)
const closeFriends = [followers[0], followers[3], followers[7]];

// 8 of the followers are also in following
const following = followers.slice(0, 8);

// Add 2 posts for the main user (MEOW)
const myPosts = [
  {
    image: naturePics[0],
    caption: 'My first post!',
    likes: 321,
    time: '2 HOURS AGO'
  },
  {
    image: naturePics[1],
    caption: 'Another day in nature.',
    likes: 198,
    time: '5 HOURS AGO'
  }
];

window.myProfilePic = myProfilePic;
window.myUsername = myUsername;
window.followers = followers;
window.closeFriends = closeFriends;
window.following = following;
window.myPosts = myPosts; 