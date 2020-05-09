const express = require('express');

//? s4 move to user-model 
// const db = require('../data/db-config.js');
//? s9
const users = require('./user-model.js')

const router = express.Router();

router.get('/', (req, res) => {
   // db('users')
   // ? s10
  users.find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  // db('users').where({ id })
  //?s12
  users.findById(id)
  .then(users => {
    const user = users[0];

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

//? s1
router.get('/:id/posts', (req, res) => {
  const {id} = req.params;
  //?s14
  users.findPosts(id)
  //? s2
  // db('posts').where({user_id: id})
  //? s3 move to user-model.js
  // db('posts as p')
  //   .join('users as u', 'u.id', 'p.user_id')
  //   .select('p.id', 'u.username', 'p.contents')
  //   .where({user_id:id})
  //? s3 end
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({message: 'problem with the db', error: err})
  });


});

router.post('/', (req, res) => {
  const userData = req.body;

  // db('users').insert(userData)
  //? s15
  users.add(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // db('users').where({ id }).update(changes)
  //? s17
  users.update(changes, id)
  .then(count => {
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user', err });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // db('users').where({ id }).del()
  //? 19 
  users.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});



module.exports = router;