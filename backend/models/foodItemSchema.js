import mongoose from 'mongoose';

const { Schema } = mongoose;

const foodItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  reviews: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  onSale: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  discountPeriod: {
    type: String,
    default: ''
  },
  discountedPrice: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
  },
  quantityType: {
    type: String,
    required: true
  },
  quantityUnit: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  discountValidUntil: {
    type: Date
  }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;