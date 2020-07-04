const request = require('supertest');
const {User} = require('../../models/user');
const mongoose = require('mongoose');
const server = require('../../app');

let token;
describe('/admin-only/users', () => {
  
  beforeEach(async () => { 
    token = new User({role : "ADMIN"}).generateAuthToken();
  })

  afterEach(async () => { 
  });

  const exec = () => {
    return request(server)
      .get('/admin-only/users')
      .set('x-auth-token', token)
  }

  describe('GET / ' , () => {
    it('should return 401 if no token is provided', async () => {
      token = ''; 
      const res = await exec();
      expect(res.status).toBe(401);
    });
  
    it('should return 400 if token is invalid', async () => {
      token = 'a'; 
  
      const res = await exec();
      expect(res.status).toBe(400);
    });
  
    it('should return 200 if token is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  })
});