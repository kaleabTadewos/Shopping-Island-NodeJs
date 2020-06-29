const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(request, response, next) {
    if ((request.user.role === 'BUYER')) return response.status(403).send('An authorized');
    next();
}