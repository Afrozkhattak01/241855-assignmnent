let openChatId = '';

function getChat(personId) {
  return chats.find(c => c.withId === personId);
}

function showChatList() {
  let myChats = chats.filter(c => c.withId !== me.id && c.messages.length > 0);
  myChats.sort((a, b) => a.messages[a.messages.length - 1].mins - b.messages[b.messages.length - 1].mins);

  let html = '';
  for (let chat of myChats) {
    let person = getPerson(chat.withId);
    let last = chat.messages[chat.messages.length - 1];
    let preview = (last.from === 'me' ? 'You: ' : '') + last.text;
    let active = chat.withId === openChatId ? 'bg-primary-subtle' : '';
    let tag = person.isFriend ? '<span class="badge rounded-pill bg-primary-subtle text-primary-emphasis">Friend</span>' : '<span class="badge rounded-pill bg-warning-subtle text-warning-emphasis">Member</span>';
    let newBadge = chat.unread ? '<span class="badge rounded-pill bg-warning align-self-center">New</span>' : '';

    html += `
      <button class="list-group-item list-group-item-action border-0 d-flex gap-3 py-3 ${active}" onclick="openChat('${person.id}')">
        ${avatar(person, 'md')}
        <span class="flex-grow-1 text-truncate text-start">
          <span class="d-flex justify-content-between gap-2">
            <span class="fw-semibold text-truncate">${person.name}</span>
            <span class="small text-body-secondary">${timeAgo(last.mins)}</span>
          </span>
          <span class="d-flex align-items-center gap-2 mt-1">
            ${tag}
            <span class="small text-body-secondary text-truncate">${cleanText(preview)}</span>
          </span>
        </span>
        ${newBadge}
      </button>`;
  }

  if (html === '') {
    html = '<div class="text-center small text-body-secondary p-4">No chats yet. Click "New" to message someone.</div>';
  }
  document.getElementById('chatList').innerHTML = html;
}

function showChat() {
  if (openChatId === '') return;

  let person = getPerson(openChatId);
  let chat = getChat(openChatId);
  let tag = person.isFriend ? 'Friend' : 'Member';

  document.getElementById('chatHeader').innerHTML = `
    ${avatar(person, 'md')}
    <div class="flex-grow-1">
      <div class="fw-semibold">${person.name} <span class="badge rounded-pill bg-primary-subtle text-primary-emphasis">${tag}</span></div>
      <div class="small text-body-secondary">${lastLoginText(person)}</div>
    </div>
    <span class="badge rounded-pill text-bg-dark border"><i class="bi bi-lock-fill me-1"></i>Private</span>`;

  let html = '';
  if (!chat || chat.messages.length === 0) {
    html = '<div class="text-center small text-body-secondary py-5">Write your first message to ' + person.name + ' below.</div>';
  } else {
    for (let msg of chat.messages) {
      if (msg.from === 'me') {
        let sent = msg.mins === 0 ? ' - <i class="bi bi-check2-all"></i> Sent' : '';
        html += `
          <div class="d-flex justify-content-end mb-2">
            <div class="cf-bubble px-3 py-2 rounded-4 bg-primary bg-gradient text-white">
              <div class="cf-prewrap">${cleanText(msg.text)}</div>
              <div class="small text-end text-white-50 mt-1">${timeAgo(msg.mins)}${sent}</div>
            </div>
          </div>`;
      } else {
        html += `
          <div class="d-flex justify-content-start mb-2">
            <div class="cf-bubble px-3 py-2 rounded-4 cf-glass">
              <div class="cf-prewrap">${cleanText(msg.text)}</div>
              <div class="small text-end text-body-secondary mt-1">${timeAgo(msg.mins)}</div>
            </div>
          </div>`;
      }
    }
  }

  let box = document.getElementById('chatMessages');
  box.innerHTML = html;
  box.scrollTop = box.scrollHeight;
}

function openChat(personId) {
  let person = getPerson(personId);
  if (!person || personId === me.id) {
    showToast('This member could not be found.', 'error');
    return;
  }

  openChatId = personId;
  let chat = getChat(personId);
  if (chat) chat.unread = false;

  document.getElementById('noChat').classList.add('d-none');
  document.getElementById('chatBox').classList.remove('d-none');
  document.getElementById('messageError').textContent = '';
  document.getElementById('messageText').value = '';

  loadNav('messages', 'Messages', 'Private chats with friends and other members');
  renderPage();
}

function addMessage(personId, text) {
  let chat = getChat(personId);
  if (!chat) {
    chat = { withId: personId, unread: false, messages: [] };
    chats.push(chat);
  }
  chat.messages.push({ from: 'me', text: text, mins: 0 });
}

function showSentPopup(name) {
  document.getElementById('sentText').textContent = 'Your message to ' + name + ' has been sent.';
  bootstrap.Modal.getOrCreateInstance(document.getElementById('sentModal')).show();
}

function sendMessage() {
  let box = document.getElementById('messageText');
  let text = box.value.trim();
  let error = document.getElementById('messageError');

  if (text === '') {
    error.textContent = 'Type a message before sending.';
    return;
  }
  if (text.length > 1000) {
    error.textContent = 'Message is too long (max 1000 letters).';
    return;
  }

  error.textContent = '';
  addMessage(openChatId, text);
  box.value = '';
  renderPage();
  showSentPopup(getPerson(openChatId).name);
}

function enterToSend(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function openNewMessage() {
  let options = '<option value="">Choose a person...</option><optgroup label="Friends">';
  for (let person of members.filter(m => m.isFriend)) {
    options += `<option value="${person.id}">${person.name}</option>`;
  }
  options += '</optgroup><optgroup label="Other members">';
  for (let person of members.filter(m => !m.isFriend)) {
    options += `<option value="${person.id}">${person.name}</option>`;
  }
  options += '</optgroup>';

  document.getElementById('sendTo').innerHTML = options;
  document.getElementById('newMessageText').value = '';
  document.getElementById('sendToError').textContent = '';
  document.getElementById('newMessageError').textContent = '';

  bootstrap.Modal.getOrCreateInstance(document.getElementById('newMessageModal')).show();
}

function sendNewMessage() {
  let personId = document.getElementById('sendTo').value;
  let text = document.getElementById('newMessageText').value.trim();
  let valid = true;

  document.getElementById('sendToError').textContent = '';
  document.getElementById('newMessageError').textContent = '';

  if (personId === '') {
    document.getElementById('sendToError').textContent = 'Choose who you want to message.';
    valid = false;
  }
  if (text === '') {
    document.getElementById('newMessageError').textContent = 'Type a message before sending.';
    valid = false;
  } else if (text.length > 1000) {
    document.getElementById('newMessageError').textContent = 'Message is too long (max 1000 letters).';
    valid = false;
  }
  if (!valid) return;

  addMessage(personId, text);

  let modal = document.getElementById('newMessageModal');
  modal.addEventListener('hidden.bs.modal', function () {
    openChat(personId);
    showSentPopup(getPerson(personId).name);
  }, { once: true });
  bootstrap.Modal.getInstance(modal).hide();
}

function renderPage() {
  showChatList();
  showChat();
}

if (checkLogin()) {
  loadNav('messages', 'Messages', 'Private chats with friends and other members');
  renderPage();

  let to = urlParams.get('to');
  if (to) openChat(to);
}
