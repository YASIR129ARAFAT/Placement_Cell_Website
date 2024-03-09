const mongoose = require('mongoose');
const { Schema } = mongoose;



const ProductSchema = new Schema({
    title: {type:String, required:[true,'this value is mandatory']},
    description: {type:String, required:[true,'this value is mandatory']},
    price: {type:Number,required:[true,'this value is mandatory'],min:[1,'value less than ₹1']},
    discountPercentage: {type:Number,min:[0,'value less than 0%'],max:[90,'value more than 90%']},
    rating: Number,
    brand: {type:String, required:[true,'this value is mandatory']},
    category: {type:String, required:[true,'this value is mandatory']},
    thumbnail: {type:String, required:[true,'this value is mandatory']},
    images: {type:[String],required:[true,'this value is mandatory'] } // this means array of strings
})

exports.Product = mongoose.model('Product',ProductSchema) 


