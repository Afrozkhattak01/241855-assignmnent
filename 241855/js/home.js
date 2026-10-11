let shareText = '';
let sharePostId = '';

function showOnlineFriends() {
  let html = '';
  for (let friend of getFriendsByLogin()) {
    let loginColor = friend.lastLogin < 15 ? 'text-success' : 'text-body-secondary';
    html += `
      <li>
        <div class="d-flex align-items-center gap-3">
          ${avatar(friend, 'md')}
          <div class="flex-grow-1 text-truncate">
            <div class="fw-semibold text-truncate">${friend.name}</div>
            <div class="small ${loginColor}">${lastLoginText(friend)}</div>
          </div>
          <a href="${link('messages.html', 'to=' + friend.id)}" class="btn btn-sm btn-outline-secondary rounded-circle" title="Message"><i class="bi bi-chat-dots"></i></a>
        </div>
        <div class="mt-2 ms-5 ps-2">${ratingButtons(friend)}</div>
      </li>`;
  }
  if (html === '') {
    html = '<li class="small text-body-secondary">No friends yet.</li>';
  }
  document.getElementById('onlineList').innerHTML = html;
}

function showSuggestions() {
  let people = members.filter(m => !m.isFriend && !m.sentMeRequest).slice(0, 4);
  let html = '';
  for (let person of people) {
    html += `
      <li class="d-flex align-items-start gap-3">
        ${avatar(person, 'sm')}
        <div class="flex-grow-1">
          <div class="fw-semibold small">${person.name}</div>
          <div class="small text-body-secondary mb-2">${person.mutual} mutual friends</div>
          ${inviteButton(person)}
        </div>
      </li>`;
  }
  document.getElementById('suggestList').innerHTML = html;
}

