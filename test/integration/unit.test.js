const request = require('supertest');
const {Unit} = require('../../models/unit');
const mongoose = require('mongoose');

let server;

describe('admin/units' , () => {
    beforeEach(() => { server = require('../../app'); })
    afterEach(async () => { 
        server.close(); 
        await Unit.collection.remove({});
    });

    describe('GET /' , ()=> {
        it('should return all units' , async () => {
            await Unit.collection.insertMany([
                {name: "unit1" , quantity : 12} ,
                {name: "unit2" , quantity : 12}
            ]);

            const res = await request(server).get('/admin/units');
            expect(res.status).toBe(200);
            expect(res.body.result.length).toBe(2);
            expect(res.body.result.some(u => u.name === 'unit1')).toBeTruthy();
            expect(res.body.result.some(u => u.name === 'unit2')).toBeTruthy();
        })
    }); 

    describe('GET /:id', () => {
        it('should return a unit with the given id', async () => {
          const unit = new Unit({ name: 'unit1' , quantity: 12 });
          await unit.save();

          const res = await request(server).get('/admin/units/' + unit._id);
    
          expect(res.status).toBe(200);
          expect(res.body.result).toHaveProperty('name', unit.name);     
        });
    
        it('should return 400 if invalid id is passed', async () => {
          const res = await request(server).get('/admin/units/1');
          expect(res.status).toBe(400);
        });
    
        it('should return 400 if no unit with the given id exists', async () => {
          const id = mongoose.Types.ObjectId();
          const res = await request(server).get('/admin/units/' + id);
    
          expect(res.status).toBe(404);
        });
      });

      describe('POST /', () => {
        it('should respond status 201 for valid input' , async () => {
          const res = await request(server)
                        .post('/admin/units')
                        .send({
                               name: 'unit1' ,
                               quantity : 1
                        });
          expect(res.status).toBe(201);
        });

        it('should respond status 400 for invalid input' , async () => {
          const unit = {name: "unit1" , quantity : "1"};
          const invalidInput = [{name: "unit1"} , {quantity : "1"} , {}];
          let res;
          invalidInput.forEach( async (input) => {
            res = await request(server)
                        .post('/admin/units')
                        .send(input);
            expect(result).toBe(400);
          })
        });
        //execution paths 
        //invalid body should return status 400
        //successful insert should return 201.
        
        // it('should return 401 if client is not logged in', async () => {
        //   token = ''; 
    
        //   const res = await exec();
    
        //   expect(res.status).toBe(401);
        // });
    
        // it('should return 400 if genre is less than 5 characters', async () => {
        //   name = '1234'; 
          
        //   const res = await exec();
    
        //   expect(res.status).toBe(400);
        // });
    
        // it('should return 400 if genre is more than 50 characters', async () => {
        //   name = new Array(52).join('a');
    
        //   const res = await exec();
    
        //   expect(res.status).toBe(400);
        // });
    
        // it('should save the genre if it is valid', async () => {
        //   await exec();
    
        //   const genre = await Genre.find({ name: 'genre1' });
    
        //   expect(genre).not.toBeNull();
        // });
    
        // it('should return the genre if it is valid', async () => {
        //   const res = await exec();
    
        //   expect(res.body).toHaveProperty('_id');
        //   expect(res.body).toHaveProperty('name', 'genre1');
        // });
      });
})