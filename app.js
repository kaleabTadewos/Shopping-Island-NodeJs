require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const ApiResponse = require('./models/apiResponse');
const ErrorResponse = require('./models/errorResponse');
const adminRoutes = require('./routes/admin.route');

const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');
const adminOnlyRoutes = require('./routes/adminOnly.route');
const allUsersRoutes = require('./routes/allRoles.route');
const adminSellerRoutes = require('./routes/admin-seller.route');
const admin = require('./middleware/admin');
const adminSeller = require('./middleware/admin-seller');
const adminOnly = require('./middleware/adminOnly');
const allRoles = require('./middleware/allRoles');
const auth = require('./middleware/auth');
const config = require('config');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log(config.get('jwtPrivateKey'))
    console.error('jwtPrivateKey is not defined')
    process.exit(1);
}

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
//app.use('/user', [auth, admin], userRoutes);
app.use('/users', userRoutes);
//app.use(loginRoutes);
app.use('/admin', adminRoutes);
app.use('/all-users', [auth, allRoles], allUsersRoutes);
app.use('/admin-seller', [auth, adminSeller], adminSellerRoutes);
//app.use('/admin-only', [auth, adminOnly], adminOnlyRoutes);
app.use('/admin-only', [auth, adminOnly], adminOnlyRoutes);

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res, next) => {
    return res.status(404).send(new ErrorResponse(400, 'no content found!'));
});

app.use((err, req, res, next) => {
    return res.status(500).send(new ErrorResponse(500, err));
});


mongoose.connect('mongodb://localhost:27017/Island-shopping', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running on 3000 ...");
        })
    }).catch((err) => console.log(err));