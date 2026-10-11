const users = [
  {
    id: 'u0',
    name: 'Afroz Khattak',
    username: 'afroz.k',
    password: 'afroz123',
    email: 'afroz.k@connecfriend.app',
    phone: '+92 300 1234567',
    dob: '14 March 2002',
    gender: 'Male',
    city: 'Islamabad',
    education: 'BS Software Engineering',
    work: 'Frontend Developer (Intern)',
    joined: 'January 2024',
    bio: 'Building things for the web. Tea first, code second.',
    color: 'bg-success',
    lastLogin: 6
  },
  {
    id: 'ua',
    name: 'Areeba Khan',
    username: 'areeba.k',
    password: 'areeba456',
    email: 'areeba.k@connecfriend.app',
    phone: '+92 321 7654321',
    dob: '2 August 2001',
    gender: 'Female',
    city: 'Lahore',
    education: 'BS Computer Science',
    work: 'QA Engineer',
    joined: 'June 2023',
    bio: 'Finding bugs before they find you.',
    color: 'bg-info',
    lastLogin: 1
  },
  {
    id: 'ub',
    name: 'Zain Abbas',
    username: 'zain.a',
    password: 'zain7890',
    email: 'zain.a@connecfriend.app',
    phone: '+92 333 1112233',
    dob: '21 November 2000',
    gender: 'Male',
    city: 'Karachi',
    education: 'BBA Marketing',
    work: 'Digital Marketing Executive',
    joined: 'March 2025',
    bio: 'Sea breeze, cricket and good chai.',
    color: 'bg-warning',
    lastLogin: 35
  }
];

const members = [
  { id: 'm1', name: 'Ayesha Siddiqui', username: 'ayesha.s', city: 'Lahore', bio: 'UX student and coffee lover.', color: 'bg-danger', isFriend: true, lastLogin: 3, rating: 3 },
  { id: 'm2', name: 'Bilal Ahmed', username: 'bilal.ahmed', city: 'Islamabad', bio: 'Weekend cricketer.', color: 'bg-primary', isFriend: true, lastLogin: 12, rating: 2 },
  { id: 'm3', name: 'Sana Qureshi', username: 'sana.q', city: 'Karachi', bio: 'Reads too many books.', color: 'bg-secondary', isFriend: true, lastLogin: 47, rating: 0 },
  { id: 'm4', name: 'Usman Raza', username: 'usman.r', city: 'Rawalpindi', bio: 'Always stuck in traffic.', color: 'bg-success', isFriend: true, lastLogin: 130, rating: 1 },
  { id: 'm5', name: 'Mahnoor Iqbal', username: 'mahnoor.i', city: 'Multan', bio: 'Home chef in training.', color: 'bg-info', isFriend: true, lastLogin: 310, rating: 3 },
  { id: 'm6', name: 'Fahad Khan', username: 'fahad.k', city: 'Peshawar', bio: 'Data science newbie.', color: 'bg-warning', isFriend: true, lastLogin: 1500, rating: 2 },
  { id: 'm7', name: 'Zoya Hassan', username: 'zoya.h', city: 'Abbottabad', bio: 'Hiking every weekend.', color: 'bg-danger', isFriend: true, lastLogin: 4400, rating: 0 },

  { id: 'm8', name: 'Danish Ali', username: 'danish.ali', city: 'Lahore', bio: 'Photographer and street food hunter.', color: 'bg-primary', isFriend: false, lastLogin: 20, mutual: 3, ignoresMe: false },
  { id: 'm9', name: 'Hira Nadeem', username: 'hira.n', city: 'Karachi', bio: 'Marketing at a startup.', color: 'bg-secondary', isFriend: false, lastLogin: 95, mutual: 1, ignoresMe: true },
  { id: 'm10', name: 'Omar Farooq', username: 'omar.f', city: 'Islamabad', bio: 'Backend dev, loves Go.', color: 'bg-success', isFriend: false, lastLogin: 600, mutual: 0, ignoresMe: false },
  { id: 'm11', name: 'Rida Shah', username: 'rida.shah', city: 'Hyderabad', bio: 'Medical student.', color: 'bg-info', isFriend: false, lastLogin: 2900, mutual: 2, ignoresMe: false },
  { id: 'm12', name: 'Kamran Yousaf', username: 'kamran.y', city: 'Quetta', bio: 'Mountains over beaches.', color: 'bg-warning', isFriend: false, lastLogin: 75, mutual: 4, ignoresMe: true },
  { id: 'm13', name: 'Noor Fatima', username: 'noor.f', city: 'Faisalabad', bio: 'Painter and part time tutor.', color: 'bg-danger', isFriend: false, lastLogin: 8000, mutual: 1, ignoresMe: false },

  { id: 'm14', name: 'Saad Malik', username: 'saad.m', city: 'Sialkot', bio: 'Football fan.', color: 'bg-primary', isFriend: false, lastLogin: 8, mutual: 2, sentMeRequest: true },
  { id: 'm15', name: 'Iqra Butt', username: 'iqra.b', city: 'Gujranwala', bio: 'Learning Python.', color: 'bg-secondary', isFriend: false, lastLogin: 240, mutual: 5, sentMeRequest: true }
];

