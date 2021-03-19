const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('../../database/models');

const productsApiController = require('../../controllers/api/productsController');


router.get('/products', productsApiController.listado);
router.get('/products/:id', productsApiController.detalle);

module.exports = router;
