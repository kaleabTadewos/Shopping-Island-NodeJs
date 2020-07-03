const request = require('supertest');
const {User} = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/admin-only/users' , () => {
  beforeEach(() => { server = require('../../app'); })
  afterEach(async () => { 
    server.close(); 
    await User.collection.remove({});
  });

  let token = new User({role : "ADMIN"}).generateAuthToken();

    describe('GET / ' , () => {
      it('should return all users if token is provided' , async () => {
        const res = await request(server)
                      .get('/admin-only/users')
                      .set('x-auth-token', token)
        expect(res.status).toBe(200);
      })
      it('should return 401 if the request does not have token' , async () => {
        const res = await request(server)
                      .get('/admin-only/users');
        expect(res.status).toBe(401);
      })
    })
}) 