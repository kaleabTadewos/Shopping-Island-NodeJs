const lib =  require('../testDemoFunctions/lib');

//Sample Test
describe('absolute' , () => {
    it('should return a positive number for positive input' , () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number for negative input' , () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return a zero number for zero input' , () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

//TESTING STRING
// --it should not be too specific or too general.
describe('greet' , () => {
    it('should return a welcome and input name' , () => {
        const result = lib.greet('kaleab');
        //--this approach is too specific.
      //  expect(result).toBe('Welcome kaleab');
      //-- the following two working fine.
        //expect(result).toContain('kaleab');
        expect(result).toMatch(/kaleab/);
    });
});

//TESTING Arrays 
describe('getCurrencies' , () => {
    it('should return list of currencies' , () => {
        const result = lib.getCurrencies();
        //Too general
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();

        //Too Specifc 
        // expect(result[0]).toBe('USD');
        // expect(result[1]).toBe('AUD');
        // expect(result[2]).toBe('EUR');
        // expect(result.length).toBe(3);

        //Proper way 
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');
        
        //Ideal Way
        expect(result).toEqual(expect.arrayContaining(['EUR' , 'AUD' , 'EUR']));
    });
});

//TEST OBJECTS
describe('getProduct' , () => {
    it('should return a proper object with the given id' , () => {
        const result = lib.getProduct(1);
        //This does not work since location is compared.
        //expect(result).toEqual({id: 1 , price: 10});
        //This works and also it is not too specific , it check if incoming object contains id and price with right values.
        expect(result).toMatchObject({id:1 , price:10});
    });
});

//TEST Exceptions
describe('registerUser' , () => {
    it('should throw if username is falsy' , () => {
        const args = [null , undefined , NaN , '', false];
        args.forEach(a => {
            expect(() => {lib.registerUser(a)}).toThrow();
        })
    });

    it('should return a user object if valid username is passed' , () => {
        const result = lib.registerUser('kaleab');
        expect(result).toMatchObject({username : 'kaleab'});
        expect(result.id).toBeGreaterThan(0);
    });
});