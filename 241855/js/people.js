function showRequests() {
  let requests = members.filter(m => m.sentMeRequest && !m.isFriend);
  let html = '';

  for (let person of requests) {
    html += `
      <div class="col">
        <div class="border rounded-4 p-3 cf-glass d-flex align-items-center gap-3">
          ${avatar(person, 'md')}
          <div class="flex-grow-1">
            <div class="fw-semibold">${person.name}</div>
            <div class="small text-body-secondary">${person.mutual} mutual friends - ${person.city}</div>
          </div>
          <button class="btn btn-sm btn-primary rounded-pill" onclick="acceptRequest('${person.id}')">Accept</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="declineRequest('${person.id}')">Decline</button>
        </div>
      </div>`;
  }

  if (html === '') {
    html = '<div class="col-12 small text-body-secondary">No pending requests.</div>';
  }
  document.getElementById('requestList').innerHTML = html;
  document.getElementById('requestCount').textContent = requests.length > 0 ? requests.length : '';
}

function acceptRequest(id) {
  let person = getPerson(id);
  person.sentMeRequest = false;
  person.isFriend = true;
  person.rating = 0;
  showToast('You and ' + person.name + ' are now friends.');
  renderPage();
}

function declineRequest(id) {
  let person = getPerson(id);
  person.sentMeRequest = false;
  showToast('Request from ' + person.name + ' declined.', 'info');
  renderPage();
}

function showPeople() {
  let people = members.filter(m => !m.isFriend && !m.sentMeRequest);
  let html = '';

  for (let person of people) {
    html += `
      <div class="col">
        <div class="border rounded-4 p-3 cf-glass h-100 d-flex flex-column">
          <div class="d-flex align-items-center gap-3 mb-2">
            ${avatar(person, 'lg')}
            <div>
              <div class="fw-semibold">${person.name}</div>
              <div class="small text-body-secondary">@${person.username}</div>
              <div class="small text-body-secondary"><i class="bi bi-geo-alt me-1"></i>${person.city}</div>
            </div>
          </div>
          <p class="small mb-2">${person.bio}</p>
          <p class="small text-body-secondary mb-3"><i class="bi bi-people me-1"></i>${person.mutual} mutual friends - ${lastLoginText(person)}</p>
          <div class="d-flex align-items-start justify-content-between gap-2 mt-auto">
            ${inviteButton(person)}
            <a href="${link('messages.html', 'to=' + person.id)}" class="btn btn-sm btn-outline-secondary rounded-pill"><i class="bi bi-chat-dots me-1"></i>Message</a>
          </div>
        </div>
      </div>`;
  }

  if (html === '') {
    html = '<div class="col-12 small text-body-secondary">No other members to show.</div>';
  }
  document.getElementById('peopleList').innerHTML = html;
}

function renderPage() {
  showRequests();
  showPeople();
}

if (checkLogin()) {
  loadNav('people', 'People', 'Invite members and answer requests');
  renderPage();
}
