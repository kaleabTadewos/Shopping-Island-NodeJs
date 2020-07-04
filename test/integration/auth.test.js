const {User} = require('../../models/user');
const request = require('supertest');
const server = require('../../app');

//execution paths
//if token is not provided and is not valid then return access denied 401
//if token provided and is not valid token then return 400.
//if token is valid then response of selected endpoint that uses authorization.
let token; 
 describe('auth middleware', () => {
  beforeEach(async () => { 
    let user = new User({role: "ADMIN"});
    token = await user.generateAuthToken();
  })
  afterEach(async () => { 
    await User.collection.remove({});
  });

  const exec = () => {
    return request(server)
      .get('/admin-only/users')
      .set('x-auth-token', token)
  }

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
});