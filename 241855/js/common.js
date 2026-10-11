const urlParams = new URLSearchParams(window.location.search);
const me = users.find(u => u.id === urlParams.get('user'));

if (me) {
  for (let u of users) {
    if (u.id !== me.id) {
      u.isFriend = true;
      u.rating = 0;
      members.unshift(u);
    }
  }
}

function checkLogin() {
  if (!me) {
    window.location.href = 'login.html?msg=login';
    return false;
  }
  return true;
}

function link(page, extra) {
  let url = page + '?user=' + me.id;
  if (extra) {
    url += '&' + extra;
  }
  return url;
}

function getPerson(id) {
  if (me && id === me.id) {
    return me;
  }
  return members.find(m => m.id === id);
}

function getFriends() {
  return members.filter(m => m.isFriend);
}

function getFriendsByLogin() {
  return getFriends().sort((a, b) => a.lastLogin - b.lastLogin);
}

function timeAgo(mins) {
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + 'm ago';
  if (mins < 1440) return Math.floor(mins / 60) + 'h ago';
  if (mins < 10080) return Math.floor(mins / 1440) + 'd ago';
  return Math.floor(mins / 10080) + 'w ago';
}

function lastLoginText(person) {
  if (person.id === me.id) return 'Online now';
  if (person.lastLogin < 15) return 'Active ' + timeAgo(person.lastLogin);
  return 'Last login ' + timeAgo(person.lastLogin);
}

