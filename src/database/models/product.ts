import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 100,
    max: 10000000 
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ["Económico", "Intermedio", "Premium"],
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 1000,
    trim: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('product', productSchema);
export default Product;