function showFeed() {
  let sorted = posts.slice().sort((a, b) => a.postedAgo - b.postedAgo);
  let html = '';

  for (let post of sorted) {
    let author = getPerson(post.author);
    let name = author.id === me.id ? 'You' : author.name;

    let sharedBadge = '';
    if (author.id === me.id && post.sharedWith) {
      sharedBadge = `<span class="badge rounded-pill bg-warning-subtle text-warning-emphasis"><i class="bi bi-people me-1"></i>${post.sharedWith}</span>`;
    }

    let likeStyle = post.myReaction === 'like' ? 'btn-primary' : 'btn-outline-primary';
    let dislikeStyle = post.myReaction === 'dislike' ? 'btn-secondary' : 'btn-outline-secondary';
    let shareInfo = '';
    if (post.shares === 1) shareInfo = ' - 1 share';
    if (post.shares > 1) shareInfo = ' - ' + post.shares + ' shares';

    html += `
      <div class="card rounded-4 mb-3">
        <div class="card-body p-4">
          <div class="d-flex align-items-center gap-3 mb-3">
            ${avatar(author, 'md')}
            <div class="flex-grow-1">
              <div class="fw-semibold">${name}</div>
              <div class="small text-body-secondary"><i class="bi bi-clock-history me-1"></i>${lastLoginText(author)} - shared ${timeAgo(post.postedAgo)}</div>
            </div>
            ${sharedBadge}
          </div>
          <p class="mb-3 cf-prewrap">${cleanText(post.text)}</p>
          <p class="small text-body-secondary mb-2">
            <i class="bi bi-hand-thumbs-up-fill text-primary me-1"></i>${post.likes} people like this -
            <i class="bi bi-hand-thumbs-down-fill me-1"></i>${post.dislikes} disliked${shareInfo}
          </p>
          <div class="d-flex flex-wrap gap-2 border-top pt-3">
            <button class="btn btn-sm rounded-pill px-3 ${likeStyle}" onclick="react('${post.id}', 'like')">
              <i class="bi bi-hand-thumbs-up me-1"></i>Like (${post.likes})
            </button>
            <button class="btn btn-sm rounded-pill px-3 ${dislikeStyle}" onclick="react('${post.id}', 'dislike')">
              <i class="bi bi-hand-thumbs-down me-1"></i>Dislike (${post.dislikes})
            </button>
            <button class="btn btn-sm btn-outline-secondary rounded-pill px-3 ms-auto" onclick="openShare('${post.id}')">
              <i class="bi bi-share me-1"></i>Share
            </button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById('feed').innerHTML = html;
  document.getElementById('postCount').textContent = posts.length + ' posts';
}

function react(postId, type) {
  let post = posts.find(p => p.id === postId);
  if (!post) {
    showToast('This post is no longer available.', 'error');
    return;
  }

  if (post.myReaction === 'like') post.likes--;
  if (post.myReaction === 'dislike') post.dislikes--;

  if (post.myReaction === type) {
    post.myReaction = '';
  } else {
    post.myReaction = type;
    if (type === 'like') post.likes++;
    if (type === 'dislike') post.dislikes++;
  }
  showFeed();
}

function countLetters() {
  let length = document.getElementById('newsText').value.length;
  let counter = document.getElementById('letterCount');
  counter.textContent = length + ' / 500';
  counter.className = length > 500 ? 'small text-danger fw-semibold' : 'small text-body-secondary';
  document.getElementById('newsText').classList.remove('is-invalid');
}

function postNews() {
  let box = document.getElementById('newsText');
  let text = box.value.trim();

  if (text === '') {
    box.classList.add('is-invalid');
    document.getElementById('newsError').textContent = 'Write something before sharing.';
    return;
  }
  if (text.length > 500) {
    box.classList.add('is-invalid');
    document.getElementById('newsError').textContent = 'Your news is too long (max 500 letters).';
    return;
  }

  shareText = text;
  sharePostId = '';
  openShareModal('Share your news', cleanText(text));
}

function openShare(postId) {
  let post = posts.find(p => p.id === postId);
  let author = getPerson(post.author);
  shareText = '';
  sharePostId = postId;
  openShareModal('Share ' + author.name + "'s news", '<strong>' + author.name + ':</strong> ' + cleanText(post.text));
}

function openShareModal(title, preview) {
  document.getElementById('shareTitle').textContent = title;
  document.getElementById('sharePreview').innerHTML = preview;
  document.getElementById('shareAll').checked = true;
  document.getElementById('shareError').classList.add('d-none');

  let html = '';
  for (let friend of getFriendsByLogin()) {
    html += `
      <label class="list-group-item d-flex align-items-center gap-3 py-2">
        <input class="form-check-input m-0 friend-check" type="checkbox" value="${friend.id}">
        ${avatar(friend, 'sm')}
        <span class="small fw-semibold">${friend.name}</span>
      </label>`;
  }
  document.getElementById('friendPicker').innerHTML = html;
  toggleFriendList();

  bootstrap.Modal.getOrCreateInstance(document.getElementById('shareModal')).show();
}

function toggleFriendList() {
  let some = document.getElementById('shareSome').checked;
  document.getElementById('friendPicker').classList.toggle('d-none', !some);
}

function sharePost() {
  let errorBox = document.getElementById('shareError');
  let friends = getFriends();
  let sharedWith = '';

  if (friends.length === 0) {
    errorBox.textContent = 'You have no friends to share with yet.';
    errorBox.classList.remove('d-none');
    return;
  }

  if (document.getElementById('shareAll').checked) {
    sharedWith = 'All friends';
  } else {
    let checked = document.querySelectorAll('.friend-check:checked');
    if (checked.length === 0) {
      errorBox.textContent = 'Please select at least one friend, or choose "All friends".';
      errorBox.classList.remove('d-none');
      return;
    }
    sharedWith = checked.length + ' friends';
  }

  if (sharePostId === '') {
    posts.push({
      id: 'p' + (posts.length + 1),
      author: me.id,
      postedAgo: 0,
      text: shareText,
      likes: 0,
      dislikes: 0,
      myReaction: '',
      shares: 0,
      sharedWith: sharedWith
    });
    document.getElementById('newsText').value = '';
    countLetters();
    showToast('Your news was shared with ' + sharedWith.toLowerCase() + '.');
  } else {
    let post = posts.find(p => p.id === sharePostId);
    post.shares++;
    showToast('Post shared with ' + sharedWith.toLowerCase() + '.');
  }

  bootstrap.Modal.getInstance(document.getElementById('shareModal')).hide();
  showFeed();
}

function renderPage() {
  showOnlineFriends();
  showSuggestions();
  showFeed();
}

if (checkLogin()) {
  loadNav('home', 'Home', 'News from your friends');
  document.getElementById('myAvatar').innerHTML = avatar(me, 'md');
  document.getElementById('seeAllLink').href = link('people.html');
  renderPage();
}
