const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  address: {
    city: {
      type: String,
      required: true,
    
    },
    country: String,
    state: String,
    zipcode: String,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
      
      
    },
  ],
  phone: {
    type: Number,
    required: true,
  
  },
  totalPrice: {
    type: Number,
    
    
  },
  createdAt: {
    type: Date,
    default: Date.now,

  },
},
{
    timestamps: true,
  },)

const order = mongoose.model('Order', orderSchema)
module.exports = order
