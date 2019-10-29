const request = require('supertest');
const app = require('../../server');
const { initializeDb, cleanUpDb } = require('../setup.test');

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

// user routes test suite
describe('User Routes Test', () => {
  let token;
  let _id;

  // should be able to create multiple user
  it('should create multiple users', async (done) => {
    await request(app)
      .post('/add/users')
      .send([
        {
          name: 'user3',
          age: 26,
          balance: 110,
          email: 'user3@example.com',
          password: 'user3Password',
        },
        {
          name: 'user4',
          age: 27,
          balance: 120,
          email: 'user4@example.com',
          password: 'user4Password',
        },
      ])
      .then((response) => expect(response.statusCode).toBe(201));
    done();
  });

  // should be able to create a single user
  it('should create new user', async (done) => {
    await request(app)
      .post('/add/user')
      .send({
        name: 'user5',
        age: 28,
        balance: 130,
        email: 'user5@example.com',
        password: 'user5Password',
      })
      .then((response) => expect(response.statusCode).toBe(201));
    done();
  });

  // should be able to login with valid user credentials
  it('should login', async (done) => {
    await request(app)
      .post('/login')
      .send({
        email: 'user3@example.com',
        password: 'user3Password',
      })
      .then((response) => {
        _id = response.body.user._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  // should be able to logout
  it('should logout', async (done) => {
    await request(app)
      .get('/logout')
      .set('Authorization', `Bearer ${token}`)
      .send({ _id })
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should not be able to access restricted data without authorization token
  it('should not allow unauthenticated requests', async (done) => {
    await request(app)
      .get(`/user/${_id}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });

  // should not be able to access user data while logged out
  it('should not be able to get user while logged out', async (done) => {
    await request(app)
      .get(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });

  // should be able to login again to check CRUD functionality
  it('should login', async (done) => {
    await request(app)
      .post('/login')
      .send({
        email: 'user3@example.com',
        password: 'user3Password',
      })
      .then((response) => {
        _id = response.body.user._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  // should be able to retrieve all users
  it('should get all users', async (done) => {
    await request(app)
      .get('/users/list')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to retrieve a single user with given id
  it('should get one user', async (done) => {
    await request(app)
      .get(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to update user data
  it('should update user details', async (done) => {
    await request(app)
      .patch(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'newUser3',
        age: 29,
      })
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should not be able to update user balance
  it('should not update user balance', async (done) => {
    await request(app)
      .patch(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        balance: 5000,
      })
      .then((response) => expect(response.statusCode).toBe(400));
    done();
  });

  // should be able to delete user
  it('should delete user', async (done) => {
    await request(app)
      .delete(`/delete/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
});
