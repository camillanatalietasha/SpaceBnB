const express = require('express');

const { setTokenCookie, requireAuth } = require("../../utils/auth"); 
const { User, Spot } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

/*============================================================================*/

router.get('/', async (req, res, next) => {
    let { page, size } = req.query
    let pagination = {};

    // set default pagination if not specified in query
    size = (!size || parseInt(size) <= 0 ? size = 1 : size = parseInt(size)); 
    page = (!page || parseInt(page) <= 0 ? page = 1 : page = parseInt(page));

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    };

     const spots = await Spot.findAll({
        ...pagination
     });

     res.status(200).json(spots); 
});



module.exports = router;