const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
    firmanme:{
        type:String,
        required:[true,"Firm name is required"],
        unique:true,
        trim:true
    },
   area:{
        type:String,
        required:true
   },
   category:{
    type:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ]
   },
   region:{
      type:[
        {
            type:String,
            enum:['south-indian','north-indian','chinese','backery']
        }
      ]
   },
   offer:{
    type:String
   },
   image:{
    type:String
   },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor" 
        }
    ],
    Products:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        ]
});

const Firm = mongoose.model('Firm',firmSchema);

module.exports = Firm;