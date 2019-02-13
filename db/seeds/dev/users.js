const userData = [
  {
    username: 'Tim',
    email: 'timmybobjoe@gmail.com',
    password: 'timmybob',
  },
  {
    username: 'Drake',
    email: 'drakeathon@yahoo.com',
    password: 'fakeandgay',
    stars: 50,
  },
  {
    username: 'Dina',
    email: 'dinaisbomb@aol.com',
    password: 'thewiz',
    stars: 20,
  }
];
const avatar = [
  'www.hellokitty.com/url?3',
  'www.kittykatsrcool.org/users/api/v3/user=moot?moot',
  'https//:localhost/3000'
]

function usersCreate(knex, user) {
  const { username, email, password, stars } = user;
  if(stars) {
    return knex('users').insert({
      username,
      email,
      password,
      stars,
    })
  }
}

function avatarsCreate(knex, url) {
  return knex('avatars').insert(url)
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('avatars').del()
    .then(() => knex('users').del())
    .then(() => {
      const userPromises = userData.map(user => {
        return usersCreate(knex, user)
      })
      const avatarPromises = avatars.map(url => {
        return avatarsCreate(url)
      })
      
      return Promise.all([...userPromises, ...avatarPromises)
    );
  });
};
