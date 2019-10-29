const mongoose = require('mongoose');

const User = require('../../models/user');
const { cleanUpDb, initializeDb } = require('../setup.test');

// tell mongoose to use es6 implementation of promises
mongoose.promise = global.Promise;

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

// user model test suite
describe('User Model Test', () => {
  // should be able to save a valid user in the database
  it('should create and save user successfully', async () => {
    const userData = {
      name: 'user1',
      email: 'user1@example.com',
      password: 'user1Password',
      age: 30,
      balance: 100,
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.age).toBe(userData.age);
    expect(savedUser.balance).toBe(userData.balance);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBeDefined();
  });

  // should not be able to add in any field that isn't defined in the schema
  it('should insert user successfully, but the field not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User({
      name: 'user2',
      email: 'user2@example.com',
      password: 'user2Password',
      age: 40,
      balance: 200,
      gender: 'M',
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.gender).toBeUndefined();
  });

  // should not be able to add an user without all the required fields defined in the schema
  it('should not be able to create user without required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'user3' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
