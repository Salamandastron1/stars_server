const userData = [
  {
    username: 'Tim',
    email: 'timmybobjoe@gmail.com',
    password: 'timmybob',
  },
  {
    username: 'Drake',
    email: 'drakeathon@yahoo.com',
    password: 'fakeandgaytest',
    stars: 50,
  },
  {
    username: 'Dina',
    email: 'dinaisbomb@aol.com',
    password: 'thewiz',
    stars: 20,
  },
];
const avatars = [
  { url: 'www.hellokitty.com/url?3', threshold: 50 },
  { url: 'www.kittykatsrcool.org/users/api/v3/user=moot?moot', threshold: 100 },
  { url: 'https//:localhost/3000', threshold: 150 },
];

function usersCreate(knex, user) {
  const {
    username,
    email,
    password,
    stars,
  } = user;

  return knex('users').insert({
    username,
    email,
    password,
    stars,
  });
}
// going to need to fix this for the new object format
function avatarsCreate(knex, { url, threshold }) {
  return knex('avatars').insert({ avatar_url: url, threshold });
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('avatars').del()
    .then(() => knex('users').del())
    .then(() => {
      const userPromises = userData.map(user => (usersCreate(knex, user)));
      const avatarPromises = avatars.map(avatar => (avatarsCreate(knex, avatar)));

      return Promise.all([...userPromises, ...avatarPromises]);
    });
};
