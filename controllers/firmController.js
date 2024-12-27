const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +  path.extnamefile(file.originalname)); // Generate a unique filename
    }
});

const upload = multer({ storage }); // Initialize Multer

// Add Firm Functionality
const addFirm = async (req, res) => {
    try {
        const { firmanme, area, category, region, offer } = req.body;

        if (!firmanme) {
            return res.status(400).json({ message: "Firm name is required." });
        }

        // Get uploaded file's filename
        const image = req.file ? req.file.filename : undefined;

        // Fetch vendor details
        const vendor = await Vendor.findById(req.vendorId); // Corrected 'Vendor.findById'
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "vendor can have only one firm" });
        }

        // Create and save the firm
        const firm = new Firm({
            firmanme,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();

        const firmId = savedFirm._id;
        const vendorfirmName = savedFirm.firmanme;

        vendor.firm.push(savedFirm);

        await vendor.save();

        return res.status(200).json({ message: "Firm added successfully", firm });
    } catch (error) {
        console.error("Error adding firm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteFirmById = async(req,res) =>{
    try {
        const firmId = req.params.firmId;
        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if(!deletedProduct){
            return res.status(404).json({error:"Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById}; // Use upload middleware for 'image'