function cleanText(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function avatar(person, size) {
  if (person.photo) {
    return `<img src="${person.photo}" class="cf-avatar-${size} rounded-circle object-fit-cover">`;
  }
  let letters = person.name.split(' ').map(word => word[0]).join('').substring(0, 2);
  let dot = '';
  if (person.lastLogin < 15 && person.id !== me.id) {
    dot = '<span class="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle"></span>';
  }
  return `<span class="cf-avatar-${size} position-relative rounded-circle d-inline-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0 ${person.color}">${letters}${dot}</span>`;
}

function showToast(message, type) {
  let box = document.getElementById('toastBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toastBox';
    box.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(box);
  }

  let icon = 'bi-check-circle-fill text-success';
  if (type === 'error') icon = 'bi-x-circle-fill text-danger';
  if (type === 'info') icon = 'bi-info-circle-fill text-primary';

  let toast = document.createElement('div');
  toast.className = 'toast align-items-center border-0 rounded-4';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex gap-2"><i class="bi ${icon}"></i> ${message}</div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  box.appendChild(toast);
  new bootstrap.Toast(toast).show();
}

function loadNav(activePage, title, subtitle) {
  let menu = [
    { page: 'home', icon: 'bi-house-heart', text: 'Home' },
    { page: 'profile', icon: 'bi-person-badge', text: 'Profile' },
    { page: 'people', icon: 'bi-person-plus', text: 'People' },
    { page: 'messages', icon: 'bi-chat-dots', text: 'Messages' }
  ];

  let unread = chats.filter(c => c.unread && c.withId !== me.id).length;
  let sideLinks = '';
  let bottomLinks = '';

  for (let item of menu) {
    let active = item.page === activePage ? 'bg-primary-subtle text-primary-emphasis fw-bold' : 'text-body-secondary';
    let badge = '';
    if (item.page === 'messages' && unread > 0) {
      badge = `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">${unread}</span>`;
    }
    sideLinks += `
      <li class="nav-item">
        <a class="nav-link d-flex flex-column align-items-center rounded-4 py-2 ${active}" href="${link(item.page + '.html')}">
          <span class="position-relative"><i class="bi ${item.icon} fs-4"></i>${badge}</span>
          <span class="small mt-1">${item.text}</span>
        </a>
      </li>`;
    bottomLinks += `
      <li class="nav-item">
        <a class="nav-link d-flex flex-column align-items-center py-1 ${active}" href="${link(item.page + '.html')}">
          <span class="position-relative"><i class="bi ${item.icon} fs-5"></i>${badge}</span>
          <span class="small">${item.text}</span>
        </a>
      </li>`;
  }

  document.getElementById('cf-nav').innerHTML = `
    <nav class="cf-rail cf-glass d-none d-lg-flex flex-column align-items-center py-4 border-end">
      <a href="${link('home.html')}" class="bg-primary bg-gradient text-white rounded-3 fw-bold px-3 py-2 fs-5 d-flex align-items-center justify-content-center mb-4 text-decoration-none">cf</a>
      <ul class="nav flex-column gap-2 w-100 px-2">${sideLinks}</ul>
      <a href="login.html?msg=logout" class="nav-link text-body-secondary mt-auto d-flex flex-column align-items-center rounded-4 py-2 px-3">
        <i class="bi bi-box-arrow-left fs-4"></i><span class="small mt-1">Sign out</span>
      </a>
    </nav>
    <nav class="d-lg-none fixed-bottom cf-glass border-top">
      <ul class="nav nav-justified py-1">${bottomLinks}</ul>
    </nav>`;

  document.getElementById('cf-header').innerHTML = `
    <header class="d-flex align-items-center justify-content-between gap-3 py-4">
      <div class="d-flex align-items-center gap-3">
        <a href="${link('home.html')}" class="bg-primary bg-gradient text-white rounded-3 fw-bold px-3 py-2 fs-5 d-flex d-lg-none align-items-center justify-content-center text-decoration-none">cf</a>
        <div>
          <h1 class="h3 fw-bold mb-0">${title}</h1>
          <p class="text-body-secondary small mb-0">${subtitle}</p>
        </div>
      </div>
      <div class="dropdown">
        <button class="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 py-1 ps-1 pe-3" data-bs-toggle="dropdown">
          ${avatar(me, 'sm')}
          <span class="d-none d-sm-inline fw-semibold small">${me.name}</span>
          <i class="bi bi-chevron-down small"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end rounded-4 p-2">
          <li><a class="dropdown-item rounded-3" href="${link('profile.html')}"><i class="bi bi-person me-2"></i>My profile</a></li>
          <li><a class="dropdown-item rounded-3" href="${link('messages.html')}"><i class="bi bi-chat-dots me-2"></i>Messages</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item rounded-3 text-danger" href="login.html?msg=logout"><i class="bi bi-box-arrow-left me-2"></i>Sign out</a></li>
        </ul>
      </div>
    </header>`;

  document.title = title + ' - ConnecFriend';
}

const ratingNames = ['Not rated', 'Stupid', 'Cool', 'Trustworthy'];
const ratingIcons = ['', 'bi-emoji-dizzy', 'bi-sunglasses', 'bi-shield-check'];

function ratingButtons(friend) {
  let buttons = '';
  for (let i = 1; i <= 3; i++) {
    let style = friend.rating === i ? 'btn-primary' : 'btn-outline-secondary';
    buttons += `<button class="btn ${style}" title="${ratingNames[i]}" onclick="rateFriend('${friend.id}', ${i})"><i class="bi ${ratingIcons[i]}"></i></button>`;
  }
  let textStyle = friend.rating > 0 ? 'fw-semibold text-warning-emphasis' : 'text-body-secondary';
  return `
    <div class="d-flex align-items-center gap-2">
      <div class="btn-group btn-group-sm">${buttons}</div>
      <span class="small ${textStyle}">${ratingNames[friend.rating]}</span>
    </div>`;
}

function rateFriend(id, value) {
  let friend = getPerson(id);
  if (!friend || !friend.isFriend) {
    showToast('You can only rate people in your friends list.', 'error');
    return;
  }

  if (friend.rating === value) {
    friend.rating = 0;
    showToast('Rating removed for ' + friend.name + '.', 'info');
  } else {
    friend.rating = value;
    showToast('You rated ' + friend.name + ' as ' + ratingNames[value] + '.');
  }
  renderPage();
}

function inviteButton(person) {
  if (person.isFriend) {
    return '<span class="badge rounded-pill text-bg-dark border py-2 px-3"><i class="bi bi-person-check me-1"></i>Friends</span>';
  }
  if (person.blocked) {
    return `
      <div>
        <button class="btn btn-sm btn-outline-secondary rounded-pill" disabled><i class="bi bi-slash-circle me-1"></i>Can't invite</button>
        <div class="small text-danger mt-1">${person.name.split(' ')[0]} isn't accepting your requests.</div>
      </div>`;
  }
  if (person.invited) {
    return `
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary text-primary" disabled><i class="bi bi-hourglass-split me-1"></i>Invite sent</button>
        <button class="btn btn-outline-secondary" title="Cancel" onclick="cancelInvite('${person.id}')"><i class="bi bi-x-lg"></i></button>
      </div>`;
  }
  return `<button class="btn btn-sm btn-primary rounded-pill px-3" onclick="sendInvite('${person.id}')"><i class="bi bi-person-plus me-1"></i>Invite</button>`;
}

function sendInvite(id) {
  let person = getPerson(id);
  if (!person) {
    showToast('This member could not be found.', 'error');
    return;
  }

  if (person.ignoresMe) {
    person.blocked = true;
    showToast('Friend request not sent. ' + person.name + ' has put you on their ignore list.', 'error');
  } else {
    person.invited = true;
    showToast('Friend invitation sent to ' + person.name + '.');
  }
  renderPage();
}

function cancelInvite(id) {
  let person = getPerson(id);
  person.invited = false;
  showToast('Invitation to ' + person.name + ' cancelled.', 'info');
  renderPage();
}
