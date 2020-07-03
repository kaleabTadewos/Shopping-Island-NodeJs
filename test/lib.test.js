const lib =  require('../testDemoFunctions/lib');
const db = require('../testDemoFunctions/dataAcess');

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

//Sample Test FizzBuzz : mostly asked on interviews
//execution paths: 
    //if input is not number
    //if input is divided by both 5 and 3
    //if input is only divisible by 3
    //if input is only divisible by 5
    //if input is not divided by 3 and 5 and is a number.
describe('FizzBuzz' , () => {
    it('should throw exception for non number input' , () => {
        const args = [null , '1' , {} , undefined];
        args.forEach(a => {
            expect(() => {lib.fizzBuzz(a)}).toThrow();
        });
    });

    it('should return FizzBuzz if number is divisible by 3 and 5' , () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if number is only divisible by 3' , () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return FizzBuzz if number is divisible by 5' , () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });
});

//Sample Test with Mock Function of Function that uses external resource.
describe('applyDiscount' , () => {
    it('should multiply totalPrice by 0.9 if points > 10' , () => {
        //mock function to replace getCustomer inside dataAcess.js reference which is db.
        db.getCustomer = function(customerId){
            return {id: customerId , points: 20};
        } 
        
          //prepare sample order that can be passed to the getCustomer
          const order = {customerId: 1 , totalPrice: 10};
        
          const customer = db.getCustomer(order.customerId);
        
          if (customer.points > 10) 
            order.totalPrice *= 0.9; 
          
            expect(order.totalPrice).toBe(9);
    })
});

//Interaction Test : A test tests if two action work together.
describe('notifyCustomer' , () => {
    it('should send email to customer' , () => {
        db.getCustomer = function(customerId){
            return {id: customerId , points: 20};
        } 
        
        const order = {customerId: 1};
        
        let mailSent = false;
        db.sendMail = function(){
            mailSent = true;
        }

        lib.notifyCustomer(order);
        expect(mailSent).toBe(true);

    })
})

