function showProfile() {
  document.getElementById('profilePic').innerHTML = avatar(me, 'xl');
  document.getElementById('profileName').textContent = me.name;
  document.getElementById('profileUsername').textContent = '@' + me.username;
  document.getElementById('profileBio').textContent = me.bio;

  let friends = getFriends();
  document.getElementById('friendCount').textContent = friends.length;
  document.getElementById('ratedCount').textContent = friends.filter(f => f.rating > 0).length;
  document.getElementById('trustedCount').textContent = friends.filter(f => f.rating === 3).length;
}

function showInfo() {
  let info = [
    ['bi-person', 'Full name', me.name],
    ['bi-at', 'Username', me.username],
    ['bi-envelope', 'Email', me.email],
    ['bi-telephone', 'Phone', me.phone],
    ['bi-cake2', 'Date of birth', me.dob],
    ['bi-gender-ambiguous', 'Gender', me.gender],
    ['bi-geo-alt', 'City', me.city],
    ['bi-mortarboard', 'Education', me.education],
    ['bi-briefcase', 'Work', me.work],
    ['bi-calendar-check', 'Member since', me.joined]
  ];

  let html = '';
  for (let item of info) {
    html += `
      <div class="d-flex gap-3">
        <span class="badge bg-primary-subtle text-primary-emphasis rounded-3 p-2 align-self-start"><i class="bi ${item[0]}"></i></span>
        <div>
          <div class="small text-body-secondary">${item[1]}</div>
          <div class="fw-semibold">${item[2]}</div>
        </div>
      </div>`;
  }
  document.getElementById('infoList').innerHTML = html;
}

function showFriends() {
  let html = '';
  for (let friend of getFriendsByLogin()) {
    html += `
      <div class="col">
        <div class="border rounded-4 p-3 h-100 cf-glass">
          <div class="d-flex align-items-center gap-3 mb-3">
            ${avatar(friend, 'md')}
            <div class="flex-grow-1 text-truncate">
              <div class="fw-semibold">${friend.name}</div>
              <div class="small text-body-secondary"><i class="bi bi-geo-alt me-1"></i>${friend.city} - ${lastLoginText(friend)}</div>
            </div>
            <a href="${link('messages.html', 'to=' + friend.id)}" class="btn btn-sm btn-outline-secondary rounded-circle" title="Message"><i class="bi bi-chat-dots"></i></a>
          </div>
          ${ratingButtons(friend)}
        </div>
      </div>`;
  }
  if (html === '') {
    html = '<p class="text-body-secondary">You have no friends yet.</p>';
  }
  document.getElementById('friendsList').innerHTML = html;
}

function changePhoto() {
  let input = document.getElementById('photoInput');
  let errorBox = document.getElementById('photoError');
  let file = input.files[0];
  errorBox.classList.add('d-none');

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    errorBox.textContent = 'Please choose an image file (PNG, JPG or GIF).';
    errorBox.classList.remove('d-none');
    input.value = '';
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    errorBox.textContent = 'This image is too big. The limit is 2 MB.';
    errorBox.classList.remove('d-none');
    input.value = '';
    return;
  }

  let reader = new FileReader();
  reader.onload = function () {
    me.photo = reader.result;
    showProfile();
    showToast('Profile picture updated.');
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function renderPage() {
  showProfile();
  showInfo();
  showFriends();
}

if (checkLogin()) {
  loadNav('profile', 'My profile', 'Your details and your friends');
  renderPage();
}
