const db = require('./dataAcess');

// Testing numbers 
module.exports.absolute = function(number) {
  if (number > 0) return number; 
  if (number < 0) return -number;
  return 0; 
}

// Testing strings 
module.exports.greet = function(name) { 
  return 'Welcome ' + name; 
}

// Testing arrays 
module.exports.getCurrencies = function() { 
  return ['USD', 'AUD', 'EUR'];
}

// Testing objects 
module.exports.getProduct = function(productId) { 
  return { id: productId, price: 10 };
}

// Testing exceptions 
module.exports.registerUser = function(username) { 
  if (!username) throw new Error('Username is required.');

  return { id: new Date().getTime(), username: username }
}

module.exports.fizzBuzz = function(input){
  if(typeof input !== 'number'){
    throw new Error('Input should be a number');
  }

  if((input % 3 === 0) && (input % 5) === 0)
    return 'FizzBuzz';
  
  if(input % 3 === 0)
    return 'Fizz';

  if(input % 5 === 0)
    return 'Buzz';
  
  return input;
}

// // Mock functions 
module.exports.applyDiscount = function(order) { 
 
  const customer = db.getCustomer(order.customerId);

  if (customer.points > 10) 
    order.totalPrice *= 0.9; 
}

// // Mock functions 
module.exports.notifyCustomer = function(order) { 
  const customer = db.getCustomer(order.customerId);

  db.sendMail(customer.email, 'Your order was placed successfully.');
}