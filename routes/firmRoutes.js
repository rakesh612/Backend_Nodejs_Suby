// In an API, routes are essentially the paths or addresses that define how incoming requests are directed to specific backend resources, 
// essentially acting as a map that tells the API which function to execute based on the requested URL and HTTP method (like GET, POST, PUT, DELETE)
//  combination; they specify where to send data based on the incoming request path and method,
//  allowing for organized access to different functionalities within the API.
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/add-firm',verifyToken,firmController.addFirm);

router.get('/uploads/:imageName', (req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(Path.join(__dirname, '..', 'uploads', imageName));
})

router.delete('/:firmId',firmController.deleteFirmById);

module.exports = router;