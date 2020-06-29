const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');
const ApiResponse = require('../models/apiResponse');
const config = require('config');

/* GET users listing. */
exports.login = async function(req, res) {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('user or password is not correct');
    const isvalid = await bcrypt.compare(req.body.password, user.password);
    if (!isvalid) return res.status(400).send('not authorized');
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(new ApiResponse(200, 'success', token));
}

function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(user, schema);
}