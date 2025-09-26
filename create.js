document.getElementById('postImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('previewContainer');
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            preview.innerHTML = `<img src="${evt.target.result}" alt="Preview" style="max-width:200px;max-height:200px;border-radius:8px;box-shadow:0 2px 8px #0001;">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
});

document.getElementById('createPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('postImage');
    const caption = document.getElementById('postCaption').value;
    const closeFriendsOnly = document.getElementById('closeFriendsOnly').checked;
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const newPost = {
            image: evt.target.result,
            caption: caption,
            likes: 0,
            time: 'Just now',
            closeFriendsOnly: closeFriendsOnly
        };
        // Save to localStorage
        let myPosts = JSON.parse(localStorage.getItem('myPosts')) || [];
        myPosts.unshift(newPost); // Add to top
        localStorage.setItem('myPosts', JSON.stringify(myPosts));
        // Also update window.myPosts if present
        if (window.myPosts) window.myPosts.unshift(newPost);
        window.location.href = 'profile.html';
    };
    reader.readAsDataURL(file);
}); 