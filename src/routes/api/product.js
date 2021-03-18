const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsApiControllers = require('../../controllers/api/productController');
const fs = require('fs');
const db = require('../../database/models');

router.get('/', productsApiControllers.listado);


module.exports = router;