const posts = [
  { id: 'p1', author: 'ua', postedAgo: 10, text: 'Just pushed my first open source contribution. Small fix, big smile!', likes: 11, dislikes: 0, myReaction: '', shares: 1, sharedWith: 'All friends' },
  { id: 'p2', author: 'm1', postedAgo: 25, text: 'Finished my final year presentation today. Three months of work in fifteen minutes! Thank you everyone who helped me test the prototype.', likes: 14, dislikes: 1, myReaction: '', shares: 0 },
  { id: 'p3', author: 'm2', postedAgo: 60, text: 'Anyone up for a friendly cricket match this Sunday morning? We need two more players.', likes: 9, dislikes: 0, myReaction: 'like', shares: 1 },
  { id: 'p4', author: 'ub', postedAgo: 90, text: 'Our campaign hit 10k views overnight. Team, you are amazing.', likes: 17, dislikes: 1, myReaction: '', shares: 0, sharedWith: 'All friends' },
  { id: 'p5', author: 'm5', postedAgo: 190, text: 'Tried a new biryani recipe tonight. It turned out spicier than planned, but the family finished the whole pot.', likes: 22, dislikes: 2, myReaction: '', shares: 0 },
  { id: 'p6', author: 'm3', postedAgo: 360, text: 'Starting a small online book club. First pick is a short mystery novel. Reply if you want to join next Friday.', likes: 6, dislikes: 0, myReaction: '', shares: 2 },
  { id: 'p7', author: 'u0', postedAgo: 400, text: 'Redesigned my portfolio over the weekend. Feedback is welcome!', likes: 8, dislikes: 0, myReaction: '', shares: 0, sharedWith: 'All friends' },
  { id: 'p8', author: 'm4', postedAgo: 540, text: 'Two hours on the road for a twenty minute trip. Leave early tomorrow if you are going towards the city centre.', likes: 3, dislikes: 5, myReaction: 'dislike', shares: 0 },
  { id: 'p9', author: 'm6', postedAgo: 1450, text: 'Got my first internship offer letter today! Starting next month as a data analyst intern.', likes: 40, dislikes: 0, myReaction: 'like', shares: 4 },
  { id: 'p10', author: 'm7', postedAgo: 2900, text: 'Weekend hike done. The view from the top made every step worth it.', likes: 18, dislikes: 1, myReaction: '', shares: 0 }
];

const chats = [
  { withId: 'ua', unread: true, messages: [
    { from: 'them', text: 'Hey! Are you joining the study group tonight?', mins: 15 }
  ] },
  { withId: 'ub', unread: false, messages: [
    { from: 'me', text: 'Nice work on the campaign!', mins: 100 },
    { from: 'them', text: 'Thanks a lot, it was a team effort.', mins: 85 }
  ] },
  { withId: 'u0', unread: false, messages: [
    { from: 'them', text: 'Can you check my portfolio and tell me what you think?', mins: 380 }
  ] },
  { withId: 'm1', unread: true, messages: [
    { from: 'me', text: 'Good luck with your presentation today!', mins: 180 },
    { from: 'them', text: 'Thank you! It went really well. Can I send you the slides for feedback?', mins: 22 }
  ] },
  { withId: 'm8', unread: false, messages: [
    { from: 'them', text: 'Hi! I saw your photography question. Happy to share some beginner tips.', mins: 55 }
  ] },
  { withId: 'm4', unread: false, messages: [
    { from: 'them', text: 'Are you coming to the meetup on Thursday?', mins: 1600 },
    { from: 'me', text: 'Yes, I will be there by 6.', mins: 1580 }
  ] }
];
