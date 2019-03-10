/*eslint-disable*/

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
    stars: 60,
  },
  {
    username: 'Dina',
    email: 'dinaisbomb@aol.com',
    password: 'thewiz',
    stars: 20,
  },
];
const avatars = [
  'www.hellokitty.com/url?3',
  'www.kittykatsrcool.org/users/api/v3/user=moot?moot',
  'https//:localhost/3000',
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

function avatarsCreate(knex, url) {
  return knex('avatars').insert({ avatar_url: url });
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('avatars').del()
    .then(() => knex('users').del())
    .then(() => {
      const userPromises = userData.map(user => (usersCreate(knex, user)));
      const avatarPromises = avatars.map(url => (avatarsCreate(knex, url)));

      return Promise.all([...userPromises, ...avatarPromises]);
    });
};
