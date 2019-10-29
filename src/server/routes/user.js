const { ObjectID } = require('mongodb');
const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/auth');

const router = new express.Router();

// create multiple users
router.post('/add/users', async (req, res) => {
  const userList = req.body;
  try {
    userList.forEach(async (_user) => {
      const user = new User({ ..._user });
      const existingUser = await User.findOne({ email: _user.email });
      if (!existingUser) {
        await user.newAuthToken();
      }
    });
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// create one user
router.post('/add/user', async (req, res) => {
  const user = new User({ ...req.body });
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send();
    }
    await user.newAuthToken();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// login as user
router.post('/login', async (req, res) => {
  try {
    const user = await User.checkValidCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.newAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// logout as user
router.get('/logout', authenticate, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// get all users
router.get('/users/list', authenticate, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// get one user with given id
router.get('/user/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// update user with given id
router.patch('/user/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'Bad request' });
  }

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const user = await User.findOne({
      _id: req.params.id,
    });

    if (!user) {
      res.status(404).send();
    }

    updates.forEach((update) => {
      if (req.body[update]) {
        user[update] = req.body[update];
      }
    });
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

// delete user with given id
router.delete('/delete/user/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const deleteUser = await User.findOneAndDelete({ _id });
    if (!deleteUser) {
      return res.status(404).send();
    }
    await deleteUser.remove();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
