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

function usersCreate(knex, users) {

}

function avatarsCreate(knex, avatars) {

}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('avatars').del()
    .then(() => knex('users'.del())
    .then(() =>
      const userPromises = [];
      
      
    );
    });
};
