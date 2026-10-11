ConnecFriend - Social Networking Site UI
Roll No: 241855

How to run
Open login.html (or index.html) in a browser. Internet is needed for
Bootstrap 5, Bootstrap Icons and the Google font.

Login accounts (written in js/data.js)
  Afroz Khattak   afroz.k    / afroz123
  Areeba Khan     areeba.k   / areeba456
  Zain Abbas      zain.a     / zain7890

There is no server and no database. All data is in arrays in js/data.js.
The logged in user is passed in the page link (home.html?user=u0).
Everything resets when the page is reloaded.

Pages
  login.html     login with checks, wrong password message, 3 tries limit, forgot password
  home.html      news feed, friends sorted by last login, share with all or some
                 friends, like / dislike with count, rate friends
  profile.html   personal info, profile picture, friends list with rating
  people.html    friend requests, invite members (blocked if they ignore you)
  messages.html  private messages to friends and other members. A sent message
                 shows in my chat with a "Message sent" popup. It is not
                 delivered to the other person.

Files
  css/style.css    theme colours (Bootstrap is used for the layout)
  js/data.js       all the data
  js/common.js     functions used on every page (menu, avatar, rating, invite)
  js/login.js, js/home.js, js/profile.js, js/people.js, js/messages.js
