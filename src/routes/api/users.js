const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('../../database/models');

const usersApiController = require('../../controllers/api/usersController');


router.get('/users', usersApiController.listado);
router.get('/users/:id', usersApiController.detalle);

module.exports = router;
