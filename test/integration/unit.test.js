const request = require('supertest');
const {Unit} = require('../../models/unit');

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
            console.log('here' , res.body.result);
            expect(res.body.result.length).toBe(2);
            expect(res.body.result.some(u => u.name === 'unit1')).toBeTruthy();
            expect(res.body.result.some(u => u.name === 'unit2')).toBeTruthy();
        })
    })
})