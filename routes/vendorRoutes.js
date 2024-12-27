
const controller = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();

router.post('/register',controller.vendorRegister);
router.post('/login',controller.vendorLogin);
router.get('/all-vendors',controller.getAllVendors);
router.get('/single-vendor/:id',controller.getVendorById);

module.exports = router;