let wrongTries = 0;

function showAlert(message, type) {
  let box = document.getElementById('loginAlert');
  box.className = 'alert alert-' + type + ' rounded-4';
  box.textContent = message;
}

function showError(inputId, message) {
  document.getElementById(inputId).classList.add('is-invalid');
  document.getElementById(inputId + 'Error').textContent = message;
}

function clearErrors() {
  document.getElementById('username').classList.remove('is-invalid');
  document.getElementById('password').classList.remove('is-invalid');
  document.getElementById('loginAlert').className = 'alert d-none';
}

function login(event) {
  event.preventDefault();
  clearErrors();

  let username = document.getElementById('username').value.trim().toLowerCase();
  let password = document.getElementById('password').value;
  let valid = true;

  if (username === '') {
    showError('username', 'Please enter your username or email.');
    valid = false;
  } else if (username.length < 3) {
    showError('username', 'Username must be at least 3 characters.');
    valid = false;
  }

  if (password === '') {
    showError('password', 'Please enter your password.');
    valid = false;
  } else if (password.length < 6) {
    showError('password', 'Password must be at least 6 characters.');
    valid = false;
  }

  if (!valid) return;

  let user = users.find(u => (u.username === username || u.email === username) && u.password === password);

  if (user) {
    showAlert('Welcome back, ' + user.name + '!', 'success');
    window.location.href = 'home.html?user=' + user.id;
    return;
  }

  wrongTries++;
  document.getElementById('password').value = '';

  if (wrongTries >= 3) {
    let button = document.getElementById('loginBtn');
    button.disabled = true;
    showAlert('Too many wrong tries. Please wait 30 seconds and try again.', 'warning');
    setTimeout(function () {
      button.disabled = false;
      wrongTries = 0;
      clearErrors();
    }, 30000);
  } else {
    showAlert('Incorrect username or password. ' + (3 - wrongTries) + ' tries left.', 'danger');
  }
}

function togglePassword() {
  let input = document.getElementById('password');
  let icon = document.getElementById('eyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'bi bi-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'bi bi-eye';
  }
}

function resetPassword() {
  let input = document.getElementById('forgotEmail');
  let email = input.value.trim();

  if (!email.includes('@') || !email.includes('.')) {
    input.classList.add('is-invalid');
    return;
  }

  input.classList.remove('is-invalid');
  input.value = '';
  bootstrap.Modal.getInstance(document.getElementById('forgotModal')).hide();
  showAlert('If ' + email + ' has an account, a reset link has been sent.', 'success');
}

let list = '';
for (let u of users) {
  list += `<li class="d-flex justify-content-between"><span>${u.name}</span><span><code>${u.username}</code> / <code>${u.password}</code></span></li>`;
}
document.getElementById('demoUsers').innerHTML = list;

let msg = new URLSearchParams(window.location.search).get('msg');
if (msg === 'logout') {
  showAlert('You have signed out. See you soon!', 'success');
} else if (msg === 'login') {
  showAlert('Please sign in first.', 'warning');
}
