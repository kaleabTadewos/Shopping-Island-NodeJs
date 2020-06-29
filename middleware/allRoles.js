module.exports = function(request, response, next) {
    if (!(request.user.role === 'BUYER') && !(request.user.role === 'SELLER') && !(request.user.role === 'ADMIN')) return response.status(403).send('An authorized');
    next();
}